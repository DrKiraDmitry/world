import React, { FC } from "react";
import { LabelInput } from "src/components/Inputs/LabelInput";
import { LoginPageStore } from "src/stores/LoginPage/LoginPageStore";
import styles from "../LoginPage.module.sass";
import { useRootStore } from "src/utils/rootStoreUtils";

const LoginForm: FC<{ store: LoginPageStore }> = ({ store }) => {
  return (
    <form className={styles.loginPage__form} onSubmit={(e) => e.preventDefault()}>
      <h1 className={styles.loginPage__h1}>Welcome back Inmate</h1>
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
        title={"Password"}
        placeholder={"Place for your password"}
        onChange={(e) => (store.password = e.target.value)}
      />
      <div style={{ display: "flex", width: "100%" }}>
        <button className={styles.loginPage__form__button} onClick={() => store.login()}>
          Accept
        </button>
        <button className={styles.loginPage__form__button}>I dunno my password</button>
      </div>
    </form>
  );
};

export default LoginForm;
