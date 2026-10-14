import { useEffect, useState } from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import { useLang } from '../LangContext';
import { useLoaded, base } from '../hooks';

function CodeLine({ cmd }) {
  const { t } = useLang();
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    } catch {
      /* clipboard not available */
    }
  };
  return (
    <div className="code">
      <code><span className="ln-p">$</span> {cmd}</code>
      <button type="button" className="copy" onClick={copy}>
        {ok ? t('copied') : t('copy')}
      </button>
    </div>
  );
}

// Video (if any) + every screenshot that exists, as a slider.
function Media({ p }) {
  const { t, L } = useLang();
  const { ok } = useLoaded(p.images);
  const slides = [];
  if (p.video) slides.push({ type: 'video', src: base + p.video });
  ok.forEach((src) => slides.push({ type: 'img', src }));

  return (
    <div className="win-wrap">
      <div className="win-bar"><b /><b /><b />{p.demo ? (
          <a className="win-link" href={p.demo} target="_blank" rel="noopener noreferrer">
            {p.demoKind === 'live' ? '↗' : '▶'} {t(p.demoKind === 'live' ? 'demo_live' : 'demo_video')}
          </a>
        ) : (
          <span>localhost:{p.port}</span>
        )}
      </div>
      {slides.length === 0 ? (
        <div className="shot" style={{ '--tint': p.tint }}>
          <div className="sk" aria-hidden="true"><i /><i /><i /><i /><em>{L(p.title).trim().charAt(0)}</em></div>
        </div>
      ) : (
        <Carousel interval={null} indicators={slides.length > 1} controls={slides.length > 1} fade>
          {slides.map((s) => (
            <Carousel.Item key={s.src}>
              <div className="shot">
                {s.type === 'video' ? (
                  <video src={s.src} controls muted playsInline />
                ) : (
                  <img src={s.src} alt={L(p.title)} />
                )}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default function ProjectModal({ project, onHide }) {
  const { t, L } = useLang();
  const [tab, setTab] = useState('over');

  useEffect(() => {
    if (project) setTab('over');
  }, [project]);

  if (!project) return null;
  const p = project;

  return (
    <Modal show onHide={onHide} size="lg" centered scrollable className="pmodal">
      <Modal.Header>
        <Modal.Title as="h3">{L(p.title)}</Modal.Title>
        <button type="button" className="x-btn" onClick={onHide} aria-label={t('close')}>×</button>
      </Modal.Header>
      <Modal.Body>
        <Media p={p} />

        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'over'} className="tab" onClick={() => setTab('over')}>
            {t('tab_over')}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'run'} className="tab" onClick={() => setTab('run')}>
            {t('tab_run')}
          </button>
        </div>

        <div className="tab-pane-anim" key={tab}>
          {tab === 'over' ? (
            <>
              <h4>{t('h_features')}</h4>
              <ul>{L(p.features).map((f) => <li key={f}>{f}</li>)}</ul>
              <h4>{t('h_stack')}</h4>
              <div className="chips">
                {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </>
          ) : (
            <>
              <p className="note">{t('run_req')}</p>
              {p.db && <p className="note note-warn">{t('run_db')}</p>}
              {p.static && <p className="text-secondary">{t('run_html')}</p>}
              {p.run.map((c) => <CodeLine key={c} cmd={c} />)}
              {!p.static && (
                <p className="text-secondary mb-0">
                  {t('run_open')} <b dir="ltr" className="text-light">http://localhost:{p.port}</b>
                </p>
              )}
            </>
          )}
        </div>

        <div className="d-flex flex-wrap gap-3 mt-4">
          {p.demo && (
            <a className="sbtn sbtn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">
              {p.demoKind === 'live' ? '↗' : '▶'} {t(p.demoKind === 'live' ? 'demo_live' : 'demo_video')}
            </a>
          )}
          <a className={`sbtn ${p.demo ? 'sbtn-ghost' : 'sbtn-primary'}`} href={p.repo.replace(/\.git$/, '')} target="_blank" rel="noopener noreferrer">
            {t('repo')} ↗
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
}
