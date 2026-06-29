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

export default function StoreEmbed({ cartItems }) {
  const [status, setStatus] = useState('Loading checkout...');

  useEffect(() => {
    let cancelled = false;

    const getEcwidProductId = (item) => {
      const storeUrl = item?.checkoutUrl || item?.externalUrl || item?.hash || '';
      const match = storeUrl.match(/(?:-p|\/p\/)(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    };

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

      if (cartItems && cartItems.length > 0 && window.Ecwid) {
        const loadCartCheckout = () => {
          if (cancelled || !window.Ecwid?.Cart) {
            return;
          }

          // Clear cart first, then add items sequentially to avoid race conditions
          window.Ecwid.Cart.clear(() => {
            const itemsToAdd = cartItems
              .map(item => {
                const ecwidId = getEcwidProductId(item);
                return ecwidId ? { id: ecwidId, quantity: item.quantity } : null;
              })
              .filter(Boolean);

            if (itemsToAdd.length === 0) {
              window.Ecwid.openPage('cart');
              return;
            }

            const addNext = (index) => {
              if (index >= itemsToAdd.length) {
                window.Ecwid.openPage('cart');
                return;
              }
              window.Ecwid.Cart.addProduct(itemsToAdd[index], () => {
                addNext(index + 1);
              });
            };

            addNext(0);
          });
        };

        if (window.Ecwid.Cart) {
          loadCartCheckout();
        } else {
          window.Ecwid.OnAPILoaded.add(loadCartCheckout);
        }
      }
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
  }, [cartItems]);

  return (
    <div className="store-embed-wrap">
      {status && <p className="store-loading-message">{status}</p>}
      <div id={STORE_ID}></div>
    </div>
  );
}
