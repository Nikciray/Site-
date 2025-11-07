import { useEffect } from 'react';

export const TravelLineSearchForm = ({ id }: { id: string }) => {
  const searchFormUniqueId = `tl-search-form-${id}`;

  const headScriptBody = (w, q) => {
    var h = [
      'ru-ibe.tlintegration.ru',
      'ibe.tlintegration.ru',
      'ibe.tlintegration.com',
    ];

    var t = (w.travelline = w.travelline || {}),
      ti = (t.integration = t.integration || {});
    ti.__cq = ti.__cq ? ti.__cq.concat(q) : q;
    if (!ti.__loader) {
      ti.__loader = true;
      var d = w.document,
        c =
          d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0];

      function e(s, f) {
        return function () {
          w.TL || (() => {
            c.removeChild(s);
            f();
          })();
        }
      }

      (function l(h) {
        if (0 === h.length) return;
        var s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = !0;
        s.src = 'https://' + h[0] + '/integration/loader.js';
        s.onerror = s.onload = e(s, function () {
          l(h.slice(1, h.length));
        });
        c.appendChild(s);
      })(h);
    }
  };

  const headScript = (w) => {
    const q = [
      ['setContext', 'TL-INT-github_2025-09-16', 'ru'],
      ['embed', 'search-form', { container: searchFormUniqueId }],
    ];
    headScriptBody(w, q);
  };

  useEffect(() => {
    headScript(window);
  }, []);


  const styles = `
    #block-search,
    #block-search * {
      box-sizing: border-box;
    }
    #tl-block-search-wrapper {
    position: relative;
    width: 100%;
    }
    #block-search {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(40px);
      max-width: 1040px;
      margin: 0 auto;
      border-radius: 30px;
    }
    #tl-block-search-wrapper:has(#tl-search-form-main) {
      top: 65px;
    }
    #tl-block-search-wrapper:has(#tl-search-form-mobile) {
      padding: 30px 0 0;
    }
    #tl-block-search-wrapper:has(#tl-search-form-detail) {
      padding: 30px 0 0;
    }
    #tl-block-search-wrapper:has(#tl-search-form-inner) {
      padding: 0 0 30px;
    }
    #block-search:has(#tl-search-form-mobile),
    #block-search:has(#tl-search-form-inner),
    #block-search:has(#tl-search-form-detail) {
       background: #d2e0f5;
    }
    #block-search:has(#tl-search-form-inner) {
       max-width: 1376px;
    }
    #block-search:has(#tl-search-form-detail) {
       max-width: 1100px;
    }
    .tl-container {
      padding: 0 25px;
    }
    @media screen and (max-width: 1240px) {
      #tl-block-search-wrapper:has(#tl-search-form-detail) {
        padding: 30px 20px 0;
      }
    }
    @media screen and (min-width: 1221px) {
      #tl-block-search-wrapper:has(#tl-search-form-mobile) {
        display: none;
      }
    }
    @media screen and (max-width: 1220px) {
      #tl-block-search-wrapper:has(#tl-search-form-main) {
        display: none;
      }

    }
    
    [class*="viewing"],
    [class*="viewer"],
    [class*="people"],
    [class*="currently"],
    [class*="просматривают"],
    [class*="человек"],
    div[style*="position: fixed"][style*="bottom"],
    div[style*="position: fixed"][style*="left"] {
      display: none !important;
      visibility: hidden !important;
    }
    
    .tl-viewing-banner,
    .tl-social-proof,
    .tl-notification,
    [data-tl="viewing"],
    [data-tl="notification"] {
      display: none !important;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div id="tl-block-search-wrapper">
        <div id="block-search">
          <div id={searchFormUniqueId} className="tl-container">
            <a
              href="https://www.travelline.ru/products/tl-hotel/"
              rel="nofollow"
              target="_blank"
            >
              TravelLine
            </a>
          </div>
        </div>
      </div>
    </>
  );
};