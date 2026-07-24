/* =========================================================
MACS PORTFOLIO — script.js
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Navbar con blur al hacer scroll ---------- */
  const nav = document.getElementById('mainNav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 2. Ojos SVG que siguen el cursor ---------- */
  const pupils = document.querySelectorAll('.eye .pupil');
  const eyeGroups = document.querySelectorAll('.eye');
  const maxOffset = 2.6; // límite de movimiento de la pupila dentro del ojo

  const moveEyes = (clientX, clientY) => {
    eyeGroups.forEach((eye) => {
      const circle = eye.querySelector('circle:not(.pupil)');
      const pupil = eye.querySelector('.pupil');
      const rect = circle.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.min(Math.hypot(dx, dy) / 18, maxOffset);
      const angle = Math.atan2(dy, dx);

      const ox = Math.cos(angle) * dist;
      const oy = Math.sin(angle) * dist;
      pupil.setAttribute('transform', `translate(${ox.toFixed(2)}, ${oy.toFixed(2)})`);
    });
  };

  window.addEventListener('mousemove', (e) => moveEyes(e.clientX, e.clientY), { passive: true });
  // En touch, que los ojos sigan un pequeño movimiento ambiental
  let ambientAngle = 0;
  if (!pupils.length === false) {
    setInterval(() => {
      if (window.matchMedia('(hover: hover)').matches) return; // sólo en touch/no-hover
      ambientAngle += 0.05;
      const fakeX = window.innerWidth / 2 + Math.cos(ambientAngle) * 40;
      const fakeY = 80 + Math.sin(ambientAngle) * 10;
      moveEyes(fakeX, fakeY);
    }, 60);
  }

  /* ---------- 3. Typewriter del hero ---------- */
  const roles = [
    'Full Stack Developer',
    'Desarrolladora Web',
    'Python Developer',
    'UI/UX Enthusiast'
  ];
  const twEl = document.getElementById('typewriter');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      twEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  if (twEl) typeLoop();

  /* ---------- 4. Tarjetas de proyectos: drag-to-scroll ---------- */
  const track = document.getElementById('cardsTrack');
  if (track) {
    let isDown = false, startX = 0, scrollStart = 0, moved = false;

    const start = (x) => {
      isDown = true; moved = false;
      startX = x; scrollStart = track.scrollLeft;
      track.classList.add('dragging');
    };
    const move = (x) => {
      if (!isDown) return;
      const delta = x - startX;
      if (Math.abs(delta) > 4) moved = true;
      track.scrollLeft = scrollStart - delta;
    };
    const end = () => {
      isDown = false;
      track.classList.remove('dragging');
    };

    track.addEventListener('mousedown', (e) => start(e.pageX));
    window.addEventListener('mousemove', (e) => move(e.pageX));
    window.addEventListener('mouseup', end);

    track.addEventListener('touchstart', (e) => start(e.touches[0].pageX), { passive: true });
    track.addEventListener('touchmove', (e) => move(e.touches[0].pageX), { passive: true });
    track.addEventListener('touchend', end);

    // Evita que un click dentro de un enlace se dispare tras arrastrar
    track.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', (e) => { if (moved) e.preventDefault(); });
    });

    // Rueda del mouse -> desplazamiento horizontal
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        track.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  }

  /* ---------- 5. Barras de skills animadas al entrar en viewport ---------- */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const percent = card.dataset.percent || 0;
        const fill = card.querySelector('.skill-fill');
        requestAnimationFrame(() => { fill.style.width = percent + '%'; });
        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.4 });
  skillCards.forEach((card) => skillObserver.observe(card));

  /* ---------- 6. Reveal genérico on-scroll ---------- */
  const revealTargets = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => revealObserver.observe(el));

});