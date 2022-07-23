import React, { FC } from "react";
import { LabelInput } from "../../components/Inputs/LabelInput";
import { LoginPageStore } from "../../stores/LoginPage/LoginPageStore";

const LoginForm: FC<{ store: LoginPageStore }> = ({ store }) => {
  return (
    <div>
      <form>
        <LabelInput type={"text"} onChange={(e) => (store.email = e.target.value)} />
        <LabelInput type={"password"} onChange={(e) => (store.password = e.target.value)} />
        <div>
          <button>Lets Go!</button>
          <button>I wanna too</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
