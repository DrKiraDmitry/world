import React, { useEffect } from "react";
import anime from "animejs";
import { WorldSvg } from "./WorldSvg";

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
