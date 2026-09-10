import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  base: number;
}

/**
 * Fundo interativo: campo de partículas que reage ao cursor (repele + liga linhas)
 * e um foco de luz suave que segue o mouse. Respeita `prefers-reduced-motion`
 * (renderiza um campo estático) e pausa quando a aba fica oculta.
 */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const [spotlight] = useState(
    () => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const RANGE = 170;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const readColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() || "255 92% 76%";
    let hsl = readColor();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor(width / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.7 + 0.6,
        base: Math.random() * 0.22 + 0.07,
      }));
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl} / ${p.base})`;
        ctx.fill();
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my, active } = mouse.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        let glow = 0;
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const d = Math.hypot(dx, dy) || 1;
          if (d < RANGE) {
            const f = 1 - d / RANGE;
            glow = f;
            p.x += (dx / d) * f * 0.6;
            p.y += (dy / d) * f * 0.6;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `hsla(${hsl} / ${0.14 * f})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + glow * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hsl} / ${p.base + glow * 0.5})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${hsl} / ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      if (running) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
      document.documentElement.style.setProperty("--pointer-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${e.clientY}px`);
    };
    const onLeave = () => {
      mouse.current.active = false;
    };
    const onResize = () => {
      resize();
      if (reduce) drawStatic();
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduce && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const onTheme = () => {
      hsl = readColor();
      if (reduce) drawStatic();
    };

    resize();
    window.addEventListener("resize", onResize);
    const themeObs = new MutationObserver(onTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (reduce) {
      drawStatic();
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(step);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObs.disconnect();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ opacity: 0.7 }}
      />
      {spotlight && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 hidden md:block"
          style={{
            background:
              "radial-gradient(560px circle at var(--pointer-x, 50%) var(--pointer-y, 50%), hsl(var(--primary) / 0.06), transparent 45%)",
          }}
        />
      )}
    </>
  );
};

export default ParticleBackground;
