export type MaterialItem = {
  type: "list" | "pipe" | "fix";
  name: string;
  material?: string;
  unit: string;
  width?: number;
  price: number;
  size?: string;
};

export interface ConfigItem {
  type: "size" | "frame" | "material" | "fix";
  key: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
}

export interface CalculationResults {
  sheetsRequired: number;
  pipeRequired: number;
  screwsRequired: number;
  sheetArea: number;
  totalCost: number;
}
