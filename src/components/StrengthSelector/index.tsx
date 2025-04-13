import { FC } from "react";
import styles from "./style.module.scss";

interface StrengthSelectorProps {
  frameOptions: { key: string; name: string }[];
  onSelect: (frame: string) => void;
}

export const StrengthSelector: FC<StrengthSelectorProps> = ({
  frameOptions,
  onSelect,
}) => {
  return (
    <div className={styles.selectorContainer}>
      <h3 className={styles.selectorLabel}>Выберите прочность</h3>
      <select
        className={styles.selectorField}
        onChange={(e) => onSelect(e.target.value)}
      >
        {frameOptions.map((frame) => (
          <option key={frame.key} value={frame.key}>
            {frame.name}
          </option>
        ))}
      </select>
    </div>
  );
};
