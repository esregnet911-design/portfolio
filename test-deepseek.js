const fs = require("fs");
const path = require("path");

function loadLocalEnv(fileName = ".env.local") {
  const envPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

async function askDeepSeek() {
  loadLocalEnv();

  const apiKey = process.env.DEEPSEEK_API_KEY;
  const baseURL = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";
  const model = process.env.DEEPSEEK_MODEL || "deepseek-v4-pro";

  if (!apiKey || apiKey.includes("你的DeepSeek_API_KEY")) {
    throw new Error("Missing DEEPSEEK_API_KEY. Please set it in .env.local before running this test.");
  }

  const response = await fetch(`${baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a senior coding assistant. Answer concisely and focus on practical code suggestions."
        },
        {
          role: "user",
          content:
            "In a Next.js TypeScript portfolio site, what is the safest way to keep API keys out of client-side code?"
        }
      ],
      temperature: 0.2
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`DeepSeek API error ${response.status}: ${JSON.stringify(data, null, 2)}`);
  }

  console.log(data.choices?.[0]?.message?.content || data);
}

askDeepSeek().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
