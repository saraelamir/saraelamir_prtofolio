// Fixed decorative layer: faint grid + two slow-drifting colour glows.
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="grid-lines" />
    </div>
  );
}
