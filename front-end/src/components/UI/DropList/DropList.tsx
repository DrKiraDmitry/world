import React, { FC, useState } from "react";
import styles from "./DropList.module.sass";

type DropListProps = {
  items?: { name: string | number; val: string | number }[];
  name: string | number;
  val: string | number;
};

export const DropList: FC<DropListProps> = ({ items, name, val }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={styles.DropList__button + ` ${open && styles.DropList__button_active}`}
        onClick={() => items && setOpen(!open)}
      >
        <span>{name}</span>
        <span>{val}</span>
      </button>
      {open && (
        <ul className={styles.DropList__list}>
          {items?.map((el, i) => (
            <li key={name.toString() + val + el.name} className={styles.DropList__button}>
              <span>{el.name}</span>
              <span>{el.val}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
