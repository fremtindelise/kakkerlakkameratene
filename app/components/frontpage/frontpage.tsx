import { useState } from "react";
import { Cockroaches } from "../cockroaches/cockroaches";
import styles from "./frontpage.module.css";
import play from "./play.svg";

import "@fremtind/jkl-button/button.min.css";
import "@fremtind/jkl-core/core.min.css";

export const FrontPage = () => {
  const [showCockroaches, setShowCockroaches] = useState(false);
  const [showFrontPage, setShowFrontPage] = useState(true);

  const toggleCockroaches = () => {
    setShowCockroaches(!showCockroaches);
    setShowFrontPage(false);
  };
  return (
    <>
      {showFrontPage && (
        <div className={styles.frontPageContainer}>
          <div className={styles.gameName}>
            La Cucaracha<span className={styles.gameName__bug}>🪳</span>
          </div>
          <div className={styles.frontPageContainer__instructions}>
            Trykk på knappen og mos flest mulig kakkerlakker. Du har 10 sekunder
            på deg.
            <div className={styles.frontPageContainer__buttonContainer}>
              <button className={styles.button} onClick={toggleCockroaches}>
                <img src={play} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showCockroaches && <Cockroaches />}
    </>
  );
};
