import Reveal from './Reveal';

export default function SectionHead({ num, title, sub, children }) {
  return (
    <Reveal className="sec-head">
      <div>
        <span className="kicker">{num}</span>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {children}
    </Reveal>
  );
}
