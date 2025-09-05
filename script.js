// ===== MATRIX BACKGROUND =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
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
window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

// ===== SLIDESHOW =====
let slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

document.getElementById('next')?.addEventListener('click', () => {
  current = (current + 1) % slides.length;
  showSlide(current);
});

document.getElementById('prev')?.addEventListener('click', () => {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
});

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 6000);

// ===== SKILL BAR ANIMATION =====
window.addEventListener('load', () => {
  const skillFills = document.querySelectorAll('.skill .fill');
  skillFills.forEach(fill => {
    const val = fill.parentElement.getAttribute('data-val') || 70;
    fill.style.width = val + '%';
    // Add glow for first skill column
    if(fill.closest('.skill-column').querySelector('h3')?.textContent === "Scripting & Language"){
      fill.classList.add('glow');
    }
  });
});

// ===== CONTACT FORM CHECK =====
document.getElementById('contact-form')?.addEventListener('submit', function(e){
  if(this.action.includes('REPLACE_WITH')){
    e.preventDefault();
    alert('Form endpoint not configured. Sign up at Formspree.io and replace the form action with your endpoint.');
  }
});
