import http from "node:http";
import { WebSocketServer, WebSocket } from "ws";

const PORT = Number(process.env.PORT || 8080);
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const REALTIME_MODEL = process.env.OPENAI_REALTIME_MODEL || "gpt-realtime-2.1";
const SYSTEM_PROMPT = process.env.CLICKLY_SYSTEM_PROMPT ||
  "You are Clickly AI, a professional AI receptionist. Clearly identify yourself as an AI receptionist when appropriate. Be warm, concise, helpful, and never invent company policies, prices, availability, or promises. Ask one question at a time. If you cannot safely answer, offer to transfer the caller to a human. Keep phone responses natural and short.";

if (!OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. The gateway will start, but calls cannot connect to OpenAI.");
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, service: "clickly-ai-voice-gateway" }));
    return;
  }
  res.writeHead(404);
  res.end("Not found");
});

const wss = new WebSocketServer({ server, path: "/media-stream" });

wss.on("connection", (twilioSocket, request) => {
  let streamSid = null;
  let openaiSocket = null;

  const closeBoth = () => {
    if (openaiSocket && openaiSocket.readyState === WebSocket.OPEN) openaiSocket.close();
    if (twilioSocket.readyState === WebSocket.OPEN) twilioSocket.close();
  };

  if (!OPENAI_API_KEY) {
    closeBoth();
    return;
  }

  const openaiUrl = `wss://api.openai.com/v1/realtime?model=${encodeURIComponent(REALTIME_MODEL)}`;
  openaiSocket = new WebSocket(openaiUrl, {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
  });

  openaiSocket.on("open", () => {
    openaiSocket.send(JSON.stringify({
      type: "session.update",
      session: {
        type: "realtime",
        instructions: SYSTEM_PROMPT,
        audio: {
          input: { format: { type: "audio/pcmu" } },
          output: { format: { type: "audio/pcmu" } },
        },
        turn_detection: {
          type: "server_vad",
          create_response: true,
          interrupt_response: true,
        },
        voice: process.env.OPENAI_REALTIME_VOICE || "marin",
      },
    }));
  });

  twilioSocket.on("message", (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (message.event === "start") {
      streamSid = message.start?.streamSid || message.streamSid || null;
      return;
    }

    if (message.event === "media" && message.media?.track === "inbound" && openaiSocket?.readyState === WebSocket.OPEN) {
      openaiSocket.send(JSON.stringify({
        type: "input_audio_buffer.append",
        audio: message.media.payload,
      }));
      return;
    }

    if (message.event === "stop") {
      closeBoth();
    }
  });

  openaiSocket.on("message", (raw) => {
    let event;
    try {
      event = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (event.type === "response.output_audio.delta" && event.delta && streamSid && twilioSocket.readyState === WebSocket.OPEN) {
      twilioSocket.send(JSON.stringify({
        event: "media",
        streamSid,
        media: { payload: event.delta },
      }));
    }

    if (event.type === "error") {
      console.error("OpenAI Realtime error:", event.error || event);
    }
  });

  twilioSocket.on("close", () => {
    if (openaiSocket && openaiSocket.readyState === WebSocket.OPEN) openaiSocket.close();
  });

  openaiSocket.on("close", () => {
    if (twilioSocket.readyState === WebSocket.OPEN) twilioSocket.close();
  });

  openaiSocket.on("error", (error) => {
    console.error("OpenAI WebSocket error:", error.message);
    closeBoth();
  });
});

server.listen(PORT, () => {
  console.log(`Clickly AI voice gateway listening on port ${PORT}`);
});
