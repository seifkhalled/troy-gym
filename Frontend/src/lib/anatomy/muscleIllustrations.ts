import { FRONT_MUSCLES, BACK_MUSCLES } from "body-muscles";
import { MUSCLES, type RegionId, type BodyView } from "@/lib/anatomy/muscleRegistry";

export const FRONT_VIEWBOX = "0 0 35 93";
export const BACK_VIEWBOX = "37 0 35 93";

export interface MuscleRender {
  id: string;
  label: string;
  path: string;
  region?: RegionId;
  interactive: boolean;
}

export interface RegionRender {
  regionId: RegionId;
  paths: string[];
  muscleIds: string[];
}

export function getBodyIllustrationData(view: BodyView): {
  regions: RegionRender[];
  statics: MuscleRender[];
  viewBox: string;
} {
  const source = view === "front" ? FRONT_MUSCLES : BACK_MUSCLES;
  const viewBox = view === "front" ? FRONT_VIEWBOX : BACK_VIEWBOX;
  const regionMap = new Map<RegionId, { paths: string[]; muscleIds: string[] }>();
  const statics: MuscleRender[] = [];

  const interactiveIds = new Set<string>();

  for (const muscle of Object.values(MUSCLES)) {
    if (muscle.view !== view) continue;
    for (const svgId of muscle.svgElementIds) {
      interactiveIds.add(svgId);
      const match = source.find((m) => m.id === svgId);
      if (!match) continue;
      const entry = regionMap.get(muscle.region) ?? { paths: [], muscleIds: [] };
      entry.paths.push(match.path);
      entry.muscleIds.push(muscle.id);
      regionMap.set(muscle.region, entry);
    }
  }

  for (const def of source) {
    if (!interactiveIds.has(def.id)) {
      statics.push({ id: def.id, label: def.name, path: def.path, interactive: false });
    }
  }

  const regions: RegionRender[] = [];
  for (const [regionId, data] of regionMap) {
    regions.push({ regionId, paths: data.paths, muscleIds: data.muscleIds });
  }

  return { regions, statics, viewBox };
}

export function getMusclePathsForRegion(region: RegionId, view: BodyView): MuscleRender[] {
  const source = view === "front" ? FRONT_MUSCLES : BACK_MUSCLES;
  const results: MuscleRender[] = [];

  for (const muscle of Object.values(MUSCLES)) {
    if (muscle.region !== region || muscle.view !== view) continue;
    for (const svgId of muscle.svgElementIds) {
      const match = source.find((m) => m.id === svgId);
      if (match) {
        results.push({
          id: muscle.id,
          label: muscle.label,
          path: match.path,
          region,
          interactive: true,
        });
      }
    }
  }
  return results;
}

export function computeRegionViewBox(paths: string[], view: BodyView): string {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  for (const path of paths) {
    const tokens = path.match(/[mlcqzMLCQZ]|[-\d.]+/g) || [];
    let cx = 0, cy = 0;
    let i = 0;
    while (i < tokens.length) {
      const cmd = tokens[i++];
      let relative = false;
      let cmdType = cmd;
      if (cmd === "m" || cmd === "l" || cmd === "c" || cmd === "q") {
        relative = true;
        cmdType = cmd;
      } else if (cmd === "M" || cmd === "L" || cmd === "C" || cmd === "Q") {
        relative = false;
        cmdType = cmd.toLowerCase();
      } else if (cmd === "z" || cmd === "Z") {
        continue;
      } else {
        cmdType = "l";
        relative = true;
        i--;
      }

      const args: number[] = [];
      while (i < tokens.length && /^-?[\d.]+$/.test(tokens[i])) {
        args.push(parseFloat(tokens[i++]));
      }

      if (cmdType === "m" && args.length >= 2) {
        const nx = relative ? cx + args[0] : args[0];
        const ny = relative ? cy + args[1] : args[1];
        cx = nx; cy = ny;
        minX = Math.min(minX, cx); minY = Math.min(minY, cy);
        maxX = Math.max(maxX, cx); maxY = Math.max(maxY, cy);
      } else if (cmdType === "l" && args.length >= 2) {
        for (let j = 0; j + 1 < args.length; j += 2) {
          const nx = relative ? cx + args[j] : args[j];
          const ny = relative ? cy + args[j + 1] : args[j + 1];
          cx = nx; cy = ny;
          minX = Math.min(minX, cx); minY = Math.min(minY, cy);
          maxX = Math.max(maxX, cx); maxY = Math.max(maxY, cy);
        }
      } else if (cmdType === "c" && args.length >= 6) {
        const nx = relative ? cx + args[4] : args[4];
        const ny = relative ? cy + args[5] : args[5];
        cx = nx; cy = ny;
        minX = Math.min(minX, cx, relative ? cx + args[0] : args[0], relative ? cx + args[2] : args[2]);
        minY = Math.min(minY, cy, relative ? cy + args[1] : args[1], relative ? cy + args[3] : args[3]);
        maxX = Math.max(maxX, cx, relative ? cx + args[0] : args[0], relative ? cx + args[2] : args[2]);
        maxY = Math.max(maxY, cy, relative ? cy + args[1] : args[1], relative ? cy + args[3] : args[3]);
      } else if (cmdType === "q" && args.length >= 4) {
        const nx = relative ? cx + args[2] : args[2];
        const ny = relative ? cy + args[3] : args[3];
        cx = nx; cy = ny;
        minX = Math.min(minX, cx, relative ? cx + args[0] : args[0]);
        minY = Math.min(minY, cy, relative ? cy + args[1] : args[1]);
        maxX = Math.max(maxX, cx, relative ? cx + args[0] : args[0]);
        maxY = Math.max(maxY, cy, relative ? cy + args[1] : args[1]);
      }
    }
  }

  if (!isFinite(minX)) {
    return view === "front" ? "0 0 35 93" : "37 0 35 93";
  }

  const padX = (maxX - minX) * 0.25;
  const padY = (maxY - minY) * 0.25;
  return `${Math.max(0, minX - padX)} ${Math.max(0, minY - padY)} ${maxX - minX + padX * 2} ${maxY - minY + padY * 2}`;
}
