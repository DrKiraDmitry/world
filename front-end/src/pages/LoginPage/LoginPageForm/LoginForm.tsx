import React, { FC } from "react";
import { LabelInput } from "src/components/Inputs/LabelInput";
import { LoginPageStore } from "src/stores/LoginPage/LoginPageStore";

const LoginForm: FC<{ store: LoginPageStore }> = ({ store }) => {
  return (
    <form>
      <LabelInput type={"text"} onChange={(e) => (store.email = e.target.value)} />
      <LabelInput type={"password"} onChange={(e) => (store.password = e.target.value)} />
      <div>
        <button>Accept</button>
        <button>I dunno my password</button>
      </div>
    </form>
  );
};

export default LoginForm;
