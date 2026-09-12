# Clickly AI Voice Gateway

Persistent Node.js WebSocket bridge for Twilio Media Streams and OpenAI Realtime.

## Deploy

Use a persistent Node host such as Railway, Render, or Fly.io.

Set the service root directory to `voice-gateway` and start command to `npm start`.

Required environment variables:

- `OPENAI_API_KEY`
- `OPENAI_REALTIME_MODEL=gpt-realtime-2.1`
- `OPENAI_REALTIME_VOICE=marin`

The service exposes:

- `GET /health`
- `POST /incoming-call`
- `wss://HOST/media-stream`

Configure the Twilio phone number's incoming Voice webhook to:

`https://HOST/incoming-call`

Use HTTP POST. Do not put API keys in GitHub.
