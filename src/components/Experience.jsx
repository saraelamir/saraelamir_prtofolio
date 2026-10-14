import { Container, Row, Col } from 'react-bootstrap';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { useLang } from '../LangContext';
import { spot } from '../hooks';
import { EXPERIENCE, EDUCATION, COURSES } from '../data/content';

function Timeline({ items }) {
  const { L } = useLang();
  return (
    <ol className="tl">
      {items.map((e) => (
        <li key={e.period}>
          <span className="tl-date" dir="ltr">{e.period}</span>
          <h3>{L(e.title)}</h3>
          <p className="tl-org">{L(e.org)}</p>
          <p className="tl-text">{L(e.text)}</p>
        </li>
      ))}
    </ol>
  );
}

// Everything is always visible here: internships (ITI, DEPI), education and courses.
export default function Experience() {
  const { t } = useLang();
  return (
    <section id="experience">
      <Container>
        <SectionHead num="02" title={t('exp_title')} />
        <Row className="g-4">
          <Col lg={6}>
            <Reveal className="h-100">
              <div className="glass panel h-100" onMouseMove={spot}>
                <h3 className="sub-h">{t('tab_exp')}</h3>
                <Timeline items={EXPERIENCE} />
              </div>
            </Reveal>
          </Col>
          <Col lg={6}>
            <Reveal delay={120} className="h-100">
              <div className="glass panel h-100" onMouseMove={spot}>
                <h3 className="sub-h">{t('tab_edu')}</h3>
                <Timeline items={EDUCATION} />
                <h3 className="sub-h sub-h-mt">{t('courses')}</h3>
                <ul className="courses">
                  {COURSES.map((c) => (
                    <li key={c.title}>
                      <b dir="ltr">{c.title}</b>
                      <span dir="ltr">{c.org} · {c.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
