/* ============================================
   MAIN JS — Theme, Navigation, Reveal, Contact
   ============================================ */

// Theme toggle with localStorage
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.getElementById('themeBtn').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile hamburger menu
const menuBtn = document.getElementById('menuBtn');
const navLinksEl = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
});
// Link tap pe menu band karo
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinksEl.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));
// Bahar tap pe menu band karo
document.addEventListener('click', e => {
  if (navLinksEl.classList.contains('open') && !e.target.closest('nav')) {
    navLinksEl.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Scroll reveal
const obs = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('on'); obs.unobserve(x.target) } }) }, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Active nav link on scroll
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 160) cur = s.id });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

// Contact form → opens email client
function sendMsg() {
  const n = document.getElementById('fn').value.trim();
  const e = document.getElementById('fe').value.trim();
  const m = document.getElementById('fm').value.trim();
  if (!n || !e || !m) { alert('Please fill name, email and message.'); return; }
  const sub = encodeURIComponent(document.getElementById('fs').value || 'Portfolio Contact');
  const bod = encodeURIComponent('Hi Anas,\n\n' + m + '\n\n— ' + n + '\n' + e);
  window.location.href = 'mailto:mdanassk2007@gmail.com?subject=' + sub + '&body=' + bod;
  document.getElementById('fbd').style.display = 'none';
  document.getElementById('fok').style.display = 'block';
}
