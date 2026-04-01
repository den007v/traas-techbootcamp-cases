// ── Theme Toggle ──
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);

  function updateIcon() {
    if (!t) return;
    t.setAttribute('aria-label', 'Переключить тему');
    t.innerHTML = d === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  updateIcon();

  if (t) {
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      updateIcon();
    });
  }
})();

// ── Filter ──
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card:not(.case-card--add)');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all') {
          card.removeAttribute('hidden');
          return;
        }
        const tags = card.dataset.tags || '';
        if (tags.includes(filter)) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
    });
  });
})();

// ── Scroll-in animation ──
(function(){
  if (!('IntersectionObserver' in window)) return;
  const items = document.querySelectorAll('.case-card, .hero-stats .stat');

  items.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 400ms ease ${i * 60}ms, transform 400ms ease ${i * 60}ms`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(el => obs.observe(el));
})();
