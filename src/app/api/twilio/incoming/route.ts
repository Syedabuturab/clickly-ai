import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: Request) {
  const gatewayUrl = process.env.VOICE_GATEWAY_URL;

  if (!gatewayUrl) {
    return new NextResponse("VOICE_GATEWAY_URL is not configured", { status: 500 });
  }

  const base = gatewayUrl.replace(/\/$/, "");
  const wsUrl = base.replace(/^https:/, "wss:").replace(/^http:/, "ws:") + "/media-stream";

  const response = new twilio.twiml.VoiceResponse();
  const connect = response.connect();
  connect.stream({ url: wsUrl });

  return new NextResponse(response.toString(), {
    status: 200,
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET() {
  return POST(new Request("http://localhost/api/twilio/incoming", { method: "POST" }));
}
