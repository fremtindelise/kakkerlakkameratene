import { useState } from "react";
import styles from "./cockroaches.module.css";

export const Cockroaches = () => {
  const [isHidden, setIsHidden] = useState([false, false, false, false]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  const handleButtonClick = (index: any) => {
    if (!isHidden[index]) {
      const updatedIsHidden = [...isHidden];
      updatedIsHidden[index] = true;
      setIsHidden(updatedIsHidden);
      setScore(score + 10);
      setCount(count + 1);
    }
  };

  return (
    <>
      <div className={styles.scoreBoard}>
        <div>Poeng:{score > 0 && <p> {score}</p>}</div>
        <div>Antall moste kakkerlakker: {count > 0 && <p>{count}</p>}</div>
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
    </>
  );
};
