// Animations: reveal on load and on scroll using IntersectionObserver
(function () {
  console.log('animation script loaded');
  function addStagger(section) {
    // avoid re-applying stagger classes
    if (section.dataset.staggered) return;
    const items = Array.from(section.querySelectorAll('[data-animate]'))
      .filter((el) => !el.classList.contains('temple-img'));
    items.forEach((el, i) => el.classList.add(`delay-${Math.min(i + 1, 3)}`));
    section.dataset.staggered = '1';
  }

  // Reveal intro on load with small delay and observe sections
  function initAnimations() {
    console.log('initAnimations — triggering intro reveal and observers');
    const intro = document.querySelector('.intro-section');
    if (intro) {
      addStagger(intro);
      // small delay so load feels intentional
      setTimeout(() => intro.classList.add('in-view'), 120);
    }

    // set up observer for all sections + footer
    const blocks = document.querySelectorAll('section, footer');
    const opts = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addStagger(entry.target);
          entry.target.classList.add('in-view');
        }
      });
    }, opts);

    blocks.forEach((sec) => {
      // observe blocks that have animatable items (skip intro — already revealed)
      if (sec.classList.contains('intro-section')) return;
      if (sec.querySelector('[data-animate]')) io.observe(sec);
      // if block is already in viewport on load, reveal it immediately
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        addStagger(sec);
        sec.classList.add('in-view');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();

// ========== Countdown Timer ==========
(function () {
  const weddingDate = new Date('2026-05-02T19:00:00+05:30').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '0';
      document.getElementById('cd-hours').textContent = '0';
      document.getElementById('cd-minutes').textContent = '0';
      document.getElementById('cd-seconds').textContent = '0';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
