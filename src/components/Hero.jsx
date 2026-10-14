import { Container, Row, Col } from 'react-bootstrap';
import Terminal from './Terminal';
import Photo from './Photo';
import { useLang } from '../LangContext';
import { useTypewriter } from '../hooks';
import { ME } from '../data/content';

const rise = (d) => ({ className: 'rise', style: { '--d': `${d}ms` } });

export default function Hero() {
  const { t, L } = useLang();
  const word = useTypewriter(L(ME.rotate));

  return (
    <header className="hero" id="top">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={7}>
            <p {...rise(0)} className="rise hello">{t('hero_hello')}</p>
            <h1 {...rise(100)}>{L(ME.name)}</h1>
            <p {...rise(220)} className="rise role">
              {L(ME.role)} <span dir="ltr">({ME.stackLine})</span>
            </p>
            <p {...rise(320)} className="rise rotor">
              {t('hero_build')} <span className="rot">{word}</span><i className="caret" />
            </p>
            <p {...rise(420)} className="rise lead-text">{t('hero_sub')}</p>
            <div {...rise(520)} className="rise d-flex flex-wrap gap-3 mt-4">
              <a className="sbtn sbtn-primary" href="#projects">{t('cta_projects')}</a>
              <a className="sbtn" href="#contact">{t('cta_contact')}</a>
              <a className="sbtn sbtn-ghost" href={ME.cv} download>{t('cta_cv')} ↓</a>
            </div>
            <p {...rise(620)} className="rise local-note">
              <span className="dot-live" /> {t('hero_local')}
            </p>
          </Col>
          <Col lg={5}>
            <div {...rise(300)} className="rise photo-wrap">
              <Photo />
              <div className="term-float"><Terminal /></div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
