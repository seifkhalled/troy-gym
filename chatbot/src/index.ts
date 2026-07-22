import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { chat } from "./routes/chat.js";

const app = new Hono();

app.use("/*", cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.route("/api/chat", chat);

app.get("/api/health", (c) => c.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3002;

serve({ fetch: app.fetch, port }, () => {
  console.log(`chatbot running on http://localhost:${port}`);
});
