import { SKILLS } from '../data/content';

const WORDS = [...new Set(SKILLS.flatMap((g) => g.items))];

// Endless skills ticker. The list is doubled so the loop is seamless.
export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>{w}<i /></span>
        ))}
      </div>
    </div>
  );
}
