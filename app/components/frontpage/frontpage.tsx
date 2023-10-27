import { useState } from "react";
import { Cockroaches } from "../cockroaches/cockroaches";
import styles from "./frontpage.module.css";
import { PrimaryButton } from "@fremtind/jkl-button-react";
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
          <div className={styles.frontPageContainer__instructions}>
            Trykk på knappen og mos flest mulig kakkerlakker. <br />
            Du har 10 sekunder på deg!
            <div className={styles.frontPageContainer__buttonContainer}>
              <PrimaryButton onClick={toggleCockroaches}>Start</PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {showCockroaches && <Cockroaches />}
    </>
  );
};
