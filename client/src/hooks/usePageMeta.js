import { useEffect } from 'react';

const defaultDescription = 'Explore Ethiopian Orthodox Tewahedo mezmur lyrics, spiritual themes, and traditions.';

function usePageMeta(title, description = defaultDescription, path = '/') {
  useEffect(() => {
    document.title = `${title} | EOTC Mezmure`;
    const url = `https://mezmure.org${path}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${title} | EOTC Mezmure`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  }, [title, description, path]);
}

export default usePageMeta;
