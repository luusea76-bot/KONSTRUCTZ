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
    const timers = [];

    const queueTimer = (callback, delay) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    const getEcwidProductId = (item) => {
      const storeUrl = item?.checkoutUrl || item?.externalUrl || item?.hash || '';
      const match = storeUrl.match(/(?:-p|\/p\/)(\d+)/);
      return match ? parseInt(match[1], 10) : null;
    };

    const getCheckoutItems = () => {
      const itemsById = new Map();

      (cartItems || []).forEach(item => {
        const ecwidId = getEcwidProductId(item);

        if (!ecwidId) {
          return;
        }

        const quantity = Math.max(1, Number(item.quantity) || 1);
        const existing = itemsById.get(ecwidId);
        itemsById.set(ecwidId, {
          id: ecwidId,
          quantity: (existing?.quantity || 0) + quantity
        });
      });

      return Array.from(itemsById.values());
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
        setStatus('Preparing cart checkout...');

        const loadCartCheckout = () => {
          if (cancelled || !window.Ecwid?.Cart) {
            return;
          }

          const itemsToAdd = getCheckoutItems();
          const openCart = () => {
            if (!cancelled && window.Ecwid?.openPage) {
              setStatus('');
              window.Ecwid.openPage('cart');
            }
          };

          const addNext = (index) => {
            if (cancelled) {
              return;
            }

            if (index >= itemsToAdd.length) {
              queueTimer(openCart, 400);
              return;
            }

            let continued = false;
            const continueOnce = () => {
              if (continued || cancelled) {
                return;
              }

              continued = true;
              queueTimer(() => addNext(index + 1), 250);
            };

            try {
              window.Ecwid.Cart.addProduct(itemsToAdd[index], continueOnce, continueOnce);
              queueTimer(continueOnce, 1600);
            } catch (error) {
              console.error('Could not add product to Ecwid cart', error);
              continueOnce();
            }
          };

          let clearCompleted = false;
          const afterClear = () => {
            if (clearCompleted || cancelled) {
              return;
            }

            clearCompleted = true;

            if (itemsToAdd.length === 0) {
              openCart();
              return;
            }

            addNext(0);
          };

          try {
            window.Ecwid.Cart.clear(afterClear);
            queueTimer(afterClear, 1600);
          } catch (error) {
            console.error('Could not clear Ecwid cart', error);
            afterClear();
          }
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
      timers.forEach(timer => window.clearTimeout(timer));
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
