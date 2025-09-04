// =========================
// Matrix Background Effect
// =========================
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

// =========================
// Slideshow
// =========================
let slides = document.querySelectorAll('.slideshow .slide');
let idx = 0;
function show(i) {
  slides.forEach(s => s.classList.remove('active'));
  slides[i].classList.add('active');
}
document.getElementById('next').addEventListener('click', () => {
  idx = (idx + 1) % slides.length;
  show(idx);
});
document.getElementById('prev').addEventListener('click', () => {
  idx = (idx - 1 + slides.length) % slides.length;
  show(idx);
});
setInterval(() => {
  idx = (idx + 1) % slides.length;
  show(idx);
}, 4000);

// =========================
// Skill Fill Animation
// =========================
window.addEventListener('load', () => {
  document.querySelectorAll('.skill .bar').forEach(b => {
    const val = b.parentElement.getAttribute('data-val') ||
                b.getAttribute('data-val') || 70;
    b.querySelector('.fill').style.width = val + '%';
  });
});

// =========================
// Contact Form Validation
// =========================
document.getElementById('contact-form').addEventListener('submit', function(e) {
  if (this.action.includes('REPLACE_WITH')) {
    e.preventDefault();
    alert('⚠️ Form endpoint not configured.\n\n➡️ To receive messages: sign up at Formspree.io and replace the form action with your endpoint.\nOr connect another backend.');
  }
});

// =========================
// Page Slider + Nav Highlight + Fade Animations
// =========================
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".top-nav a, .hero-cta a");

function activateSection(targetId) {
  // Hide all sections
  sections.forEach(sec => {
    sec.classList.remove("active", "fade-in");
  });

  // Show the target section
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.add("active");
    // trigger fade-in after small delay so CSS picks it up
    setTimeout(() => target.classList.add("fade-in"), 50);
  }

  // Highlight nav
  navLinks.forEach(link => link.classList.remove("active"));
  const activeLink = document.querySelector(`.top-nav a[href="#${targetId}"]`);
  if (activeLink) activeLink.classList.add("active");

  // Scroll reset
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Handle clicks on nav links
navLinks.forEach(link => {
  if (link.getAttribute("href").startsWith("#")) {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      activateSection(targetId);
    });
  }
});

// ✅ Auto-activate "about" section on page load
window.addEventListener("load", () => {
  activateSection("about");
});
