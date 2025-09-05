/* MATRIX BACKGROUND */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let cols = Math.floor(canvas.width / 20) + 1;
let ypos = new Array(cols).fill(0);

function matrixTick(){
  ctx.fillStyle = 'rgba(2,6,10,0.15)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#28ffc6';
  ctx.font = '14pt monospace';
  for(let i = 0; i < cols; i++){
    const ch = String.fromCharCode(65 + Math.random() * 33);
    ctx.fillText(ch, i * 20, ypos[i]);
    if(ypos[i] > canvas.height + Math.random() * 10000) ypos[i] = 0;
    ypos[i] += 18;
  }
}
setInterval(matrixTick, 60);

/* RIGHT PANEL SLIDESHOW */
let slides = Array.from(document.querySelectorAll('#slideshow .slide'));
let slideIdx = 0;

function showSlide(i){
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}

document.getElementById('next')?.addEventListener('click', () => {
  slideIdx = (slideIdx + 1) % slides.length; 
  showSlide(slideIdx);
});

document.getElementById('prev')?.addEventListener('click', () => {
  slideIdx = (slideIdx - 1 + slides.length) % slides.length; 
  showSlide(slideIdx);
});

setInterval(() => {
  slideIdx = (slideIdx + 1) % slides.length;
  showSlide(slideIdx);
}, 4000);

/* PAGE SLIDES + NAV HIGHLIGHT */
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.top-nav a'));
const rightPanel = document.getElementById('right-panel');

function activatePage(id){
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if(target) target.classList.add('active');

  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  window.scrollTo({ top:0, behavior:'smooth' });

  // Show right panel only on home
  if(id === 'home'){ 
    rightPanel?.classList.remove('hidden'); 
  } else { 
    rightPanel?.classList.add('hidden'); 
  }
}

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if(href && href.startsWith('#')){
    link.addEventListener('click', e => {
      e.preventDefault();
      activatePage(href.slice(1));

      // Close mobile menu after any link click
      document.querySelector('.top-nav')?.classList.remove('active');
    });
  }
});

/* HAMBURGER MENU */
const hamburger = document.getElementById('hamburger');
hamburger?.addEventListener('click', () => {
  document.querySelector('.top-nav')?.classList.toggle('active');
});

/* SKILLS ANIMATION */
function animateSkillsOnce(){
  const skillEls = Array.from(document.querySelectorAll('.skill'));
  skillEls.forEach((skill, idx) => {
    const fill = skill.querySelector('.fill');
    const percentLabel = skill.querySelector('.percent');
    const val = parseInt(fill?.getAttribute('data-val') || skill.getAttribute('data-val') || 70, 10);
    
    setTimeout(() => {
      fill.style.width = val + '%';
      skill.classList.add('highlight');

      if(percentLabel){
        let counter = 0;
        percentLabel.textContent = '0%';
        percentLabel.style.opacity = 1;
        const interval = setInterval(() => {
          counter++;
          percentLabel.textContent = counter + '%';
          if(counter >= val) clearInterval(interval);
        }, Math.max(10, Math.floor(1200 / val)));
      }

      setTimeout(() => skill.classList.remove('highlight'), 2000);
    }, 300 + idx * 120);
  });
}
window.addEventListener('load', animateSkillsOnce);

/* CONTACT FORM */
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    if(this.action.includes('REPLACE_WITH')){
      e.preventDefault();
      alert('⚠️ Contact endpoint not configured. Sign up at Formspree and replace the form action.');
    }
  });
}

/* FOOTER YEAR */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
