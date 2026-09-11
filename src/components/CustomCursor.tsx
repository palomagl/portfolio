import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const RING_DEFAULT = 34;
const RING_PAD = 8;

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * Cursor customizado:
 * - Ponto "cometa": segue o ponteiro quase 1:1 e estica na direção do
 *   movimento (mais rápido = mais alongado), volta a círculo quando para.
 * - Anel magnético: em repouso segue o ponteiro com leve atraso (spring);
 *   ao passar sobre `a`, `button` ou `[data-hover]`, morfa até o tamanho e
 *   formato do elemento (com puxão sutil na direção do ponteiro dentro dele).
 * - Pulso de clique: anel curto que expande e some a cada `mousedown`.
 * Some inteiramente em touch (sem cursor real, sem anexar nada).
 */
const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const stretch = useSpring(1, { stiffness: 260, damping: 20 });
  const squeeze = useSpring(1, { stiffness: 260, damping: 20 });
  const angle = useMotionValue(0);

  const ringX = useSpring(-100, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(-100, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringW = useSpring(RING_DEFAULT, { stiffness: 260, damping: 26 });
  const ringH = useSpring(RING_DEFAULT, { stiffness: 260, damping: 26 });
  const ringRadius = useSpring(999, { stiffness: 260, damping: 26 });

  useEffect(() => {
    if (isTouchDevice()) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let settleTimer = 0;

    let hoverRect: DOMRect | null = null;
    let isHovering = false;
    let isVisible = false;

    // O mousemove nativo pode disparar muito mais rápido que a tela renderiza
    // (mouse/trackpad de alta taxa de amostragem chegam a 500-1000/s). Sem
    // isso, cada evento fazia trigonometria + set/clearTimeout — era o maior
    // custo do cursor. Agora só processamos 1x por frame (rAF coalescing);
    // eventos entre frames só atualizam a posição "crua", que é barata.
    let pendingEvent: MouseEvent | null = null;
    let rafId = 0;

    const processMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      dotX.set(x);
      dotY.set(y);
      if (!isVisible) {
        isVisible = true;
        setVisible(true);
      }

      if (isHovering && hoverRect) {
        const cx = hoverRect.left + hoverRect.width / 2;
        const cy = hoverRect.top + hoverRect.height / 2;
        ringX.set(hoverRect.left + clamp((x - cx) * 0.25, -10, 10));
        ringY.set(hoverRect.top + clamp((y - cy) * 0.25, -10, 10));
        return;
      }

      ringX.set(x - ringW.get() / 2);
      ringY.set(y - ringH.get() / 2);

      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const dx = x - lastX;
      const dy = y - lastY;
      const speed = Math.hypot(dx, dy) / dt; // px/ms
      lastX = x;
      lastY = y;
      lastT = now;

      if (speed > 0.02) {
        angle.set((Math.atan2(dy, dx) * 180) / Math.PI);
        stretch.set(clamp(1 + speed * 0.5, 1, 2.4));
        squeeze.set(clamp(1 - speed * 0.12, 0.6, 1));
      }
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        stretch.set(1);
        squeeze.set(1);
      }, 120);
    };

    const handleMove = (e: MouseEvent) => {
      pendingEvent = e;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        if (pendingEvent) processMove(pendingEvent);
        pendingEvent = null;
      });
    };

    const handleEnter = () => {
      isVisible = true;
      setVisible(true);
    };
    const handleLeave = () => {
      isVisible = false;
      setVisible(false);
    };

    // Delegação de evento única no document (cobre elementos criados depois,
    // sem precisar re-anexar listener por elemento a cada mudança no DOM).
    // `relatedTarget` filtra transições *dentro* do mesmo alvo (ex.: texto ->
    // ícone dentro do mesmo botão) — sem isso, todo botão com ícone (a
    // maioria do site) disparava mouseout+mouseover repetidos ao passar o
    // mouse por cima, refazendo getBoundingClientRect/getComputedStyle à toa.
    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("a, button, [data-hover]") as HTMLElement | null;
      if (!el) return;
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;

      const r = el.getBoundingClientRect();
      hoverRect = new DOMRect(r.left - RING_PAD, r.top - RING_PAD, r.width + RING_PAD * 2, r.height + RING_PAD * 2);
      isHovering = true;
      setHovering(true);

      const radius = parseFloat(getComputedStyle(el).borderRadius) || 0;
      ringRadius.set(radius > r.height / 3 ? 999 : 16);
      ringX.set(hoverRect.left);
      ringY.set(hoverRect.top);
      ringW.set(hoverRect.width);
      ringH.set(hoverRect.height);
      stretch.set(1);
      squeeze.set(1);
    };

    const handleOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("a, button, [data-hover]");
      if (!el) return;
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return;

      isHovering = false;
      hoverRect = null;
      setHovering(false);
      ringW.set(RING_DEFAULT);
      ringH.set(RING_DEFAULT);
      ringRadius.set(999);
    };

    const handleDown = (e: MouseEvent) => {
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseenter", handleEnter, { passive: true });
    document.addEventListener("mouseleave", handleLeave, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mousedown", handleDown, { passive: true });

    return () => {
      window.clearTimeout(settleTimer);
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mousedown", handleDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice()) return null;

  return (
    <>
      {/* Ponto cometa */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: dotX, y: dotY, opacity: visible && !hovering ? 1 : 0 }}
      >
        <motion.div
          className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary mix-blend-difference"
          style={{ rotate: angle, scaleX: stretch, scaleY: squeeze }}
        />
      </motion.div>

      {/* Anel magnético */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden border md:block"
        style={{
          x: ringX,
          y: ringY,
          width: ringW,
          height: ringH,
          borderRadius: ringRadius,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "hsl(var(--primary) / 0.7)" : "hsl(var(--primary) / 0.45)",
          backgroundColor: hovering ? "hsl(var(--primary) / 0.07)" : "transparent",
          boxShadow: hovering ? "0 0 26px hsl(var(--glow-primary) / 0.35)" : "none",
        }}
        transition={{ borderColor: { duration: 0.2 }, backgroundColor: { duration: 0.2 } }}
      />

      {/* Pulso de clique */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary md:block"
            style={{ x: r.x, y: r.y }}
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
