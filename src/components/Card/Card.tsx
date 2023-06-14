import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
import React from "react";
function Card({
  imageUrl,
  off,
  flip,
  onClick,
}: {
  imageUrl: string;
  off: boolean;
  flip: boolean;
  onClick: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(document.createElement("div"));

  React.useEffect(() => {
    let entryPoint = [0, 0];
    const track = (moveEvent: MouseEvent) => {
      moveEvent.stopPropagation();
      ref.current.style.transform = `translate(${
        (moveEvent.offsetX - entryPoint[0]) * 0.02
      }px, ${(moveEvent.offsetY - entryPoint[1]) * 0.02}px)`;
    };

    ref.current.addEventListener("mouseenter", (event) => {
      entryPoint = [event.offsetX, event.offsetY];
      ref.current.addEventListener("mousemove", track);
    });

    ref.current.addEventListener("mouseleave", () => {
      ref.current.removeEventListener("mousemove", track);
      ref.current.removeAttribute("style");
    });
  }, [ref]);

  return (
    <div className={styles.cardholder} ref={ref} onClick={onClick}>
      <div
        className={`${styles.card} ${flip ? styles.flipped : ""} ${
          off ? `${styles.off} ${styles.flipped}` : ""
        }`}
      >
        <div className={styles.front}>
          <img className={styles.image} src={imageUrl} alt={"Card Image"} />
        </div>
        <div className={styles.back}>
          <img className={styles.image} src={back} alt={"Card Back"} />
        </div>
      </div>
    </div>
  );
}

export default Card;
