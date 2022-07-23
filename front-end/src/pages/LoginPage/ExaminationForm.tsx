import React from "react";
import { useRootStore } from "src/utils/rootStoreUtils";

const ExaminationForm = () => {
  const { optimizationStore } = useRootStore();
  return (
    <>
      <h2>Test of resolve!</h2>
      <span>Welcome inmate, i'm glad to meet you</span>
      <span>If your internet have a hight speed and device so Expansive, i'm have to offer you</span>
      <span>Tell me, you ready to felling every experince?</span>
      <div>
        <button onClick={() => optimizationStore.localThief(true)}>Yes, i do </button>
        <button onClick={() => optimizationStore.localThief(false)}>Well, it's so interesting, but dunno</button>
      </div>
    </>
  );
};

export default ExaminationForm;
