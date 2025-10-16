/* script.js - final */

/* MATRIX BACKGROUND */
const canvas = document.getElementById('matrix');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
let cols = 0;
let ypos = [];

function resizeCanvas(){
  if(!canvas || !ctx) return;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  cols = Math.floor(canvas.width / 18) + 1;
  ypos = new Array(cols).fill(0);
}
if (canvas && ctx){
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  function tick(){
    ctx.fillStyle = 'rgba(2,6,10,0.12)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#28ffc6';
    ctx.font = '14pt monospace';
    for(let i=0;i<cols;i++){
      const ch = String.fromCharCode(65 + Math.random()*33);
      ctx.fillText(ch, i*18, ypos[i]);
      if(ypos[i] > canvas.height + Math.random()*10000) ypos[i]=0;
      ypos[i] += 16;
    }
  }
  setInterval(tick,50);
}

/* SLIDESHOW (right panel) */
let slideIdx = 0;
const slides = Array.from(document.querySelectorAll('#slideshow .slide'));
function showSlide(i){
  slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
}
if (slides.length){
  setInterval(()=>{ slideIdx = (slideIdx+1) % slides.length; showSlide(slideIdx);}, 4000);
}

/* MOBILE MENU (hamburger) */
const hamburger = document.getElementById('hamburger');
const topNav = document.getElementById('top-nav');
hamburger?.addEventListener('click', ()=> topNav.classList.toggle('show'));

/* SMOOTH NAV & ACTIVE LINK */
const navLinks = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));
navLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    topNav.classList.remove('show'); // close mobile menu
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({top, behavior:'smooth'});
    }
  });
});

/* RIGHT PANEL: show only on top (home visible) */
const rightPanel = document.getElementById('right-panel');
function updateRightPanel(){
  const home = document.getElementById('home');
  if(!home || !rightPanel) return;
  const rect = home.getBoundingClientRect();
  // when home bottom > 100px -> show, else hide
  if(rect.bottom > 120) { rightPanel.classList.remove('hidden'); rightPanel.style.pointerEvents='auto'; }
  else { rightPanel.classList.add('hidden'); rightPanel.style.pointerEvents='none'; }
}
window.addEventListener('scroll', updateRightPanel);
window.addEventListener('load', updateRightPanel);
setTimeout(updateRightPanel,300);

/* SECTION OBSERVER FOR ACTIVE LINK HIGHLIGHT */
if('IntersectionObserver' in window){
  const sections = document.querySelectorAll('main .page');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#'+id));
      }
    });
  }, {threshold:0.45});
  sections.forEach(s=> obs.observe(s));
}

/* CERTIFICATE REVEAL - optional small effect */
if('IntersectionObserver' in window){
  const certs = document.querySelectorAll('.certificate-card');
  const cobs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        o.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  certs.forEach(c=> {
    c.style.transform = 'translateY(20px)';
    c.style.opacity = '0';
    cobs.observe(c);
  });
}

/* keep contact form default (Formspree) — no override */
