import { MaterialItem } from "@/types";
import { FC } from "react";
import styles from "./style.module.scss";

interface MaterialSelectorProps {
  materials: MaterialItem[];
  onSelect: (material: MaterialItem) => void;
}

export const MaterialSelector: FC<MaterialSelectorProps> = ({
  materials,
  onSelect,
}) => {
  return (
    <div className={styles.selectorContainer}>
      <h3 className={styles.selectorTitle}>Выберите материал</h3>
      <select
        className={styles.selectorSelect}
        onChange={(e) => {
          const selectedIndex = parseInt(e.target.value);
          if (selectedIndex >= 0) {
            onSelect(materials[selectedIndex]);
          }
        }}
      >
        <option value="" disabled selected>
          Выберите материал
        </option>
        {materials.map((material, index) => (
          <option key={index} value={index}>
            {material.name}
          </option>
        ))}
      </select>
    </div>
  );
};
