// src/components/TLSearchForm.tsx
import React, {useEffect} from 'react';

const TravelLineBookingForm = () => {

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
      ['embed', 'booking-form', {container: 'tl-booking-form'}],
    ];
    headScriptBody(w, q);
  };

  useEffect(() => {
    headScript(window);
  }, []);


  const styles = `
    #tl-booking-form {
      width: 100%;
      margin: 0 auto;
      z-index: 0;
    }
  `;

  return (
      <>
        <style>{styles}</style>
        {/* start TL Booking form script */}
        <div id="tl-booking-form">
        </div>
        {/* end TL Booking form script */}
      </>
  );
};

export default TravelLineBookingForm;