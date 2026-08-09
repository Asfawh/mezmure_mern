import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div>
          <span className="footer-brand">EOTC Mezmure</span>
          <p>Preserving sacred Mezmure, verses, and shared tradition.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/songs">Mezmure Library</Link>
          <Link to="/support">Support Mezmure</Link>
          <a href="mailto:contact@mezmure.org">Contact</a>
        </nav>
        <small>© {new Date().getFullYear()} Mezmure.org</small>
      </Container>
    </footer>
  );
}

export default Footer;
