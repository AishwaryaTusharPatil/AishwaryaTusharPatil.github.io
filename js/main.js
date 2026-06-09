/* ── MOBILE NAV ── */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a:not([aria-label])');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* Scroll-spy — active nav link */
  const sections = document.querySelectorAll('section[id]');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(s => spy.observe(s));
})();


/* ── TYPING ANIMATION ── */
(function () {
  const roles = [
    'Senior Software Engineer',
    'Android Developer',
    'React Native Engineer',
    'Mobile Architect',
    'AWS Certified Developer',
  ];

  const el = document.getElementById('typed-text');
  if (!el) return;

  let ri = 0, ci = 0, deleting = false, pause = 0;
  const TYPE_MS = 60, DEL_MS = 32, PAUSE_TYPED = 26, PAUSE_EMPTY = 8;

  function tick() {
    if (pause > 0) { pause--; return setTimeout(tick, TYPE_MS); }

    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; pause = PAUSE_TYPED; }
      setTimeout(tick, TYPE_MS);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; pause = PAUSE_EMPTY; }
      setTimeout(tick, DEL_MS);
    }
  }

  setTimeout(tick, 900);
})();


/* ── PROJECT FILTER ── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const f = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f);
      });
    });
  });
})();


/* ── SCROLL REVEAL ── */
(function () {
  const sel = '.glass-card, .section-title, .hero-badge, .hero-name, .hero-role, .hero-tagline, .hero-ctas, .hero-stats';
  document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = Array.from(
        (entry.target.parentElement || document.body).querySelectorAll('.reveal')
      );
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = Math.min(idx * 55, 280) + 'ms';
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();
