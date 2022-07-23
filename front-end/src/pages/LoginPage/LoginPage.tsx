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
    <div className={styles.loginPage__container}>
      <button style={{ position: "fixed", left: 0 }} onClick={() => optimizationStore.clear()}>
        Clear
      </button>
      {optimizationStore.thief !== null ? (
        <>
          <button onClick={() => setLoginForm(true)}>Login</button>
          {loginForm ? <LoginForm store={store} /> : <SigInForm store={store} />}
          <button onClick={() => setLoginForm(false)}>I wanna too</button>
        </>
      ) : (
        <ExaminationForm />
      )}
    </div>
  ));
};
