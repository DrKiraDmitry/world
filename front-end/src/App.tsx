import React, { useEffect } from "react";
import "./App.css";
import { World } from "./components/World";
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
} from "three";
import { useObserver } from "mobx-react-lite";
import { RootStore } from "./stores/RootStore";
import { Provider } from "mobx-react";
import { HistoryAdapter } from "mobx-state-router";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer();

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Mesh(geometry, material);
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

let root: RootStore;

const ensureInitialized = () => {
  if (root) return;
  root = new RootStore();
};

function App() {
  ensureInitialized();
  useEffect(() => animate(), []);
  return useObserver(() => (
    <Provider rootStore={root}>
      <div className="App">
        {root.firstPageStore.one && <World />}
        <button onClick={() => root.firstPageStore.Switch()}>Show World</button>
      </div>
    </Provider>
  ));
}

export default App;
