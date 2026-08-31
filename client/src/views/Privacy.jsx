import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

function Privacy() {
  usePageMeta('Privacy Policy', 'Read how Mezmure.org handles account information, cookies, service providers, security, and privacy choices.', '/privacy');
  return (
    <article className="policy-page">
      <header><span className="eyebrow">Transparency</span><h1>Privacy Policy</h1><p>Last updated: August 31, 2026</p></header>
      <section><h2>Information we handle</h2><p>Mezmure.org may process information you provide when creating an account, saving favorites, submitting or editing content, donating, or contacting us. This may include a username, email address, account activity, and the content of your message or contribution.</p></section>
      <section><h2>Cookies and local storage</h2><p>We may use cookies or browser storage to maintain sessions, protect accounts, remember preferences, and measure site performance. You can control cookies through your browser and, where required, through any consent choices presented on the site.</p></section>
      <section><h2>Payments</h2><p>Donations are completed through an external payment provider. Mezmure.org does not collect or store payment-card details. The provider processes information under its own privacy terms.</p></section>
      <section><h2>Service providers and security</h2><p>We use service providers for hosting, database storage, security, and site delivery. We share information only as needed to operate the service, comply with law, protect users, or address misuse. No internet service can promise absolute security, but we use reasonable safeguards.</p></section>
      <section><h2>Your choices</h2><p>You may ask about, correct, or request deletion of personal information associated with your account, subject to legal and operational requirements. Email <a href="mailto:chosky05@gmail.com?subject=Mezmure.org%20privacy%20request">chosky05@gmail.com</a>.</p></section>
      <section><h2>Updates</h2><p>We may update this policy as the service or legal requirements change. Questions can be submitted through our <Link to="/contact">Contact Us page</Link>.</p></section>
    </article>
  );
}

export default Privacy;
