import { ConfigItem, MaterialItem } from "@/types";

type CalcParams = {
  length: number;
  width: number;
  sheet: MaterialItem;
  pipe: MaterialItem;
  frame: ConfigItem;
  config: ConfigItem[];
};

export function calculateCost({
  length,
  width,
  sheet,
  pipe,
  frame,
  config,
}: CalcParams) {
  const area = length * width;

  // === ЛИСТЫ ===
  const sheetArea = sheet.width ?? 1; // ширина из материала
  const sheetsNeeded = Math.ceil(area / sheetArea);

  // === ТРУБЫ ===
  const pipeWidth = (pipe.width ?? 0) / 1000; // мм → м
  const step = (frame as any).step;

  const horizontalCount =
    Math.floor((width - pipeWidth) / (step + pipeWidth)) + 1;
  const verticalCount =
    Math.floor((length - pipeWidth) / (step + pipeWidth)) + 1;

  const totalPipeLength = horizontalCount * length + verticalCount * width;

  // === САМОРЕЗЫ ===
  const fix = config.find(
    (c) => c.type === "fix" && c.key === sheet.material,
  ) as any;

  const screws = Math.ceil(area * fix.value);

  return {
    sheetsNeeded,
    totalPipeLength: Number(totalPipeLength.toFixed(2)),
    screws,
    totalArea: area,
  };
}
