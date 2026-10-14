import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import Shot from './Shot';
import ProjectModal from './ProjectModal';
import { useLang } from '../LangContext';
import { spot } from '../hooks';
import { PROJECTS } from '../data/content';

function Card({ p, onOpen }) {
  const { t, L } = useLang();
  const open = () => onOpen(p);
  return (
    <div
      className="glass pcard"
      role="button"
      tabIndex={0}
      onMouseMove={spot}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="win-bar">
        <b /><b /><b />
        <span>{p.demo ? `${p.demoKind === 'live' ? '↗' : '▶'} ${t(p.demoKind === 'live' ? 'demo_live' : 'demo_video')}` : `localhost:${p.port}`}</span>
      </div>
      <Shot project={p} />
      <div className="pbody">
        <h3>{L(p.title)}</h3>
        <p>{L(p.short)}</p>
        <div className="chips">
          {p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>
        <span className="more">{t('details')} <i>→</i></span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);

  const list = PROJECTS.filter((p) => filter === 'all' || p.cat === filter);
  const filters = [
    ['all', t('f_all')],
    ['fullstack', t('f_fullstack')],
    ['frontend', t('f_frontend')],
  ];

  return (
    <section id="projects">
      <Container>
        <SectionHead num="04" title={t('proj_title')} sub={t('proj_sub')}>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`filter ${filter === key ? 'on' : ''}`}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </SectionHead>
        <Row className="g-4">
          {list.map((p, i) => (
            <Col key={p.id} md={6} lg={4}>
              <Reveal delay={(i % 3) * 100} className="h-100">
                <Card p={p} onOpen={setActive} />
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>
      <ProjectModal project={active} onHide={() => setActive(null)} />
    </section>
  );
}
