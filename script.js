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
window.addEventListener('resize', resizeCanvas);

let cols = Math.floor(canvas.width / 20) + 1;
let ypos = new Array(cols).fill(0);

function matrixTick(){
  // dim background slightly to create trailing effect
  ctx.fillStyle = 'rgba(2,6,10,0.15)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#28ffc6';
  ctx.font = '14pt monospace';
  // recalc columns if resized
  cols = Math.floor(canvas.width / 20) + 1;
  if (ypos.length < cols) {
    ypos = new Array(cols).fill(0);
  }
  for (let i = 0; i < cols; i++){
    const ch = String.fromCharCode(65 + Math.random()*33);
    ctx.fillText(ch, i*20, ypos[i]);
    if (ypos[i] > canvas.height + Math.random()*10000) ypos[i] = 0;
    ypos[i] += 18;
  }
}
setInterval(matrixTick, 60);

/* ---------- Home slideshow (only in Home right-panel) ---------- */
let homeSlides = Array.from(document.querySelectorAll('#home-slideshow .slide'));
let homeIdx = 0;
function showHomeSlide(i){
  homeSlides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
const homeNextBtn = document.getElementById('home-next');
const homePrevBtn = document.getElementById('home-prev');
if (homeNextBtn && homePrevBtn && homeSlides.length){
  homeNextBtn.addEventListener('click', ()=>{ homeIdx = (homeIdx+1) % homeSlides.length; showHomeSlide(homeIdx); });
  homePrevBtn.addEventListener('click', ()=>{ homeIdx = (homeIdx-1+homeSlides.length) % homeSlides.length; showHomeSlide(homeIdx); });
  setInterval(()=>{ homeIdx = (homeIdx+1) % homeSlides.length; showHomeSlide(homeIdx); }, 4500);
}

/* ---------- Page slide navigation + nav highlight ---------- */
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.top-nav a, .home-link'));

function activatePage(id){
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // update nav highlight
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === '#' + id);
  });

  // scroll to top of page
  window.scrollTo({top:0,behavior:'smooth'});
}

// click handlers for top nav + home quick links
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

// set initial page = home on load
window.addEventListener('load', ()=>{ activatePage('home'); });

/* ---------- Skills: one-time fill + percent counter ---------- */
function animateSkillsOnce(){
  const skillEls = Array.from(document.querySelectorAll('.skill'));
  skillEls.forEach((skill, idx) => {
    const fill = skill.querySelector('.fill');
    const percentLabel = skill.querySelector('.percent');
    const val = parseInt(fill.getAttribute('data-val') || skill.getAttribute('data-val') || 70, 10);

    setTimeout(()=>{
      fill.style.width = val + '%';
      skill.classList.add('highlight');
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
      setTimeout(()=> skill.classList.remove('highlight'), 2000);
    }, 300 + idx*120);
  });
}
window.addEventListener('load', animateSkillsOnce);

/* ---------- Contact form placeholder handling ---------- */
const contactForm = document.getElementById('contact-form');
if (contactForm){
  contactForm.addEventListener('submit', function(e){
    if (this.action.includes('REPLACE_WITH')){
      e.preventDefault();
      alert('⚠️ Contact endpoint not configured. Sign up at Formspree and replace the form action to receive messages.');
    }
  });
}

/* ---------- Footer year ---------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
