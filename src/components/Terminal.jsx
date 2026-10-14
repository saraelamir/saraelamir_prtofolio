import { useEffect, useState } from 'react';
import { reducedMotion } from '../hooks';

// Shows the real address the site is served from. While developing locally it falls back
// to a placeholder, so "localhost" never appears in the page. Change the fallback to your domain.
const FALLBACK_HOST = 'sara-elamir.vercel.app';
const host = /^(localhost|127\.|0\.0\.0\.0)/.test(window.location.hostname) ? FALLBACK_HOST : window.location.host;
const LINES = [
  ['p', '$ git push origin main'],
  ['ok', '✓ Deployed to Vercel'],
  ['t', `➜ Live: https://${host}/`],
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Terminal() {
  const [done, setDone] = useState([]);
  const [typing, setTyping] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (reducedMotion()) {
      setDone(LINES);
      return;
    }
    (async () => {
      await sleep(900);
      const acc = [];
      for (const [kind, text] of LINES) {
        if (cancelled) return;
        if (kind === 'p') {
          for (let i = 1; i <= text.length; i++) {
            if (cancelled) return;
            setTyping([kind, text.slice(0, i)]);
            await sleep(34);
          }
          setTyping(null);
        }
        acc.push([kind, text]);
        setDone([...acc]);
        await sleep(kind === 'p' ? 420 : 280);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="term" aria-hidden="true">
      <div className="win-bar"><b /><b /><b /><span>deploy</span></div>
      <pre>
        {done.map(([k, t], i) => <div key={i} className={`ln-${k}`}>{t}</div>)}
        {typing && <div className={`ln-${typing[0]}`}>{typing[1]}</div>}
        <span className="caret" />
      </pre>
    </div>
  );
}