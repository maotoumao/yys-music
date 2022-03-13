import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";

import bg from "@/resources/bg.gif?url";
import initGame from "./game/initGame";
import useLoadingProgress from "./usingLoadingProgress";

export default function Index() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const loadingProgress = useLoadingProgress();

  useEffect(() => {
    initGame(canvas.current!);
  }, []);

  return (
    <div>
      {loadingProgress < 1 ? (
        <div className={styles.loading}>
          loading....{loadingProgress * 100} %
        </div>
      ) : (
        <div className={styles.wrapper}>
          <img
            src={bg}
            className={
              window.innerHeight > window.innerWidth ? styles.bg_or : styles.bg
            }
          ></img>
        </div>
      )}

      <canvas ref={canvas} className={styles.game}></canvas>
    </div>
  );
}
