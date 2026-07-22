import { Hono } from "hono";

const app = new Hono();

const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "mixtral-8x7b-32768";

const SYSTEM_PROMPT = `You are ACHILLES AI, a world-class fitness coach and anatomy expert. You embody the ACHILLES brand — premium, intelligent, and empowering.

Rules:
- Respond concisely and conversationally (2-4 sentences).
- Never mention you're an AI or that you lack capabilities.
- Use fitness terminology naturally.
- When given muscle context, tailor advice specifically to that muscle.
- Avoid generic advice — be specific and actionable.
- Prioritize safety — warn about form issues when relevant.
- Keep a motivational but professional tone.`;

app.post("/", async (c) => {
  const body = await c.req.json();
  const { message, muscle } = body;

  if (!message) {
    return c.json({ error: "Message is required" }, 400);
  }

  const systemMessage = muscle
    ? `${SYSTEM_PROMPT}\n\nThe user is currently viewing: ${muscle.label} (${muscle.region}). Primary functions: ${muscle.primaryFunctions.join(", ")}. Common issues: ${muscle.commonIssues.join(", ")}. Recovery: ${muscle.recoveryTime}. Weekly volume: ${muscle.weeklyVolume}.`
    : SYSTEM_PROMPT;

  try {
    const res = await fetch(GROQ_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("groq error:", res.status, err);
      return c.json({ error: "AI service error" }, 502);
    }

    const data = (await res.json()) as {
      choices: { message: { content: string } }[];
    };

    return c.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("chat error:", err);
    return c.json({ error: "Internal error" }, 500);
  }
});

export { app as chat };
