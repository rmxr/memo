import styles from "./Card.module.css";
import back from "../../assets/back.jpeg";
import React from "react";
import { useSpring, animated } from "@react-spring/web";

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
  let xOffset = 0;
  let yOffset = 0;

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

  const [springValues, springRef] = useSpring(
    () => ({
      x: 0,
      y: 0,
      config: {
        mass: 2,
        friction: 14,
        tension: 120,
      },
    }),
    []
  );

  const handleMouseLeave = () => {
    if (cardholderRef.current) {
      const regex = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/;
      const matches = regex.exec(cardholderRef.current.style.cssText);

      if (matches) {
        xOffset = parseFloat(matches[1]);
        yOffset = parseFloat(matches[2]);
      }
    }
    springRef.start({
      from: {
        x: xOffset,
        y: yOffset,
      },
      to: {
        x: 0,
        y: 0,
      },
    });
  };

  const handleMouseEnter = () => {
    springRef.stop();
  };

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
