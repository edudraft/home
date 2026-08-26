/* =======================================================
   EduDraft - Script sederhana untuk menu mobile
   ======================================================= */
(function () {
  'use strict';

  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  // Toggle menu saat hamburger diklik
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Tutup menu saat salah satu link diklik
    var links = nav.querySelectorAll('.nav__link, .btn--nav');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }
  
document.querySelectorAll('.dropdown > a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.parentElement.classList.toggle('open');
    }
  });
});

  // Tutup menu saat klik di luar area menu
  document.addEventListener('click', function (e) {
    if (
      nav &&
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
})();
