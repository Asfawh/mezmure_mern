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
      <header className="trust-hero trust-hero-image">
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
          <p>EOTC Mezmur is the hymn and spiritual-song tradition of the Ethiopian Orthodox Tewahedo Church. Its lyrics express prayer, praise, repentance, thanksgiving, and Christian teaching, drawing from Holy Scripture, the lives of saints, the feasts of the Church, fasting seasons, and the worship life of the faithful.</p>
          <p>This library brings Ethiopian Orthodox hymn lyrics together in a searchable, multilingual collection. It helps worshippers, youth, families, Sunday-school students, choir members, researchers, and diaspora communities read, learn, and preserve Mezmur while honoring the faith, liturgical tradition, Zemari, and communities that pass these spiritual songs from generation to generation.</p>
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
