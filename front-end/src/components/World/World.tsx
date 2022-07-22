import React, { useEffect } from "react";
import anime from "animejs";
import WorldSvg from "./WorldSvg";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";

function Sphere() {
  const texture = useTexture("./logo192.png");
  return (
    <mesh>
      <sphereGeometry args={[1, 32]} />
      <meshPhysicalMaterial
        envMapIntensity={0.4}
        map={texture}
        clearcoat={0.8}
        clearcoatRoughness={0}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export const ThreeScene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <mesh>
        <Sphere />
      </mesh>
    </Canvas>
  );
};

export const World = () => {
  useEffect(() => {
    anime({
      targets: "svg path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "linear",
      duration: 1500,
      delay: function (el, i) {
        return i * 250;
      },
      direction: "alternate",
      loop: false,
    });
  }, []);
  return <WorldSvg />;
};
