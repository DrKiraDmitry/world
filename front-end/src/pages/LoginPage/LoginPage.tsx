import React from "react";
import { useRootStore } from "src/utils/rootStoreUtils";
import { LabelInput } from "../../components/Inputs/LabelInput";

const LoginPage = () => {
  const { loginPageStore: store } = useRootStore();
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
