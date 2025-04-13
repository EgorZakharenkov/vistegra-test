import { FC } from "react";
import { CalculationResults, MaterialItem } from "@/types";
import styles from "./style.module.scss";

interface ResultsTableProps {
  results: CalculationResults;
  selectedMaterial: MaterialItem;
  selectedPipe: MaterialItem;
  screwPrice: number;
}

export const ResultsTable: FC<ResultsTableProps> = ({
  results,
  selectedMaterial,
  selectedPipe,
  screwPrice,
}) => {
  const items = [
    {
      name: `${selectedMaterial.name} ${selectedMaterial.width} м²`,
      unit: "м²",
      quantity: results.sheetsRequired,
      price: selectedMaterial.price || 0,
    },
    {
      name: `${selectedPipe.name} ${selectedPipe.size || ""}`,
      unit: "м.п.",
      quantity: results.pipeRequired,
      price: selectedPipe.price || 0,
    },
    {
      name: "Саморез",
      unit: "шт",
      quantity: results.screwsRequired,
      price: screwPrice,
    },
  ];
  const titles = ["Наименование", "ед.", "кол-во", "сумма"];
  return (
    <table className={styles.resultsTable}>
      <thead>
        <tr>
          {titles.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map(({ unit, name, quantity, price }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{unit}</td>
            <td>{quantity}</td>
            <td>{(quantity * price).toFixed(2)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}>Итого:</td>
          <td>{results.totalCost.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};
