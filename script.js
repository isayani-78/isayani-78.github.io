/* =========================
   script.js for Sayani Portfolio
   ========================= */

/* ---------- Matrix background (persistent) ---------- */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener('resize', resizeCanvas);

const cols = Math.floor(canvas.width / 20) + 1;
let ypos = new Array(cols).fill(0);

function matrixTick(){
  // slight dark overlay to create trail
  ctx.fillStyle = 'rgba(2,6,10,0.15)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#28ffc6';
  ctx.font = '14pt monospace';
  for (let i = 0; i < cols; i++){
    const ch = String.fromCharCode(65 + Math.random()*33);
    ctx.fillText(ch, i*20, ypos[i]);
    if (ypos[i] > canvas.height + Math.random()*10000) ypos[i] = 0;
    ypos[i] += 18;
  }
}
setInterval(matrixTick, 60);

/* ---------- Right-panel slideshow ---------- */
let slides = Array.from(document.querySelectorAll('#slideshow .slide'));
let slideIdx = 0;
function showSlide(i){
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
document.getElementById('next').addEventListener('click', ()=>{
  slideIdx = (slideIdx + 1) % slides.length; showSlide(slideIdx);
});
document.getElementById('prev').addEventListener('click', ()=>{
  slideIdx = (slideIdx - 1 + slides.length) % slides.length; showSlide(slideIdx);
});
setInterval(()=>{ slideIdx = (slideIdx + 1) % slides.length; showSlide(slideIdx); }, 4000);

/* ---------- Page slide navigation + nav highlight ---------- */
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.top-nav a'));

function activatePage(id){
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // update nav highlight
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  // scroll top to avoid leftover scroll
  window.scrollTo({top:0,behavior:'smooth'});
}

// nav click handlers
navLinks.forEach(link=>{
  const href = link.getAttribute('href');
  if (href && href.startsWith('#')){
    link.addEventListener('click', e=>{
      e.preventDefault();
      const id = href.slice(1);
      activatePage(id);
    });
  }
});

// set initial page (home)
window.addEventListener('load', ()=>{ activatePage('home'); });

/* ---------- Skills: one-time fill + percent animation ---------- */
function animateSkillsOnce(){
  const skillEls = Array.from(document.querySelectorAll('.skill'));
  skillEls.forEach((skill, idx) => {
    const fill = skill.querySelector('.fill');
    const percentLabel = skill.querySelector('.percent');
    const val = parseInt(fill.getAttribute('data-val') || skill.getAttribute('data-val') || 70, 10);
    // stagger animation a little
    setTimeout(()=>{
      fill.style.width = val + '%';
      skill.classList.add('highlight');
      // animate number counting to val
      if (percentLabel){
        let counter = 0;
        percentLabel.textContent = '0%';
        percentLabel.style.opacity = 1;
        const interval = setInterval(()=>{
          counter += 1;
          percentLabel.textContent = counter + '%';
          if (counter >= val) clearInterval(interval);
        }, Math.max(10, Math.floor(1200/val)));
      }
      // remove highlight glow after 2s (so hover will reapply glow)
      setTimeout(()=> skill.classList.remove('highlight'), 2000);
    }, 300 + idx*120);
  });
}

// run animation once on first load
window.addEventListener('load', animateSkillsOnce);

/* ---------- Contact form placeholder handling ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm){
  contactForm.addEventListener('submit', function(e){
    if (this.action.includes('REPLACE_WITH') || this.action.includes('REPLACE_WITH_FORMSPREE')){
      e.preventDefault();
      alert('⚠️ Contact endpoint not configured. Sign up at Formspree and replace the form action to receive messages.');
    }
  });
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
