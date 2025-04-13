import React, { useState } from "react";
import { MaterialSelector } from "@/components/MaterialSelector";
import { PipeSelector } from "@/components/PipeSelector";
import { SizeInput } from "@/components/SizeInput";
import { StrengthSelector } from "@/components/StrengthSelector";
import { CalculationResults, ConfigItem, MaterialItem } from "@/types";
import styles from "./style.module.scss";
import { ResultsTable } from "@/components/ResultsTable";

interface MaterialCalculatorProps {
  materials: MaterialItem[];
  pipes: MaterialItem[];
  config: ConfigItem[];
}

export const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
  materials,
  pipes,
  config,
}) => {
  const lengthConfig = config.find(({ key }) => key === "length");
  const widthConfig = config.find(({ key }) => key === "width");
  const screw = materials.find(({ type }) => type === "fix");
  const screwPrice = screw?.price || 1.1;

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(
    null,
  );
  const [selectedPipe, setSelectedPipe] = useState<MaterialItem | null>(null);
  const [length, setLength] = useState<number>(lengthConfig?.min || 5);
  const [width, setWidth] = useState<number>(widthConfig?.min || 5);
  const [frame, setFrame] = useState<string>(
    config.find(({ key }) => key === "light")?.key || "light",
  );
  const [calculationResults, setCalculationResults] =
    useState<CalculationResults | null>(null);

  const handleMaterialSelect = (material: MaterialItem) => {
    setSelectedMaterial(material);
  };

  const handlePipeSelect = (pipe: MaterialItem) => {
    setSelectedPipe(pipe);
  };

  const handleSizeChange = (value: number) => {
    setLength(value);
  };

  const handleWidthChange = (value: number) => {
    setWidth(value);
  };

  const handleFrameChange = (frame: string) => {
    setFrame(frame);
  };

  const calculate = () => {
    if (!selectedMaterial || !selectedPipe) return;

    const sheetArea = length * width;

    const sheetsRequired = Math.ceil(sheetArea / (selectedMaterial.width || 1)); // Ширина материала из БД

    // Расчет необходимого количества трубы
    const pipeDistance = config.find((item) => item.key === frame)?.step || 1;
    const pipeRequired = Math.ceil((length + width) / pipeDistance);

    // Количество саморезов
    const screwsRequired =
      selectedMaterial.material === "plastic"
        ? Math.ceil(sheetArea * 10)
        : Math.ceil(sheetArea * 5);

    // Расчет стоимости
    const sheetPrice = selectedMaterial.price || 0;
    const pipePrice = selectedPipe.price || 0;
    const totalCost =
      sheetsRequired * sheetPrice +
      pipeRequired * pipePrice +
      screwsRequired * screwPrice;

    setCalculationResults({
      sheetsRequired,
      pipeRequired,
      screwsRequired,
      sheetArea,
      totalCost,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Калькулятор материалов</h2>
      <MaterialSelector
        materials={materials.filter((m) => m.type === "list")}
        onSelect={handleMaterialSelect}
      />
      <PipeSelector
        pipes={pipes.filter((p) => p.type === "pipe")}
        onSelect={handlePipeSelect}
      />
      <SizeInput
        label="Длина"
        min={lengthConfig?.min || 5}
        max={lengthConfig?.max || 50}
        step={lengthConfig?.step || 0.2}
        onChange={handleSizeChange}
      />
      <SizeInput
        label="Ширина"
        min={widthConfig?.min || 5}
        max={widthConfig?.max || 25}
        step={widthConfig?.step || 0.2}
        onChange={handleWidthChange}
      />
      <StrengthSelector
        frameOptions={config.filter((c) => c.type === "frame")}
        onSelect={handleFrameChange}
      />
      <button className={styles.button} onClick={calculate}>
        Рассчитать
      </button>
      {calculationResults && selectedMaterial && selectedPipe && (
        <div className={styles.results}>
          <h3>Результаты расчетов</h3>
          <p>Площадь изделия: {calculationResults.sheetArea} м²</p>
          <p>
            Размер ячейки: {config.find(({ key }) => key === frame)?.step} м
          </p>
          <ResultsTable
            screwPrice={screwPrice}
            results={calculationResults}
            selectedMaterial={selectedMaterial}
            selectedPipe={selectedPipe}
          />
        </div>
      )}
    </div>
  );
};
