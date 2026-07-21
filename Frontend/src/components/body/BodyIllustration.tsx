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
      className="h-full w-full max-h-[70vh]"
      role="group"
      aria-label={`Human body, ${view} view`}
    >
      {/* Static non-interactive muscles (head, neck, hands, feet) */}
      {statics.length > 0 && (
        <g fill="var(--brand-soft)" stroke="var(--brand)" strokeWidth={0.3} strokeOpacity={0.25}>
          {statics.map((m) => (
            <path key={m.id} d={m.path} />
          ))}
        </g>
      )}

      {/* Interactive region groups */}
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
          fill={isActive ? "var(--region-color)" : "transparent"}
          stroke="var(--region-color)"
          strokeWidth={isActive ? 0.5 : 0.3}
          strokeOpacity={isActive ? 1 : 0.45}
          style={{
            transition:
              "fill 220ms cubic-bezier(0.22,1,0.36,1), stroke-opacity 220ms ease",
          }}
        />
      ))}
    </g>
  );
}
