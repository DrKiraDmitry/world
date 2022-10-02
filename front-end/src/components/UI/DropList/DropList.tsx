import React, { FC, useState } from "react";
import styles from "./DropList.module.sass";

type DropListItemObj = { name: string | number; val: string | number };

export type DropListProps = {
  items?: DropListItemObj[] | string[];
  name: string | number;
  val: string | number;
};

const DropListItemString: FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      {items.map((el, i) => (
        <li key={el + i} className={styles.DropList__button}>
          <span>{el}</span>
        </li>
      ))}
    </>
  );
};

const DropListItemObj: FC<{ items: DropListItemObj[] }> = ({ items }) => {
  return (
    <>
      {items.map((el, i) => (
        <li key={el.name} className={styles.DropList__button}>
          <span>{el.name}</span>
          <span>{el.val}</span>
        </li>
      ))}
    </>
  );
};

export const DropList: FC<DropListProps> = ({ items, name, val }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className={styles.DropList__button + ` ${open && styles.DropList__button_active}`}
        onClick={() => items && setOpen(!open)}
      >
        <span>
          {name} {JSON.stringify(items)}
        </span>
        <span>{val}</span>
      </button>

      {open && (
        <ul className={styles.DropList__list}>
          {items &&
            (typeof items[0] === "string" ? (
              <DropListItemString items={items as string[]} />
            ) : (
              <DropListItemObj items={items as DropListItemObj[]} />
            ))}
        </ul>
      )}
    </>
  );
};
