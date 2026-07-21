import { Hono } from "hono";

const videos = new Hono();

interface VideoResult {
  title: string;
  url: string;
  embedUrl?: string;
  thumbnail: string;
  channel: string;
  source: "youtube";
}

videos.get("/", async (c) => {
  const query = c.req.query("q");
  if (!query) return c.json({ error: "Missing query parameter 'q'" }, 400);

  const results = await searchYouTube(query);
  return c.json({ youtube: results });
});

async function searchYouTube(query: string): Promise<VideoResult[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    console.warn("[youtube] No API key set");
    return [];
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "6");
  url.searchParams.set("key", key);

  console.log("[youtube] fetching:", url.toString().replace(key, "REDACTED"));
  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    console.warn(`[youtube] API error ${res.status}:`, text.slice(0, 300));
    return [];
  }

  const data = (await res.json()) as {
    items?: Array<{
      id: { videoId: string };
      snippet: { title: string; thumbnails: { medium: { url: string } }; channelTitle: string };
    }>;
  };

  console.log(`[youtube] got ${data.items?.length ?? 0} items`);
  return (data.items ?? []).map((item) => ({
    title: item.snippet.title,
    url: `https://youtube.com/watch?v=${item.id.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
    thumbnail: item.snippet.thumbnails.medium.url,
    channel: item.snippet.channelTitle,
    source: "youtube" as const,
  }));
}

export { videos };
