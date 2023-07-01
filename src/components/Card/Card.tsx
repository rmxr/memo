import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
import React from "react";
import { animated } from "@react-spring/web";
import { useSpringAnimation } from "../../utils/useSpringAnimation";

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
  const cardholderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!cardholderRef.current) {
      return;
    }
    const element = cardholderRef.current;
    let entryPoint = { offsetX: 0, offsetY: 0 };
    function track(event: MouseEvent) {
      element.style.transform = `translate(${
        (event.offsetX - entryPoint.offsetX) * 0.02
      }px, ${(event.offsetY - entryPoint.offsetY) * 0.02}px)`;
    }

    function startTracking(event: MouseEvent) {
      entryPoint = { offsetX: event.offsetX, offsetY: event.offsetY };
      element.addEventListener("mousemove", track);
    }

    function stopTracking() {
      element.removeEventListener("mousemove", track);
    }

    element.addEventListener("mouseenter", startTracking);
    element.addEventListener("mouseleave", stopTracking);

    return function cleanup() {
      element.removeEventListener("mouseenter", startTracking);
      element.removeEventListener("mouseleave", stopTracking);
    };
  }, [cardholderRef]);

  const { springValues, handleMouseEnter, handleMouseLeave } =
    useSpringAnimation(cardholderRef);

  return (
    <animated.div
      className={styles.cardholder}
      ref={cardholderRef}
      onClick={onClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={springValues}
    >
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
    </animated.div>
  );
}

export default Card;
