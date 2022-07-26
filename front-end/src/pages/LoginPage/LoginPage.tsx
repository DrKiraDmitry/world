import React, { useState } from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import ExaminationForm from "./LoginPageForm/ExaminationForm";
import SigInForm from "./LoginPageForm/SigInForm";
import LoginForm from "./LoginPageForm/LoginForm";
import styles from "./LoginPage.module.sass";
import { MusicComponent } from "../../components/MusicComponent/MusicComponent";
import { AnimationFireComponent, FireButton } from "../../components/Animation/Fire/AnimationFireComponent";
import leftButton from "./loginButtonLeft.svg";

export const LoginPage = () => {
  const { loginPageStore: store, optimizationStore } = useRootStore();
  const [loginForm, setLoginForm] = useState(true);
  return useObserver(() => (
    <div
      className={`${styles.loginPage__container} ${
        loginForm ? styles.loginPage__container_1 : styles.loginPage__container_2
      } `}
    >
      <MusicComponent />
      {optimizationStore.thief !== null ? (
        <>
          <FireButton text={"Login"} img={leftButton} onClick={() => setLoginForm(true)} />
          <div className={styles.loginPage__form}>
            {loginForm ? <LoginForm store={store} /> : <SigInForm store={store} />}
          </div>
          <FireButton text={"I wanna too"} img={leftButton} onClick={() => setLoginForm(false)} />
        </>
      ) : (
        <ExaminationForm />
      )}
    </div>
  ));
};
