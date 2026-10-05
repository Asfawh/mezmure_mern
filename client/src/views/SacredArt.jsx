import { useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import usePageMeta from '../hooks/usePageMeta';
import icons from '../data/sacred-art.json';
import '../css/sacred-art.css';

const base = '/assets/sacred-art/';
const left = [36,7,8,5,6,9,10,11,37,38,12,13];
const right = [14,15,16,39,40,21,1,22,23,24,25,26];
const bottom = icons.filter(icon => icon.id !== 17 && !left.includes(icon.id) && !right.includes(icon.id));
const labels = [
  ...left.map((id, i) => ({ id, x: 55 + (i % 3) * 136, y: [165, 325, 485, 645][Math.floor(i / 3)], w: 119, h: 37 })),
  ...right.map((id, i) => ({ id, x: 1006 + (i % 3) * 135, y: [165, 325, 485, 645][Math.floor(i / 3)], w: 119, h: 37 })),
  ...bottom.map((icon, i) => ({ id: icon.id, x: 55 + (i % 10) * 136, y: i < 10 ? 816 : 986, w: 119, h: 36 })),
  { id: 17, x: 471, y: 616, w: 504, h: 56 },
];
function GlowingCollection() {
  return <span className="glowing-collection">
    <img src={`${base}glowing-collection.png`} alt="Illustrated Ethiopian Orthodox sacred art in glowing gold and burgundy frames" width="1448" height="1086" />
    {labels.map(({id, x, y, w, h}) => {
      const icon = icons.find(item => item.id === id);
      return <span key={id} className={`glowing-caption${id === 17 ? " glowing-caption-hero" : ""}`} style={{left: `${x / 1448 * 100}%`, top: `${y / 1086 * 100}%`, width: `${w / 1448 * 100}%`, height: `${h / 1086 * 100}%`}}>
        <span lang="am">{icon.am}</span><span>{icon.en}</span>
      </span>;
    })}
  </span>;
}


export default function SacredArt() {
  usePageMeta('Sacred Art', 'Explore Ethiopian Orthodox sacred art with Amharic and English names, and a printable gold-and-burgundy collection.', '/sacred-art');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [showCollage, setShowCollage] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return icons.filter(icon => `${icon.am} ${icon.en}`.toLocaleLowerCase().includes(term));
  }, [query]);

  return (
    <div className="sacred-art-page">
      <header className="sacred-art-heading">
        <span className="eyebrow">Ethiopian Orthodox Tewahedo Church</span>
        <h1><span lang="am">የቅዱሳነ ምሥዕሎች</span><span>Sacred Art</span></h1>
        <p>A collection of church paintings, with each name in Amharic above English.</p>
      </header>

      <section className="sacred-art-showcase" aria-labelledby="framed-title">
        <button className="sacred-art-collage" type="button" onClick={() => setShowCollage(true)} aria-label="Enlarge the framed collection">
          <GlowingCollection />
          <span>View the framed collection <span aria-hidden="true">↗</span></span>
        </button>
        <div className="sacred-art-print">
          <span className="eyebrow">For your home or prayer space</span>
          <h2 id="framed-title">A tradition to cherish</h2>
          <p>A luminous illustrated collection with Amharic and English names. Open an individual painting below to see its name more closely.</p>
          <button className="sacred-art-download" type="button" onClick={() => { setFullScreen(true); setShowCollage(true); }}>View full screen ⛶</button>
          <a className="sacred-art-download" href={`${base}ethiopian-orthodox-sacred-art-24x18.pdf`} download>Download print PDF <span aria-hidden="true">↓</span></a>
          <small>Original-photo print edition · 24 × 18 inches · Landscape<br />Print at actual size (100%).</small>
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

      <Modal show={Boolean(selected) || showCollage} onHide={() => {setSelected(null); setShowCollage(false); setFullScreen(false); setZoomed(false);}} fullscreen={fullScreen} size="xl" centered className="sacred-art-modal">
        <Modal.Header closeButton><Modal.Title>{selected ? <><span lang="am">{selected.am}</span><span>{selected.en}</span></> : 'The framed collection'}</Modal.Title></Modal.Header>
        <Modal.Body className={zoomed ? "art-zoomed" : ""}>{selected ? <img src={selected.src} alt={selected.en} /> : <GlowingCollection />}</Modal.Body>
        {showCollage && <Modal.Footer><button type="button" className="btn btn-outline-dark" onClick={() => setFullScreen(!fullScreen)}>{fullScreen ? 'Exit full screen' : 'Full screen'}</button><button type="button" className="btn btn-outline-dark" onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Fit to screen' : 'Zoom in'}</button><a href={`${base}ethiopian-orthodox-sacred-art-24x18.pdf`} target="_blank" rel="noreferrer">Open original-photo print PDF</a></Modal.Footer>}
      </Modal>
    </div>
  );
}
