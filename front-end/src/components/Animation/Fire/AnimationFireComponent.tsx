import React, { FC, useMemo } from "react";
import styles from "src/components/Animation/Fire/FireStyled.module.sass";

export const AnimationFireComponent = () => {
  const m = useMemo(() => Array(50).fill(1), []);
  return (
    <div className={styles.fire__container}>
      {m.map((el, i) => (
        <div key={i} className={styles.particle} />
      ))}
    </div>
  );
};

interface FireButtonType {
  text: string;
  img: string;
  open: boolean;
  position: "left" | "right";
  onClick: () => void;
}

export const FireButton: FC<FireButtonType> = ({ text, img, onClick, position, open }) => {
  const p = useMemo(() => {
    switch (position) {
      case "left":
        return styles.Fire__button_left;
      case "right":
        return styles.Fire__button_right;
    }
  }, [position]);

  return (
    <button className={`${styles.Fire__button} ${p} ${open && styles.Fire__button_open}`} onClick={() => onClick()}>
      <img alt={`image show true form`} className={styles.Fire__button__img} src={img} />
      <AnimationFireComponent />
      <span className={styles.Fire__button__span}>{text}</span>
    </button>
  );
};
