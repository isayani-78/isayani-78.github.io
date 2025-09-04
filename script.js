// MATRIX BACKGROUND EFFECT
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

function matrix() {
  ctx.fillStyle = 'rgba(2,6,10,0.15)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#0ff6c8';
  ctx.font = '15pt monospace';
  for (let i = 0; i < ypos.length; i++) {
    const text = String.fromCharCode(65 + Math.random() * 33);
    ctx.fillText(text, i * 20, ypos[i]);
    if (ypos[i] > 100 + Math.random() * 10000) ypos[i] = 0;
    ypos[i] += 18;
  }
}

setInterval(matrix, 60);

addEventListener('resize', () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

// SLIDESHOW FUNCTIONALITY
let slides = document.querySelectorAll('.slideshow .slide');
let idx = 0;

function showSlide(i) {
  slides.forEach((s) => s.classList.remove('active'));
  slides[i].classList.add('active');

  // Show project/social sidebar only on the first slide
  document.querySelector('.project-sidebar')?.classList.toggle('active', i === 0);
}

document.getElementById('next').addEventListener('click', () => {
  idx = (idx + 1) % slides.length;
  showSlide(idx);
});

document.getElementById('prev').addEventListener('click', () => {
  idx = (idx - 1 + slides.length) % slides.length;
  showSlide(idx);
});

// Auto slide every 5 seconds
setInterval(() => {
  idx = (idx + 1) % slides.length;
  showSlide(idx);
}, 5000);

// INITIAL DISPLAY
showSlide(idx);

// SKILL BAR ANIMATION
window.addEventListener('load', () => {
  document.querySelectorAll('.skill .bar').forEach((b) => {
    const val = b.parentElement.getAttribute('data-val') || b.getAttribute('data-val') || 70;
    b.querySelector('.fill').style.width = val + '%';
    b.querySelector('.fill').classList.add('glow'); // glowing effect
  });
});

// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('.top-nav a').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// CONTACT FORM VALIDATION
document.getElementById('contact-form').addEventListener('submit', function (e) {
  if (this.action.includes('REPLACE_WITH')) {
    e.preventDefault();
    alert(
      'Form endpoint not configured. Sign up at Formspree.io and replace the form action with your endpoint.'
    );
  }
});
