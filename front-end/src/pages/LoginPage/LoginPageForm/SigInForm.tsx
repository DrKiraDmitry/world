import React, { FC } from "react";
import { LabelInput } from "src/components/Inputs/LabelInput";
import { LoginPageStore } from "src/stores/LoginPage/LoginPageStore";
import styles from "../LoginPage.module.sass";

const SigInForm: FC<{ store: LoginPageStore }> = ({ store }) => {
  return (
    <form className={styles.loginPage__form} onSubmit={(e) => e.preventDefault()}>
      <h1>Nice to meet you, Inmate</h1>
      <LabelInput
        className={styles.loginPage__form__input}
        styleOnLabel={styles.loginPage__form__label}
        type={"text"}
        placeholder={"Place for your email"}
        title={"Email"}
        onChange={(e) => (store.email = e.target.value)}
      />
      <LabelInput
        className={styles.loginPage__form__input}
        styleOnLabel={styles.loginPage__form__label}
        type={"password"}
        placeholder={"Place for your password"}
        title={"Password"}
        onChange={(e) => (store.password = e.target.value)}
      />
      <button className={styles.loginPage__form__button} onClick={() => store.register()}>
        Every completed
      </button>
    </form>
  );
};

export default SigInForm;
