// Cookie consent.
//
// Gated on an analytics tag actually being present. The site currently ships no
// Google tag (removed 2026-08-16, pending a new Damson Kitchen property — the old
// one belonged to Zayvori), so this whole block is inert: no banner is shown and
// no cookie is set, because there is nothing to consent to.
//
// Add a gtag snippet back to the pages and the banner returns on its own; nothing
// here needs changing. The guard is also what stops this file throwing a
// ReferenceError with no tag present — an uncaught throw here would halt the rest
// of the script and take the mobile nav and scroll animations with it.
(function () {
  if (typeof gtag !== 'function') return;

  var CONSENT_KEY = 'damsonkitchen_cookie_consent';
  var stored = localStorage.getItem(CONSENT_KEY);

  if (stored === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    return;
  }
  if (stored === 'denied') return;

  // No stored preference — show banner
  var banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<p class="cookie-banner__text">We use analytics cookies to understand how visitors use this site. ' +
    '<a href="/privacy.html#cookies">Privacy Policy</a></p>' +
    '<div class="cookie-banner__actions">' +
    '<button class="cookie-banner__btn cookie-banner__btn--ghost" id="cookie-decline">Decline</button>' +
    '<button class="cookie-banner__btn cookie-banner__btn--primary" id="cookie-accept">Accept</button>' +
    '</div>';
  document.body.appendChild(banner);
  requestAnimationFrame(function () { banner.classList.add('visible'); });

  function dismiss(consent) {
    localStorage.setItem(CONSENT_KEY, consent);
    if (consent === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });
    banner.classList.remove('visible');
    setTimeout(function () { banner.remove(); }, 300);
  }

  document.getElementById('cookie-accept').addEventListener('click', function () { dismiss('granted'); });
  document.getElementById('cookie-decline').addEventListener('click', function () { dismiss('denied'); });
})();

// Mobile nav toggle
const hamburger = document.querySelector('.nav__hamburger');
const navLinks = document.querySelector('.nav__links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll fade-in
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);

document.querySelectorAll('.feature-card, .step, .testimonial-card, .section-header').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Stagger feature cards
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

document.querySelectorAll('.testimonial-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
