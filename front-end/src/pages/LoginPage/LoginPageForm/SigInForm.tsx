import React, { FC } from "react";
import { LabelInput } from "src/components/Inputs/LabelInput";
import { LoginPageStore } from "src/stores/LoginPage/LoginPageStore";

const SigInForm: FC<{ store: LoginPageStore }> = ({ store }) => {
  return (
    <form>
      <LabelInput type={"text"} onChange={(e) => (store.email = e.target.value)} />
      <LabelInput type={"password"} onChange={(e) => (store.password = e.target.value)} />
      <button>Every completed</button>
    </form>
  );
};

export default SigInForm;
