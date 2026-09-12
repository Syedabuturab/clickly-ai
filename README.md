# Clickly AI

Clickly AI is an AI phone receptionist platform for businesses.

## Vision

A business connects its phone number and Clickly AI can answer customer calls, use approved company knowledge, book appointments, capture leads, send follow-ups, and transfer calls to a human when needed.

## Stack

- Next.js + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma
- OpenAI voice/AI services
- Twilio Programmable Voice
- Google Calendar
- Vercel

## Current status

Phase 1 foundation is in place:

- Landing page
- Dashboard MVP
- Initial multi-tenant database model
- Health API
- Environment template
- OpenAI/Twilio configuration placeholders

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

Then open `http://localhost:3000`.

## Roadmap

1. Authentication and organizations
2. AI agent builder
3. Knowledge base
4. Twilio phone connection
5. OpenAI realtime voice bridge
6. Agent tools
7. Google Calendar booking
8. Leads and contacts
9. Human transfer
10. Calls and transcripts
11. Integrations
12. Billing, security and production deployment
