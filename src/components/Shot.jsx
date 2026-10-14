import { useEffect, useState } from 'react';
import { useLoaded, reducedMotion } from '../hooks';
import { useLang } from '../LangContext';

// Project preview on the card: a slider when there are several screenshots
// (auto-advances, pauses for reduced-motion users), a placeholder when there are none.
export default function Shot({ project }) {
  const { L } = useLang();
  const { ok } = useLoaded(project.images);
  const [i, setI] = useState(0);
  const title = L(project.title);

  useEffect(() => {
    if (ok.length < 2 || reducedMotion()) return undefined;
    const ms = 3000 + (project.id.length % 4) * 400; // cards don't all flip together
    const id = setInterval(() => setI((n) => (n + 1) % ok.length), ms);
    return () => clearInterval(id);
  }, [ok.length, project.id]);

  if (ok.length) {
    return (
      <div className="shot">
        {ok.map((src, n) => (
          <img
            key={src}
            src={src}
            alt={n === i ? title : ''}
            loading="lazy"
            className={`slide ${n === i ? 'on' : ''}`}
          />
        ))}
        {ok.length > 1 && (
          <div className="dots" aria-hidden="true">
            {ok.map((src, n) => <i key={src} className={n === i ? 'on' : ''} />)}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="shot" style={{ '--tint': project.tint }}>
      <div className="sk" aria-hidden="true">
        <i /><i /><i /><i />
        <em>{title.trim().charAt(0)}</em>
      </div>
    </div>
  );
}
