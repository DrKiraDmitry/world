import React, { FC, useMemo } from "react";
import style from "src/components/Animation/Fire/FireStyled.module.sass";
import { extend } from "@react-three/fiber";
import styles from "../../../pages/LoginPage/LoginPage.module.sass";

export const AnimationFireComponent = () => {
  const m = useMemo(() => Array(50).fill(1), []);
  return (
    <div className={style.fire__container}>
      {m.map((el, i) => (
        <div key={i} className={style.particle} />
      ))}
    </div>
  );
};

interface FireButtonType {
  text: string;
  img: string;
  onClick: () => void;
}

export const FireButton: FC<FireButtonType> = ({ text, img, onClick }) => {
  return (
    <button
      className={`${styles.loginPage__button} ${styles.loginPage__button_right} ${styles.loginPage__button_open}`}
      onClick={() => onClick}
    >
      <img src={img} />
      <AnimationFireComponent />
      <span className={styles.loginPage__button__span}>{text}</span>
    </button>
  );
};
