"use client";

import { useMemo } from "react";
import { REGIONS, type BodyView, type RegionId } from "@/lib/anatomy/muscleRegistry";
import { getBodyIllustrationData, type RegionRender } from "@/lib/anatomy/muscleIllustrations";

interface Props {
  view: BodyView;
  activeRegion: RegionId | null;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
}

export function BodyIllustration({ view, activeRegion, onHover, onSelect }: Props) {
  const { regions, statics, viewBox } = useMemo(() => getBodyIllustrationData(view), [view]);

  return (
    <svg
      viewBox={viewBox}
      className="h-full w-full max-h-[75vh]"
      role="group"
      aria-label={`Human body, ${view} view`}
    >
      <defs>
        <radialGradient id="body-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.88 0.22 120 / 0.08)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx={view === "front" ? 17.5 : 54.5}
        cy={46}
        rx={13}
        ry={34}
        fill="url(#body-glow)"
        className="animate-[breathe_4s_ease-in-out_infinite]"
      />

      {statics.length > 0 && (
        <g fill="oklch(0.15 0.01 260 / 0.25)" stroke="oklch(1 0 0 / 4%)" strokeWidth={0.2}>
          {statics.map((m) => (
            <path key={m.id} d={m.path} />
          ))}
        </g>
      )}

      {regions.map((region) => (
        <RegionGroup
          key={region.regionId}
          region={region}
          isActive={activeRegion === region.regionId}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </svg>
  );
}

function RegionGroup({
  region,
  isActive,
  onHover,
  onSelect,
}: {
  region: RegionRender;
  isActive: boolean;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
}) {
  const label = REGIONS[region.regionId]?.label ?? region.regionId;
  return (
    <g
      data-region={region.regionId}
      role="button"
      tabIndex={0}
      aria-label={`${label} region`}
      aria-pressed={isActive}
      className="cursor-pointer outline-none"
      onMouseEnter={() => onHover(region.regionId)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(region.regionId)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(region.regionId);
        }
      }}
    >
      {region.paths.map((path, i) => (
        <path
          key={`${region.regionId}-${i}`}
          d={path}
          fill="var(--region-color)"
          fillOpacity={isActive ? 0.35 : 0}
          stroke="var(--region-color)"
          strokeWidth={isActive ? 0.6 : 0.2}
          strokeOpacity={isActive ? 0.9 : 0.2}
          filter={isActive ? "url(#neon-glow)" : undefined}
          className="transition-all duration-[400ms] ease-out hover:fill-opacity-40 hover:stroke-opacity-100 hover:[filter:url(#neon-glow)]"
          style={{ transition: "fill-opacity 400ms ease, stroke-width 400ms ease, stroke-opacity 400ms ease" }}
        />
      ))}
    </g>
  );
}
