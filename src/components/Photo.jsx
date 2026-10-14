import { useLoaded } from '../hooks';
import { useLang } from '../LangContext';
import { ME } from '../data/content';

// Your photo if public/images/sara.(jpg|png|webp) exists, otherwise a clean monogram.
export default function Photo() {
  const { L } = useLang();
  const { ok } = useLoaded(ME.photo);
  return (
    <div className="photo-frame">
      {ok[0] ? (
        <img src={ok[0]} alt={L(ME.name)} />
      ) : (
        <div className="monogram" aria-hidden="true">{ME.initials}</div>
      )}
    </div>
  );
}
