This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## GioPT API fallback

GioPT resolves exact non-portfolio intents locally before considering an API request. Confident portfolio answers also stay local. Other questions are sent to the backend, while suggested questions always come from `presetAnswers`.

Requests default to `/api/chat` on the current origin, which resolves to `http://localhost:<port>/api/chat` during development. This repository does not implement that backend route yet. To use a backend on a different port or origin, set `NEXT_PUBLIC_GIOPT_API_URL` in `.env.local` and restart the development server (rebuild for production). The endpoint must accept JSON POST requests and return `{ "answer": "..." }`. For a separate origin, configure its CORS policy to allow the frontend origin and `Content-Type` header.

```json
{
  "visitor": {
    "type": "talent_partner_agency",
    "industry": "healthtech",
    "role": "frontend"
  },
  "messages": [
    { "role": "user", "content": "why should i hire you?" }
  ]
}
```

Visitor fields come from `VisitorProvider`. Unselected industry and role values, including those skipped by "Other", are sent as `null`. Follow-up requests include up to 20 previous user/assistant messages from the current command-menu session, followed by the current question. API errors, invalid responses and 30-second timeouts show a retry message with local preset suggestions.

Local confidence requires a relevance score of at least 11 and a margin of at least 4 over the next distinct answer. Exact suggested-question matches bypass the ambiguity check. Visitor bonuses influence ranking but do not count towards confidence. Thresholds are defined in `src/lib/giopt/resolve-question.ts`.

The backend owns the future OpenAI integration and its credentials. `NEXT_PUBLIC_GIOPT_API_URL` is a public URL, not a place for an API key.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
