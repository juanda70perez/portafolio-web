
(() => {
  'use strict';

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      })
    );
  }

  /* ---------- Reveal on scroll (with stagger) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  // assign stagger order to siblings within common parents
  ['.skills-grid', '.cert-grid', '.proj-grid', '.timeline'].forEach((sel) => {
    document.querySelectorAll(sel).forEach((parent) => {
      [...parent.children].forEach((child, i) => {
        if (child.classList.contains('reveal')) child.style.setProperty('--stagger', i);
      });
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );
  reveals.forEach((el) => io.observe(el));


  const phrases = [
    'Desarrollador Backend .NET',
    'Builder de APIs RESTful',
    'Integrador de sistemas legacy ↔ modernos',
    'Aprendiz constante de nuevas tecnologías',
    'Resolutor de problemas complejos',
  ];
  const typed = document.getElementById('typed');
  let pIdx = 0, cIdx = 0, deleting = false;
  const typeSpeed = 65, deleteSpeed = 35, pauseEnd = 1600, pauseStart = 300;

  const tick = () => {
    const cur = phrases[pIdx];
    if (!deleting) {
      typed.textContent = cur.slice(0, ++cIdx);
      if (cIdx === cur.length) { deleting = true; return setTimeout(tick, pauseEnd); }
    } else {
      typed.textContent = cur.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; return setTimeout(tick, pauseStart); }
    }
    setTimeout(tick, deleting ? deleteSpeed : typeSpeed);
  };
  if (typed) setTimeout(tick, 800);

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => countIO.observe(c));

  /* ---------- 3D tilt on .tilt cards ---------- */
  const tiltEls = document.querySelectorAll('.tilt');
  const MAX_TILT = 6; // degrees

  tiltEls.forEach((el) => {
    let raf = null;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * MAX_TILT * 2;
      const ry = (x - 0.5) * MAX_TILT * 2;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      });
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
  });

  /* ---------- Cursor glow ---------- */
  const glow = document.querySelector('.cursor-glow');
  if (glow && matchMedia('(hover: hover)').matches) {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.style.opacity = 1;
    });
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Section active link highlight ---------- */
  const sections = document.querySelectorAll('section[id]');
  const linkMap = new Map();
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    linkMap.set(id, a);
  });
  const activeIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        linkMap.forEach((a) => a.style.color = '');
        const a = linkMap.get(e.target.id);
        if (a) a.style.color = 'var(--accent)';
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach((s) => activeIO.observe(s));

  /* ---------- Year stamp in footer (defensive, in case added later) ---------- */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
