import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { videos } from "./routes/videos.js";
import { images } from "./routes/images.js";

const app = new Hono();

app.use("/*", cors({ origin: ["http://localhost:3000", "http://localhost:3001"] }));

app.route("/api/videos", videos);
app.route("/api/images", images);

app.get("/api/health", (c) => c.json({ status: "ok" }));

const port = Number(process.env.PORT) || 3001;

serve({ fetch: app.fetch, port }, () => {
  console.log(`media-search running on http://localhost:${port}`);
});
