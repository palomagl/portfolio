import { useEffect, useRef, useState } from "react";

/**
 * Revela um elemento quando ele entra na viewport (fade + deslocamento de ~15px).
 *
 * Robustez: o elemento fica visível por padrão. Este hook só "arma" a animação
 * quando há IntersectionObserver e o usuário não pediu `prefers-reduced-motion`.
 * Sem JS, com reduced-motion, ou com `?reveal=off` na URL, o conteúdo aparece.
 *
 * Uso: `const { ref, revealClass } = useReveal(); <div ref={ref} className={`... ${revealClass}`} />`
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit,
) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<{ armed: boolean; visible: boolean }>({
    armed: false,
    visible: true,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const revealOff = new URLSearchParams(window.location.search).get("reveal") === "off";

    if (prefersReduced || revealOff || typeof IntersectionObserver === "undefined") {
      return;
    }

    setState({ armed: true, visible: false });

    const reveal = () => {
      setState({ armed: true, visible: true });
      observer.disconnect();
      clearTimeout(safety);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px", ...options },
    );

    // Rede de segurança: se o observer não disparar por qualquer motivo,
    // o conteúdo aparece mesmo assim (sem animação).
    const safety = window.setTimeout(reveal, 3000);

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [options]);

  const revealClass = `reveal${state.armed ? " reveal-armed" : ""}${
    state.visible ? " is-visible" : ""
  }`;

  return { ref, revealClass, visible: state.visible };
}
