"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { Play, X, Image, ChevronDown, Film } from "lucide-react";

interface MediaItem {
  title: string;
  url: string;
  embedUrl?: string;
  thumbnail: string;
  channel: string;
  source: string;
}

interface MediaResults {
  youtube?: MediaItem[];
  wikimedia?: MediaItem[];
}

export function ExerciseMedia({ exercise }: { exercise: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSource, setLightboxSource] = useState<"youtube" | "wikimedia">("youtube");

  const { data, isLoading, isError } = useQuery<MediaResults>({
    queryKey: ["media", exercise],
    queryFn: async () => {
      const [videosRes, imagesRes] = await Promise.all([
        fetch(`/api/media/proxy?type=videos&q=${encodeURIComponent(exercise)}`),
        fetch(`/api/media/proxy?type=images&q=${encodeURIComponent(exercise)}`),
      ]);
      const videos = await videosRes.json();
      const images = await imagesRes.json();
      return {
        youtube: Array.isArray(videos?.youtube) ? videos.youtube : [],
        wikimedia: Array.isArray(images?.wikimedia) ? images.wikimedia : [],
      };
    },
    staleTime: 10 * 60 * 1000,
  });

  const hasYouTube = (data?.youtube?.length ?? 0) > 0;
  const hasImages = (data?.wikimedia?.length ?? 0) > 0;

  const openLightbox = (source: "youtube" | "wikimedia", index: number) => {
    setLightboxSource(source);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const items = (lightboxSource === "youtube" ? data?.youtube : data?.wikimedia) ?? [];

  return (
    <div className="space-y-3">
      {isLoading && (
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-32 animate-pulse rounded-xl bg-white/[0.04]" />
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-xl bg-red-500/5 border border-red-500/10 px-3 py-2">
          <p className="text-xs text-red-400/60">Could not load media. Is the media service running?</p>
        </div>
      )}

      {!isLoading && !isError && !hasYouTube && !hasImages && (
        <p className="text-xs text-white/20">No media found.</p>
      )}

      {!isLoading && hasYouTube && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Film className="size-3 text-red-400/50" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Videos</span>
            <span className="text-[10px] text-white/20">({data!.youtube!.length})</span>
          </div>
          <MediaGrid
            items={data!.youtube!}
            source="youtube"
            onOpen={(i) => openLightbox("youtube", i)}
          />
        </div>
      )}

      {!isLoading && hasImages && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Image className="size-3 text-sky-400/50" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">Images</span>
            <span className="text-[10px] text-white/20">({data!.wikimedia!.length})</span>
          </div>
          <MediaGrid
            items={data!.wikimedia!}
            source="wikimedia"
            onOpen={(i) => openLightbox("wikimedia", i)}
          />
        </div>
      )}

      {lightboxOpen && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/5 p-2 text-white/40 transition hover:bg-white/10 hover:text-white/70"
          >
            <X className="size-5" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 overflow-x-auto px-2 pb-2">
              {items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex
                      ? "border-[var(--lime)] opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={item.thumbnail} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
            {items[lightboxIndex]?.source === "youtube" && items[lightboxIndex]?.embedUrl ? (
              <div className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl">
                <iframe
                  src={`${items[lightboxIndex].embedUrl}?autoplay=1&rel=0`}
                  title={items[lightboxIndex].title}
                  className="size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={items[lightboxIndex]?.thumbnail}
                alt=""
                className="max-h-[70vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              />
            )}
            <p className="mx-auto mt-3 max-w-md truncate text-center text-xs text-white/50">
              {items[lightboxIndex]?.title}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function MediaGrid({
  items,
  source,
  onOpen,
}: {
  items: MediaItem[];
  source: "youtube" | "wikimedia";
  onOpen: (index: number) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 3);
  const extraCount = items.length - 3;

  return (
    <>
      <div className="grid grid-cols-3 gap-1.5">
        {visible.slice(0, 3).map((item, i) => (
          <button
            key={`${item.url}-${i}`}
            type="button"
            onClick={() => onOpen(i)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-white/[0.04] bg-white/[0.02] transition-all duration-200 hover:scale-[1.02] hover:border-white/[0.1]"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            {source === "youtube" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex size-7 items-center justify-center rounded-full bg-white/90 shadow-lg">
                  <Play className="ml-0.5 size-3 fill-black text-black" />
                </div>
              </div>
            )}
            {!showAll && i === 2 && extraCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm">
                <span className="text-sm font-bold text-white drop-shadow-md">
                  +{extraCount} More
                </span>
              </div>
            )}
          </button>
        ))}
        {!showAll && items.length < 3 &&
          [...Array(3 - items.length)].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="aspect-video rounded-xl border border-dashed border-white/[0.04] bg-white/[0.01] flex items-center justify-center"
            >
              <Image className="size-4 text-white/[0.08]" />
            </div>
          ))
        }
      </div>
      {items.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-white/[0.04] bg-white/[0.02] py-1.5 text-xs text-white/40 transition hover:border-white/[0.08] hover:text-white/60"
        >
          <ChevronDown className={`size-3 transition ${showAll ? "rotate-180" : ""}`} />
          {showAll ? "Show less" : `Show all ${items.length} ${source === "youtube" ? "videos" : "images"}`}
        </button>
      )}
      {showAll && items.length > 3 && (
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {items.slice(3).map((item, i) => (
            <button
              key={item.url}
              type="button"
              onClick={() => onOpen(3 + i)}
              className="group relative aspect-video overflow-hidden rounded-lg border border-white/[0.03] bg-white/[0.01] transition hover:border-white/[0.08]"
            >
              <img src={item.thumbnail} alt="" className="size-full object-cover" loading="lazy" />
              {source === "youtube" && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex size-6 items-center justify-center rounded-full bg-white/80">
                    <Play className="ml-0.5 size-2.5 fill-black" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
