import { ChangeEvent, FC, useState } from "react";
import styles from "./style.module.scss";

interface SizeInputProps {
  label: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export const SizeInput: FC<SizeInputProps> = ({
  label,
  min,
  max,
  step,
  onChange,
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (newValue >= min && newValue <= max) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{label}</label>
      <input
        className={styles.inputField}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
};
