import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-grid">
        <div>
          <span className="footer-brand">EOTC Mezmure</span>
          <p>Preserving Ethiopian Orthodox hymn lyrics, verses, and spiritual-song tradition.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/songs">Mezmure Library</Link>
          <Link to="/about">About Us</Link>
          <Link to="/sacred-art">Sacred Art</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/support">Support Mezmure</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <small>© {new Date().getFullYear()} Mezmure.org</small>
      </Container>
    </footer>
  );
}

export default Footer;
