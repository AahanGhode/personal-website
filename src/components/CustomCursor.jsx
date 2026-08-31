import { useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, hovering: false });
  const pointerPosition = useRef({ x: 0, y: 0, hasPosition: false });

  useEffect(() => {
    const isInteractive = (target) =>
      target instanceof Element && Boolean(target.closest("a, button, input, textarea, select"));

    const handlePointerMove = (event) => {
      pointerPosition.current = {
        x: event.clientX,
        y: event.clientY,
        hasPosition: true,
      };
      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        hovering: isInteractive(event.target),
      });
    };

    const handleScroll = () => {
      const { x, y, hasPosition } = pointerPosition.current;
      if (!hasPosition) return;

      setCursor((currentCursor) => ({
        ...currentCursor,
        hovering: isInteractive(document.elementFromPoint(x, y)),
      }));
    };

    const handlePointerLeave = () => {
      setCursor((currentCursor) => ({ ...currentCursor, visible: false }));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`custom-cursor ${cursor.visible ? "custom-cursor-visible" : ""} ${
        cursor.hovering ? "custom-cursor-hovering" : ""
      }`}
      style={{ left: cursor.x, top: cursor.y }}
    >
      <span className="custom-cursor-dot" />
    </div>
  );
};
