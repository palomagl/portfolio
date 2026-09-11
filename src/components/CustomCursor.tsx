import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Em touch não há cursor: não anexa nenhum listener (evita gasto de CPU à toa no mobile).
    if (isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Delegação de evento única no document: cobre elementos criados depois,
    // sem precisar re-anexar listener por elemento (isso vazava memória antes).
    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.("a, button, [data-hover]")) {
        setIsHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest?.("a, button, [data-hover]")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="w-3 h-3 rounded-full bg-primary/80 mix-blend-difference" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.4 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.8 }}
      >
        <div className="w-10 h-10 rounded-full border border-primary/50 glow-primary" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
