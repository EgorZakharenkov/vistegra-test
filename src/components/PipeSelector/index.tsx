import { FC } from "react";
import { MaterialItem } from "@/types";
import styles from "../MaterialSelector/style.module.scss";

interface PipeSelectorProps {
  pipes: MaterialItem[];
  onSelect: (pipe: MaterialItem) => void;
}

export const PipeSelector: FC<PipeSelectorProps> = ({ pipes, onSelect }) => {
  return (
    <div className={styles.selectorContainer}>
      <h3 className={styles.selectorTitle}>Выберите трубу</h3>
      <select
        className={styles.selectorSelect}
        onChange={(e) => {
          const selectedIndex = parseInt(e.target.value);
          if (selectedIndex >= 0) {
            onSelect(pipes[selectedIndex]);
          }
        }}
      >
        <option value="" disabled selected>
          Выберите трубу
        </option>
        {pipes.map((pipe, index) => (
          <option key={index} value={index}>
            {pipe.name}
          </option>
        ))}
      </select>
    </div>
  );
};
