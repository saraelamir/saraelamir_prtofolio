import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import { useLang } from '../LangContext';
import { spot } from '../hooks';
import { ME } from '../data/content';

export default function Contact() {
  const { t, L } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Static site: the form opens the visitor's email app with everything filled in.
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${ME.email}?subject=${subject}&body=${body}`;
  };

  const links = [
    ['Email', ME.email, `mailto:${ME.email}`],
    ['WhatsApp', ME.phone, ME.whatsapp],
    ['GitHub', '@saraelamir', ME.github],
    ['LinkedIn', 'saraa-elamir', ME.linkedin],
  ];

  return (
    <section id="contact">
      <Container>
        <SectionHead num="05" title={t('contact_title')} sub={t('contact_text')} />
        <Row className="g-5">
          <Col lg={5}>
            <Reveal>
              <h4 className="mini-h">{t('direct')}</h4>
              <ul className="contact-list">
                {links.map(([label, value, href]) => (
                  <li key={label}>
                    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer">
                      <span>{label}</span>
                      <b dir="ltr">{value}</b>
                      <i>↗</i>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-secondary mt-3 mb-0">{L(ME.location)}</p>
            </Reveal>
          </Col>
          <Col lg={7}>
            <Reveal delay={120}>
              <form className="glass form" onSubmit={submit} onMouseMove={spot}>
                <Row className="g-3">
                  <Col md={6}>
                    <label htmlFor="f-name">{t('form_name')}</label>
                    <input id="f-name" required value={form.name} onChange={set('name')} autoComplete="name" />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="f-email">{t('form_email')}</label>
                    <input id="f-email" type="email" required value={form.email} onChange={set('email')} autoComplete="email" dir="ltr" />
                  </Col>
                  <Col xs={12}>
                    <label htmlFor="f-msg">{t('form_msg')}</label>
                    <textarea id="f-msg" rows={5} required value={form.message} onChange={set('message')} />
                  </Col>
                </Row>
                <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
                  <button type="submit" className="sbtn sbtn-primary">{t('form_send')}</button>
                  <small className="text-secondary">{t('form_note')}</small>
                </div>
              </form>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
