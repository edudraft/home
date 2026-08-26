/* =======================================================
   EduDraft - Script halaman Tentang Kami
   Fungsi: animasi angka statistik (count-up) saat
   section statistik masuk ke viewport
   ======================================================= */
(function () {
  'use strict';

  var suffixes = {};

  // Ambil angka target dari atribut data-target & tentukan suffix (+ atau %)
  function parseStat(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var label = el.querySelector('.stat__num');
    if (!label || isNaN(target)) return null;
    var text = label.textContent.trim();
    var suffix = text.replace(/[0-9]/g, '');
    return { el: el, target: target, suffix: suffix };
  }

  // Animasi count-up sederhana
  function animate(stat) {
    var label = stat.el.querySelector('.stat__num');
    var duration = 1500; // ms
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // easing easeOutQuart
      var eased = 1 - Math.pow(1 - progress, 4);
      var value = Math.round(eased * stat.target);
      label.textContent = value + stat.suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        label.textContent = stat.target + stat.suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  function init() {
    var stats = Array.prototype.slice.call(
      document.querySelectorAll('.stat[data-target]')
    ).map(parseStat).filter(Boolean);

    if (stats.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target.__stat);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    stats.forEach(function (stat) {
      stat.el.__stat = stat;
      observer.observe(stat.el);
    });
  }

  // Jalankan saat DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
