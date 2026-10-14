import { useEffect, useRef, useState } from 'react';

export const base = import.meta.env.BASE_URL;
export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Preloads a list of image paths and returns only the ones that really exist. */
export function useLoaded(paths) {
  const key = paths.join('|');
  const [state, setState] = useState({ ok: [], done: false });
  useEffect(() => {
    let alive = true;
    Promise.all(
      paths.map(
        (p) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(base + p);
            img.onerror = () => resolve(null);
            img.src = base + p;
          })
      )
    ).then((res) => alive && setState({ ok: res.filter(Boolean), done: true }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state;
}

/* True once the element has scrolled into view (fires once). */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function useCountUp(target, start, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reducedMotion()) {
      setN(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return n;
}

/* Types a word, holds, deletes it, then moves to the next one. */
export function useTypewriter(words) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (reducedMotion()) {
      setText(words[0]);
      return;
    }
    let w = 0;
    let c = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const word = words[w];
      if (!deleting) {
        c += 1;
        setText(word.slice(0, c));
        if (c === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        c -= 1;
        setText(word.slice(0, c));
        if (c === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 32);
      }
    };
    setText('');
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

/* Highlights the nav link of the section currently in view. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

/* Cursor spotlight: sets --mx/--my on the hovered card. */
export function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}
