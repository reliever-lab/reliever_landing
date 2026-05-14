# Reliever Landing Page

This repository contains the Vercel-ready Next.js landing page for Reliever, an AX company that deploys Slack-based agents for enterprise codebase intelligence.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Plain CSS based on the Reliever primary color `#0E4274`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

Create `.env.local` for local development and set the Slack Incoming Webhook URL used by the demo request form.

```bash
SLACK_WEBHOOK_URL=<Slack Incoming Webhook URL>
```

The variable is read only from the server-side route handler and must also be configured in the Vercel project environment before production deployment.

## Production Build

```bash
npm run build
```

The app can be deployed to Vercel with the default Next.js framework preset.

## Design Research

Lazyweb research notes and reference files are stored under:

```text
.lazyweb/design-research/ax-b2b-slack-agent-landing-2026-05-11/
```

The landing page direction emphasizes product preview, integrations, security trust, and demo-oriented conversion based on B2B enterprise AI references.
