# DeepSeek Coding Workflow

## Current Codex Setup

- This Codex installation supports model selection through CLI flags such as `--model` and provider configuration in `~/.codex/config.toml`.
- The local Codex config already has a `model_providers.deepseek` entry with `base_url = "https://api.deepseek.com"` and `env_key = "DEEPSEEK_API_KEY"`.
- This project is a Next.js + TypeScript + Tailwind CSS portfolio site. It has no server-side DeepSeek route yet; the provided test script is a local/server-side example.

## Environment Variables

Use `.env.local` for local testing:

```text
DEEPSEEK_API_KEY=your_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-pro
```

`.env.local` is ignored by Git and must not be committed.

## Local Test

```bash
npm run deepseek:test
```

The script calls DeepSeek through the OpenAI-compatible `/chat/completions` API using Node.js `fetch`.

## GPT + DeepSeek Division

Use GPT for:

- portfolio strategy and visual direction
- UI/UX judgment
- architecture decisions
- complex debugging where product context matters
- deployment, security and high-risk changes

Use DeepSeek for:

- routine code generation
- CSS and Tailwind adjustments
- small bug analysis
- refactor suggestions
- repeated file-edit planning
- TypeScript utility code

## Safety Rules

- Never put `DEEPSEEK_API_KEY` in frontend code.
- Never expose the key through `NEXT_PUBLIC_*`.
- Keep DeepSeek calls in local scripts, server actions, route handlers, or backend services.
- Review DeepSeek-generated patches before applying them.
