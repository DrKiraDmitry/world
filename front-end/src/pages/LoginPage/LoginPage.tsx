﻿import React, { useState } from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { useObserver } from "mobx-react-lite";
import ExaminationForm from "./LoginPageForm/ExaminationForm";
import SigInForm from "./LoginPageForm/SigInForm";
import LoginForm from "./LoginPageForm/LoginForm";
import styles from "./LoginPage.module.sass";
import { MusicComponent } from "src/components/MusicComponent/MusicComponent";
import { FireButton } from "src/components/Animation/Fire/AnimationFireComponent";
import leftButton from "./loginButtonLeft.svg";

export const LoginPage = () => {
  const { loginPageStore: store } = useRootStore();
  const [loginForm, setLoginForm] = useState(true);
  return useObserver(() => (
    <>
      <MusicComponent />
      <div
        className={`${styles.loginPage__container} ${
          loginForm ? styles.loginPage__container_1 : styles.loginPage__container_2
        } `}
      >
        <>
          <FireButton
            text={"Login"}
            img={leftButton}
            onClick={() => setLoginForm(true)}
            position={"left"}
            open={loginForm}
          />
          {loginForm ? <LoginForm store={store} /> : <SigInForm store={store} />}
          <FireButton
            text={"I wanna too"}
            img={leftButton}
            onClick={() => setLoginForm(false)}
            position={"right"}
            open={!loginForm}
          />
        </>
      </div>
    </>
  ));
};
