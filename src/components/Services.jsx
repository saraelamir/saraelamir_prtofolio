import { Container, Row, Col } from 'react-bootstrap';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { useLang } from '../LangContext';
import { spot } from '../hooks';
import { SERVICES } from '../data/content';

export default function Services() {
  const { t, L } = useLang();
  return (
    <section id="services">
      <Container>
        <SectionHead num="03" title={t('services_title')} sub={t('services_sub')} />
        <Row className="g-4">
          {SERVICES.map((s, i) => (
            <Col md={6} lg={4} key={s.title.en}>
              <Reveal delay={(i % 3) * 100} className="h-100">
                <div className="glass service" onMouseMove={spot}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{L(s.title)}</h3>
                  <p>{L(s.text)}</p>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
