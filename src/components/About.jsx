import { Container, Row, Col } from 'react-bootstrap';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { useLang } from '../LangContext';
import { spot } from '../hooks';
import { ME, SKILLS, PERSONAL, LANGS } from '../data/content';

export default function About() {
  const { t, L } = useLang();
  return (
    <section id="about">
      <Container>
        <SectionHead num="01" title={t('about_title')} />
        <Row className="g-5">
          <Col lg={5}>
            <Reveal>
              <p className="about-text">{t('about_text')}</p>
              <dl className="info">
                <div><dt>{t('info_location')}</dt><dd>{L(ME.location)}</dd></div>
                <div><dt>{t('info_email')}</dt><dd dir="ltr">{ME.email}</dd></div>
              </dl>
            </Reveal>
          </Col>
          <Col lg={7}>
            <Reveal delay={120}>
              <div className="glass panel" onMouseMove={spot}>
                <h3 className="sub-h">{t('skills_title')}</h3>
                {SKILLS.map((g) => (
                  <div className="skill-row" key={g.title.en}>
                    <h4>{L(g.title)}</h4>
                    <div className="chips">
                      {g.items.map((s) => <span className="chip" key={s}>{s}</span>)}
                    </div>
                  </div>
                ))}
                <div className="skill-row">
                  <h4>{t('personal')}</h4>
                  <div className="chips">
                    {L(PERSONAL).map((s) => <span className="chip chip-plain" key={s}>{s}</span>)}
                  </div>
                </div>
                <div className="skill-row">
                  <h4>{t('languages')}</h4>
                  <div className="chips">
                    {LANGS.map((l) => (
                      <span className="chip chip-plain" key={l.name.en}>{L(l.name)} · {L(l.level)}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
