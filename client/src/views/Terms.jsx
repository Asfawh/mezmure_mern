import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

function Terms() {
  usePageMeta('Terms of Use', 'Read the Mezmur terms covering community contributions, copyright, respectful use, and corrections.', '/terms');
  return (
    <article className="policy-page">
      <header><span className="eyebrow">Community standards</span><h1>Terms of Use</h1><p>Last updated: August 31, 2026</p></header>
      <section><h2>Purpose of the service</h2><p>Mezmur provides educational, devotional, and cultural information about Ethiopian Orthodox Tewahedo mezmur, Zemari, languages, verses, and traditions. Information may be corrected, expanded, or removed as reliable sources become available.</p></section>
      <section><h2>Copyright and attribution</h2><p>Lyrics, photographs, recordings, books, names, and other creative works may be protected by rights belonging to their respective owners. Mezmur does not claim ownership of third-party works merely because they appear in the library. Contributors must have the right to share submitted material or provide enough information for us to evaluate its use.</p></section>
      <section><h2>Rights-holder requests</h2><p>Clergy, artists, songwriters, publishers, photographers, and other rights holders may request a correction, attribution update, review, or removal. Email <a href="mailto:chosky05@gmail.com?subject=Mezmur%20rights%20request">chosky05@gmail.com</a> with the page address, description of the work, your relationship to it, and the requested action.</p></section>
      <section><h2>Community contributions</h2><p>By submitting content, you confirm that it is accurate to the best of your knowledge, respectful of Church tradition, does not violate another person’s rights, and may be displayed and edited for clarity and formatting. Do not submit hateful, violent, sexually explicit, deceptive, unlawful, or malicious content.</p></section>
      <section><h2>Acceptable use</h2><p>Do not disrupt the service, bypass security, scrape the site in a harmful or excessive manner, impersonate another person, manipulate advertising, or submit abusive material. We may restrict access or remove content to protect the library and its users.</p></section>
      <section><h2>No guarantee</h2><p>The service is provided on an “as available” basis. We work to improve accuracy and availability but cannot guarantee that every lyric, translation, biography, source, or feature is complete or error-free.</p></section>
      <section><h2>Questions</h2><p>For questions about these terms, use our <Link to="/contact">Contact Us page</Link>.</p></section>
    </article>
  );
}

export default Terms;
