import React, { createRef, useEffect, useLayoutEffect } from "react";
import persona from "./persona.mp3";

export const MusicComponent = () => {
  const ref = createRef<HTMLAudioElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = 0.1;
    }
  }, []);
  return (
    <div>
      <audio ref={ref} hidden autoPlay controls loop>
        <source src={persona} type={"audio/mpeg"} />
      </audio>
    </div>
  );
};
