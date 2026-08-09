import { useEffect, useRef, useState } from 'react';

const SCRIPT_ID = 'cloudflare-turnstile-script';
const SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);

  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID);
    const script = existingScript || document.createElement('script');

    const handleLoad = () => resolve(window.turnstile);
    const handleError = () => reject(new Error('Security check could not load.'));

    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', handleError, { once: true });

    if (!existingScript) {
      script.id = SCRIPT_ID;
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

function Turnstile({ action, onTokenChange, siteKey }) {
  const containerRef = useRef(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let widgetId;

    onTokenChange('');
    setLoadError('');

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current || !turnstile) return;

        widgetId = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          action,
          callback: (token) => onTokenChange(token),
          'expired-callback': () => onTokenChange(''),
          'error-callback': () => {
            onTokenChange('');
            setLoadError('Security check failed. Please try again.');
          },
          theme: 'light',
        });
      })
      .catch(() => {
        if (!cancelled) {
          onTokenChange('');
          setLoadError('Security check could not load. Please refresh and try again.');
        }
      });

    return () => {
      cancelled = true;
      if (widgetId !== undefined && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [action, onTokenChange, siteKey]);

  return (
    <div className="mb-3">
      <div ref={containerRef} aria-label="Human verification" />
      {loadError && (
        <div className="text-danger small mt-2" role="alert">
          {loadError}
        </div>
      )}
    </div>
  );
}

export default Turnstile;
