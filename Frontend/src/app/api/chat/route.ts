import { type NextRequest } from "next/server";

const CHATBOT_SERVICE = process.env.CHATBOT_SERVICE_URL ?? "http://localhost:3002";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, muscle } = body;

  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${CHATBOT_SERVICE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, muscle }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("chatbot proxy error:", res.status, err);
      return Response.json({ error: "AI service error" }, { status: 502 });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("chat proxy error:", err);
    return Response.json({ reply: "I'm sorry, I'm having trouble connecting right now. Please try again." });
  }
}
