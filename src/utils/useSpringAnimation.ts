import React from "react";
import { useSpring } from "@react-spring/web";

export function useSpringAnimation(ref: React.RefObject<HTMLDivElement>) {
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
    if (ref.current) {
      const regex =
        /translate\((?<offsetX>[-\d.]+)px,\s*(?<offsetY>[-\d.]+)px\)/;
      const transformValue = ref.current.style.transform;
      const matches = regex.exec(transformValue);

      if (matches?.groups) {
        const { offsetX, offsetY } = matches.groups;
        springRef.start({
          from: {
            x: parseFloat(offsetX),
            y: parseFloat(offsetY),
          },
          to: {
            x: 0,
            y: 0,
          },
        });
      }
    }
  };
  const handleMouseEnter = () => {
    springRef.stop();
  };

  return { springValues, handleMouseEnter, handleMouseLeave };
}
