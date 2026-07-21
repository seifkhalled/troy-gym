import { type NextRequest } from "next/server";

const MEDIA_SERVICE = process.env.MEDIA_SERVICE_URL ?? "http://localhost:3001";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const q = request.nextUrl.searchParams.get("q");

  if (!type || !q) {
    return Response.json({ error: "Missing 'type' or 'q' parameter" }, { status: 400 });
  }

  const target = type === "images" ? "/api/images" : "/api/videos";
  const timeout = type === "videos" ? 15_000 : 10_000;
  const url = `${MEDIA_SERVICE}${target}?q=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    if (!res.ok) {
      return Response.json({ error: `media-search returned ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("proxy error:", err);
    const empty = type === "videos" ? { youtube: [] } : { wikimedia: [] };
    return Response.json(empty);
  }
}
