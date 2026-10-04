import { useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import usePageMeta from '../hooks/usePageMeta';
import icons from '../data/sacred-art.json';
import '../css/sacred-art.css';

const base = '/assets/sacred-art/';

export default function SacredArt() {
  usePageMeta('Sacred Art', 'Explore Ethiopian Orthodox sacred art with Amharic and English names, and a printable gold-and-burgundy collection.', '/sacred-art');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showCollage, setShowCollage] = useState(false);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return icons.filter(icon => `${icon.am} ${icon.en}`.toLocaleLowerCase().includes(term));
  }, [query]);

  return (
    <div className="sacred-art-page">
      <header className="sacred-art-heading">
        <span className="eyebrow">Ethiopian Orthodox Tewahedo Church</span>
        <h1><span lang="am">የቤተ ክርስቲያን ሥዕሎች</span><span>Sacred Art</span></h1>
        <p>A collection of church paintings, with each name in Amharic above English.</p>
      </header>

      <section className="sacred-art-showcase" aria-labelledby="framed-title">
        <button className="sacred-art-collage" type="button" onClick={() => setShowCollage(true)} aria-label="Enlarge the framed collection">
          <img src={`${base}collage.webp`} alt="Forty-five church paintings arranged around the Holy Trinity in a gold-and-burgundy frame" width="2304" height="1728" fetchPriority="high" />
          <span>View the framed collection <span aria-hidden="true">↗</span></span>
        </button>
        <div className="sacred-art-print">
          <span className="eyebrow">For your home or prayer space</span>
          <h2 id="framed-title">A tradition to cherish</h2>
          <p>Original photographs, a burgundy setting, and gold frames. Open an individual painting below to see its name more closely.</p>
          <a className="sacred-art-download" href={`${base}ethiopian-orthodox-sacred-art-24x18.pdf`} download>Download print PDF <span aria-hidden="true">↓</span></a>
          <small>24 × 18 inches · Landscape<br />Print at actual size (100%).</small>
        </div>
      </section>

      <section className="sacred-art-browse" aria-labelledby="paintings-title">
        <div className="sacred-art-toolbar">
          <div><span className="eyebrow">Look closer</span><h2 id="paintings-title">The paintings</h2></div>
          <div className="sacred-art-search">
            <label htmlFor="icon-search">Find a name in Amharic or English</label>
            <input id="icon-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the collection…" />
          </div>
        </div>
        <p className="sacred-art-count" role="status">{filtered.length} of {icons.length} paintings</p>
        <div className="sacred-art-grid">
          {filtered.map(icon => (
            <button className="sacred-art-card" key={icon.id} type="button" onClick={() => setSelected(icon)} aria-label={`Enlarge ${icon.en}`}>
              <span className="sacred-art-photo"><img src={icon.src} alt={icon.en} loading="lazy" width="600" height="800" /></span>
              <span className="sacred-art-label"><span lang="am">{icon.am}</span><span>{icon.en}</span></span>
            </button>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty-state"><p>No paintings match this name.</p><button type="button" onClick={() => setQuery('')}>Show all paintings</button></div>}
      </section>

      <Modal show={Boolean(selected) || showCollage} onHide={() => {setSelected(null); setShowCollage(false);}} size="xl" centered className="sacred-art-modal">
        <Modal.Header closeButton><Modal.Title>{selected ? <><span lang="am">{selected.am}</span><span>{selected.en}</span></> : 'The framed collection'}</Modal.Title></Modal.Header>
        <Modal.Body><img src={selected?.src || `${base}collage.webp`} alt={selected?.en || 'Framed Ethiopian Orthodox sacred art collection'} /></Modal.Body>
        {showCollage && <Modal.Footer><a href={`${base}ethiopian-orthodox-sacred-art-24x18.pdf`} target="_blank" rel="noreferrer">Open full-resolution PDF</a></Modal.Footer>}
      </Modal>
    </div>
  );
}
