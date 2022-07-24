import React, { useState } from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import ExaminationForm from "./ExaminationForm";
import SigInForm from "./SigInForm";
import LoginForm from "./LoginForm";
import styles from "./LoginPage.module.sass";

export const LoginPage = () => {
  const { loginPageStore: store, optimizationStore } = useRootStore();
  const [loginForm, setLoginForm] = useState(true);
  return useObserver(() => (
    <div
      className={`${styles.loginPage__container} ${
        loginForm ? styles.loginPage__container_1 : styles.loginPage__container_2
      } `}
    >
      <button style={{ position: "fixed", left: 0 }} onClick={() => optimizationStore.clear()}>
        Clear
      </button>
      {optimizationStore.thief !== null ? (
        <>
          <button
            className={`${styles.loginPage__button} ${styles.loginPage__button_left}`}
            onClick={() => setLoginForm(true)}
          >
            <span className={styles.loginPage__button__span}>Login</span>
          </button>
          {loginForm ? <LoginForm store={store} /> : <SigInForm store={store} />}
          <button
            className={`${styles.loginPage__button} ${styles.loginPage__button_right}`}
            onClick={() => setLoginForm(false)}
          >
            <span className={styles.loginPage__button__span}>I wanna too</span>
          </button>
        </>
      ) : (
        <ExaminationForm />
      )}
    </div>
  ));
};
