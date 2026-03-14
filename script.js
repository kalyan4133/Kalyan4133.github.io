/* ─────────────────────────────────────────
   script.js  —  Portfolio Interactivity
───────────────────────────────────────── */

/* ── Cursor Glow ── */
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

/* ── Navbar Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveNav();
}, { passive: true });

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

/* ── Active Nav Highlighting ── */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 100;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nav-link[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ── Typewriter Effect ── */
const roles = [
  'Data Science Engineer 🚀',
  'Machine Learning Developer 🤖',
  'Python Developer 🐍',
  'Data Analyst 📊',
  'Full-Stack Developer 💻',
];

let roleIdx    = 0;
let charIdx    = 0;
let deleting   = false;
const typeEl   = document.getElementById('typewriter');

function typeWriter() {
  const current = roles[roleIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typeEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, deleting ? 45 : 90);
}

typeWriter();

/* ── Reveal on Scroll ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── Proficiency Bar Animation ── */
const profFills = document.querySelectorAll('.prof-fill');

const profObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      profObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

profFills.forEach(fill => profObserver.observe(fill));

/* ── Contact Form (mailto fallback) ── */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) return;

  const body = `Hi Kalyan,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
  const mailto = `mailto:kalyanchakravarthi4133@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  submitBtn.textContent = 'Opening mail client…';
  submitBtn.disabled = true;

  window.location.href = mailto;

  setTimeout(() => {
    formSuccess.style.display = 'block';
    form.reset();
    submitBtn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    submitBtn.disabled = false;
  }, 2000);
});

/* ── Smooth hover tilt on project cards ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Counter animation for stats ── */
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const startVal = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = startVal + (target - startVal) * eased;
    el.textContent = Number.isInteger(target) ? Math.round(current) : current.toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const raw = e.target.textContent.replace(/[^0-9.]/g, '');
      const target = parseFloat(raw);
      if (!isNaN(target)) animateCounter(e.target, target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => statObserver.observe(n));
