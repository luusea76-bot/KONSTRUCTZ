import { useEffect, useState } from 'react';

const ECWID_SCRIPT_SRC = 'https://app.ecwid.com/script.js?80100025&data_platform=code&data_date=2026-02-23';
const STORE_ID = 'my-store-80100025';
const STORE_OPTIONS = [
  'categoriesPerRow=3',
  'views=grid(20,3) list(60) table(60)',
  'categoryView=grid',
  'searchView=list',
  `id=${STORE_ID}`
];

export default function StoreEmbed() {
  const [status, setStatus] = useState('Loading checkout...');

  useEffect(() => {
    let cancelled = false;

    const initStore = () => {
      if (cancelled) {
        return;
      }

      const container = document.getElementById(STORE_ID);
      if (!container || typeof window.xProductBrowser !== 'function') {
        setStatus('Checkout is loading. Please refresh if it does not appear.');
        return;
      }

      container.innerHTML = '';
      window.xProductBrowser(...STORE_OPTIONS);
      setStatus('');
    };

    const existingScript = document.querySelector(`script[src="${ECWID_SCRIPT_SRC}"]`);

    if (existingScript) {
      if (typeof window.xProductBrowser === 'function') {
        initStore();
      } else {
        existingScript.addEventListener('load', initStore, { once: true });
      }
    } else {
      const script = document.createElement('script');
      script.dataset.cfasync = 'false';
      script.type = 'text/javascript';
      script.src = ECWID_SCRIPT_SRC;
      script.charset = 'utf-8';
      script.async = true;
      script.addEventListener('load', initStore, { once: true });
      script.addEventListener('error', () => {
        if (!cancelled) {
          setStatus('Could not load checkout. Please check your connection and try again.');
        }
      });
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      existingScript?.removeEventListener('load', initStore);
      const container = document.getElementById(STORE_ID);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="store-embed-wrap">
      {status && <p className="store-loading-message">{status}</p>}
      <div id={STORE_ID}></div>
    </div>
  );
}
