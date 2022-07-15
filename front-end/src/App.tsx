import React from "react";
import "src/App.css";
import { useObserver } from "mobx-react-lite";
import { RootStore } from "src/stores/RootStore";
import { Provider } from "mobx-react";

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
};

function App() {
  ensureInitialized();
  return useObserver(() => (
    <Provider rootStore={root}>
      <div className="App"></div>
    </Provider>
  ));
}

export default App;
