import { Hono } from "hono";

const images = new Hono();

interface ImageResult {
  title: string;
  url: string;
  thumbnail: string;
  source: "wikimedia";
}

images.get("/", async (c) => {
  const query = c.req.query("q");
  if (!query) return c.json({ error: "Missing query parameter 'q'" }, 400);

  const results = await searchWikimedia(query);
  return c.json({ wikimedia: results });
});

async function searchWikimedia(query: string): Promise<ImageResult[]> {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("list", "search");
  url.searchParams.set("srsearch", query);
  url.searchParams.set("srnamespace", "6");
  url.searchParams.set("srlimit", "10");
  url.searchParams.set("format", "json");
  url.searchParams.set("origin", "*");

  const res = await fetch(url.toString());
  if (!res.ok) return [];

  const data = (await res.json()) as {
    query?: { search?: Array<{ title: string }> };
  };

  const titles = (data.query?.search ?? []).map((s) => s.title);
  if (titles.length === 0) return [];

  const imageUrl = new URL("https://commons.wikimedia.org/w/api.php");
  imageUrl.searchParams.set("action", "query");
  imageUrl.searchParams.set("titles", titles.join("|"));
  imageUrl.searchParams.set("prop", "imageinfo");
  imageUrl.searchParams.set("iiprop", "url|mime");
  imageUrl.searchParams.set("iiurlwidth", "400");
  imageUrl.searchParams.set("format", "json");
  imageUrl.searchParams.set("origin", "*");

  const imgRes = await fetch(imageUrl.toString());
  if (!imgRes.ok) return [];

  const imgData = (await imgRes.json()) as {
    query?: { pages?: Record<string, { title: string; imageinfo?: Array<{ url: string; thumburl?: string }> }> };
  };

  const pages = imgData.query?.pages ?? {};
  return Object.values(pages)
    .filter((p): p is typeof pages[string] => !!p)
    .flatMap((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return [];
      return {
        title: p.title.replace(/^File:/, ""),
        url: info.url,
        thumbnail: info.thumburl ?? info.url,
        source: "wikimedia" as const,
      };
    })
    .filter((r) => /\.(jpg|jpeg|png|gif|webp)/i.test(r.url));
}

export { images };
