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
  const cardholderRef = React.useRef<HTMLDivElement>(null);
  const [entryPoint, setEntryPoint] = React.useState({
    offsetX: 0,
    offsetY: 0,
  });

  // React.useEffect(() => {
  //   if (!cardholderRef.current) {
  //     return;
  //   }
  //   const element = cardholderRef.current;
  //   let entryPoint = { offsetX: 0, offsetY: 0 };
  //   function track(event: MouseEvent) {
  //     element.style.transform = `translate(${
  //       (event.offsetX - entryPoint.offsetX) * 0.02
  //     }px, ${(event.offsetY - entryPoint.offsetY) * 0.02}px)`;
  //   }
  //
  //   function startTracking(event: MouseEvent) {
  //     entryPoint = { offsetX: event.offsetX, offsetY: event.offsetY };
  //     element.addEventListener("mousemove", track);
  //   }
  //
  //   function stopTracking() {
  //     element.removeEventListener("mousemove", track);
  //     element.removeAttribute("style");
  //   }
  //
  //   element.addEventListener("mouseenter", startTracking);
  //   element.addEventListener("mouseleave", stopTracking);
  //
  //   return () => {
  //     element.removeEventListener("mouseenter", startTracking);
  //     element.removeEventListener("mouseleave", stopTracking);
  //   };
  // }, [cardholderRef]);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const el = event.target as HTMLDivElement;
    const offsetX = (event.nativeEvent.offsetX - entryPoint.offsetX) * 0.02;
    const offsetY = (event.nativeEvent.offsetY - entryPoint.offsetY) * 0.02;

    el.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const el = event.target as HTMLDivElement;

    el.removeAttribute("style");
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (event) => {
    setEntryPoint({
      offsetX: event.nativeEvent.offsetX,
      offsetY: event.nativeEvent.offsetY,
    });
  };

  return (
    <div
      className={styles.cardholder}
      ref={cardholderRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
    </div>
  );
}

export default Card;
