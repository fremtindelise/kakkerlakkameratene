import { useState, useEffect } from "react";
import styles from "./cockroaches.module.css";
import fremtind from "./fremtind.png";

export const Cockroaches = () => {
  const [isHidden, setIsHidden] = useState([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [number, setNumber] = useState(0);
  const [showCounter, setShowCounter] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (showCounter) {
      const timer = setTimeout(() => {
        if (count < 4) {
          setCount(count + 1);
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

  console.log(count);

  return (
    <>
      {showCounter ? (
        <div className={styles.counter}>
          {count < 4 ? <div>{count}</div> : <div>Start</div>}
        </div>
      ) : (
        <div className={styles.backgroundImage}>
          {/* <img src={fremtind} /> */}
          <div className={styles.scoreBoard}>
            <div>Poeng:{score > 0 && <p> {score}</p>}</div>
            <div>
              Antall moste kakkerlakker: {number > 0 && <p>{number}</p>}
            </div>
          </div>

          <div className={styles.container}>
            {[0, 1, 2, 3].map(
              (index) =>
                !isHidden[index] && (
                  <span
                    key={index}
                    className={styles["movingCockroach" + (index + 1)]}
                  >
                    🪳
                  </span>
                )
            )}
            <button
              className={styles.hammer}
              onClick={() => {
                for (let index = 0; index < isHidden.length; index++) {
                  if (!isHidden[index]) {
                    handleButtonClick(index);
                    break; // Stop after handling the first visible cockroach
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
