import React, { createRef, useEffect, useLayoutEffect, useState } from "react";
import persona from "./persona.mp3";

export const MusicComponent = () => {
  const ref = createRef<HTMLAudioElement>();
  const [play, setPlay] = useState(false);

  const playMusic = async () => {
    if (!play) {
      await ref.current?.play().then(() => setPlay(true));
      return;
    }
    if (play) {
      ref.current?.pause();
      setPlay(false);
      return;
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = 0.1;
    }
  }, []);

  return (
    <div style={{ position: "fixed", right: "1rem", top: "1rem", color: "white" }}>
      <button onClick={() => playMusic()}>Music: {play ? "on" : "off"}</button>
      <audio ref={ref} hidden controls loop>
        <source src={persona} type={"audio/mpeg"} />
      </audio>
    </div>
  );
};
