import { materials, config } from "./data";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { FC } from "react";
import styles from "./style.module.scss";
export const App: FC = () => {
  return (
    <div className={styles.app}>
      <MaterialCalculator
        materials={materials}
        pipes={materials}
        config={config}
      />
    </div>
  );
};
