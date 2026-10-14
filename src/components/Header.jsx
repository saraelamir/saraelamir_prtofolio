import { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useLang } from '../LangContext';
import { useActiveSection } from '../hooks';
import { ME } from '../data/content';

const SECTIONS = ['about', 'experience', 'services', 'projects', 'contact'];

export default function Header() {
  const { t, L, lang, toggle } = useLang();
  const active = useActiveSection(SECTIONS);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef(null);

  // scroll progress bar + "scrolled" state for the blurred background
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
      setScrolled(h.scrollTop > 12);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="progress-bar-top" ref={bar} aria-hidden="true" />
      <Navbar expand="md" fixed="top" className={`top-bar ${scrolled ? 'scrolled' : ''}`} collapseOnSelect>
        <Container>
          <Navbar.Brand href="#top" className="logo">
            <span className="logo-mark">{ME.initials}</span>
            <span>{L(ME.short)}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto align-items-md-center gap-md-1">
              {SECTIONS.map((id) => (
                <Nav.Link key={id} href={`#${id}`} active={active === id}>
                  {t(`nav_${id}`)}
                </Nav.Link>
              ))}
              <button type="button" className="lang-btn" onClick={toggle} aria-label="Switch language">
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
