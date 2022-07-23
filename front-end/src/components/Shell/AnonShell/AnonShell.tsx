import React, { FC } from "react";
import styles from "./AnonShell.module.sass";

export const AnonShell: FC = ({ children }) => {
  return <div className={styles.anonShell}>{children}</div>;
};
