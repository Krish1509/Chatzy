import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorType, setCursorType] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cursor) {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      }
    };

    const handleHoverEnter = () => setCursorType("hover");
    const handleHoverLeave = () => setCursorType("");
    const handleTextEnter = () => setCursorType("text");
    const handlePointerEnter = () => setCursorType("pointer");

    // Add event listeners for interactive elements
    document.querySelectorAll("button, a").forEach((el) => {
      el.addEventListener("mouseenter", handlePointerEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    document.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("mouseenter", handleTextEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      // Clean up listeners
      document.querySelectorAll("button, a").forEach((el) => {
        el.removeEventListener("mouseenter", handlePointerEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });

      document.querySelectorAll("input, textarea").forEach((el) => {
        el.removeEventListener("mouseenter", handleTextEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });

      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <div ref={cursorRef} className={`custom-cursor ${cursorType}`}></div>;
};

export default CustomCursor;
