import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

const commitments = [
  ['Preservation with context', 'We organize mezmur lyrics with Zemari information, spiritual themes, languages, occasions, and sources when available.'],
  ['Accessible tradition', 'The library is designed to make Amharic, Ge’ez, and translated material easier to find for worshippers, families, learners, and the diaspora.'],
  ['Responsible stewardship', 'We review community submissions, correct errors, identify sources, and respond respectfully to clergy, creators, and rights holders.'],
];

function About() {
  usePageMeta('About Us', 'Learn about the EOTC Mezmure library, its preservation mission, editorial approach, and community commitments.', '/about');

  return (
    <div className="trust-page">
      <header className="trust-hero">
        <span className="eyebrow">About EOTC Mezmure</span>
        <h1>Preserving sacred words across generations.</h1>
        <p>EOTC Mezmure is an independent community library created to make Ethiopian Orthodox Tewahedo mezmur lyrics, verses, Zemari profiles, languages, and traditions easier to discover and preserve.</p>
      </header>

      <section className="trust-section trust-story" aria-labelledby="our-story-title">
        <div>
          <span className="eyebrow">Our purpose</span>
          <h2 id="our-story-title">A respectful home for mezmur knowledge</h2>
        </div>
        <div>
          <p>Mezmur carries prayer, teaching, history, language, and shared memory. Yet lyrics and reliable context are often scattered across recordings, books, handwritten collections, congregations, and family knowledge.</p>
          <p>This library brings those paths together in a searchable, multilingual space. It is intended to support worshippers, youth, families, choir members, researchers, and diaspora communities while respecting the Church tradition and the people who create and preserve its music.</p>
        </div>
      </section>

      <section className="trust-section" aria-labelledby="commitments-title">
        <span className="eyebrow">How we work</span>
        <h2 id="commitments-title">Our commitments</h2>
        <div className="trust-card-grid">
          {commitments.map(([title, text], index) => (
            <article className="trust-card" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-callout">
        <div>
          <h2>Help strengthen the library.</h2>
          <p>Suggest a correction, share a reliable source, or ask about a rights concern.</p>
        </div>
        <Link className="trust-action" to="/contact">Contact Mezmure</Link>
      </section>
    </div>
  );
}

export default About;
