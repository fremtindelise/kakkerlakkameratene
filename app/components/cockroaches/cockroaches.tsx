import { useState, useEffect, useRef } from "react";
import styles from "./cockroaches.module.css";
import song from "./la_cucaracha.mp3";
import ReactAudioPlayer from "react-audio-player";
import roach from "./roach.png";

export const Cockroaches = () => {
  const socket = new WebSocket("ws://localhost:8000");
  socket.addEventListener("open", () => {
    socket.send("reset - spill ferdig");
  });

  const [isHidden, setIsHidden] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [showCounter, setShowCounter] = useState(true);
  const [count, setCount] = useState(3);
  const [hideBackground, setHideBackground] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (showCounter) {
      const timer = setTimeout(() => {
        if (count > 1) {
          setCount(count - 1);
        } else {
          setShowCounter(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showCounter, count]);

  useEffect(() => {
    if (!showCounter) {
      const hideTimer = setTimeout(() => {
        setShowCounter(false);
      }, 4000);

      return () => clearTimeout(hideTimer);
    }
  }, [showCounter]);

  const handleButtonClick = (index: any) => {
    if (!isHidden[index]) {
      const updatedIsHidden = [...isHidden];
      updatedIsHidden[index] = true;
      setIsHidden(updatedIsHidden);
      setScore(score + 10);
      setNumber(number + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "K" || event.key === "k") {
        buttonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideBackground(true);
    }, 14000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (hideBackground) {
    return (
      <div className={styles.scoreContainer}>
        <div className={styles.finalScore}>
          <div className={styles.finalScore__content}>
            Du fikk&nbsp;{score > 0 && <p>{score}</p>}&nbsp;poeng og moste&nbsp;
            {number > 0 && <p>{number}</p>}&nbsp;kakkerlakker.
            <br />
            Du er nå med i trekningen om sykt fine premier. Det lønner seg å
            komme på kontoret.
          </div>
          <div>
            <div className={styles.highScore}>Highscore</div>
            <table className={styles.table}>
              <tr>
                <td>01</td>
                <td>Navn Navnesen</td>
                <td>Score</td>
              </tr>
              <tr>
                <td>02</td>
                <td>Navn Navnesen</td>
                <td>Score</td>
              </tr>
              <tr>
                <td>03</td>
                <td>Navn Navnesen</td>
                <td>Score</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showCounter ? (
        <div className={styles.counter}>
          {count > 0 ? <div>{count}</div> : <div>Start</div>}
        </div>
      ) : (
        <div className={styles.backgroundImage}>
          <ReactAudioPlayer src={song} autoPlay />
          <div className={styles.scoreBoard}>
            <div>Poeng:{score > 0 && <p> {score}</p>}</div>
            <div>
              Antall moste kakkerlakker: {number > 0 && <p>{number}</p>}
            </div>
          </div>

          <div className={styles.container}>
            {[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20,
            ].map(
              (index) =>
                !isHidden[index] && (
                  <span
                    key={index}
                    className={styles["movingCockroach" + (index + 1)]}
                  >
                    <img src={roach} />
                  </span>
                )
            )}
            <button
              ref={buttonRef}
              className={styles.hammer}
              onClick={() => {
                for (let index = 0; index < isHidden.length; index++) {
                  if (!isHidden[index]) {
                    handleButtonClick(index);
                    break;
                  }
                }
              }}
            >
              🔨
            </button>
          </div>
        </div>
      )}
    </>
  );
};
