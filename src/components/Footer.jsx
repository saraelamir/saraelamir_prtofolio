import { Container } from 'react-bootstrap';
import { useLang } from '../LangContext';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <Container className="d-flex flex-wrap justify-content-between gap-2">
        <span>© {new Date().getFullYear()} · {t('footer')}</span>
        <a href="#top">{t('top')} ↑</a>
      </Container>
    </footer>
  );
}
