// ================== Matrix background ==================
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

function matrix(){
  ctx.fillStyle = 'rgba(2,6,10,0.15)';
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#0ff6c8';
  ctx.font = '15pt monospace';
  for(let i=0;i<ypos.length;i++){
    const text = String.fromCharCode(65 + Math.random()*33);
    ctx.fillText(text, i*20, ypos[i]);
    if (ypos[i] > 100 + Math.random()*10000) ypos[i] = 0;
    ypos[i] += 18;
  }
}
setInterval(matrix, 60);
addEventListener('resize', ()=>{
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

// ================== Slideshow ==================
let slides = document.querySelectorAll('.slideshow .slide');
let idx = 0;
function show(i){
  slides.forEach(s=>s.classList.remove('active'));
  slides[i].classList.add('active');
}
document.getElementById('next').addEventListener('click', ()=>{
  idx = (idx+1) % slides.length;
  show(idx);
});
document.getElementById('prev').addEventListener('click', ()=>{
  idx = (idx-1+slides.length) % slides.length;
  show(idx);
});
setInterval(()=>{
  idx = (idx+1) % slides.length;
  show(idx);
}, 4000);

// ================== Skills Fill Animation ==================
window.addEventListener('load', ()=>{
  document.querySelectorAll('.skill .bar').forEach(b=>{
    const val = b.getAttribute('data-val') || b.parentElement.getAttribute('data-val') || 70;
    const fill = b.querySelector('.fill');
    fill.style.width = val + '%';
    fill.classList.add('filled');
    const percent = b.querySelector('.percent');
    if(percent){
      percent.textContent = val + '%';
      percent.style.opacity = 1;
    }
  });
});

// ================== Section Reveal on Scroll ==================
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
},{threshold:0.15});
sections.forEach(sec=>observer.observe(sec));

// ================== Navigation Active Highlight ==================
const navLinks = document.querySelectorAll('.top-nav a');
window.addEventListener('scroll', ()=>{
  let fromTop = window.scrollY + 120;
  navLinks.forEach(link=>{
    let section = document.querySelector(link.getAttribute('href'));
    if(section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
      navLinks.forEach(l=>l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// ================== Contact Form (client-side only) ==================
document.getElementById('contact-form').addEventListener('submit', function(e){
  if(this.action.includes('REPLACE_WITH')){
    e.preventDefault();
    alert('⚠️ Form endpoint not configured.\nSign up at Formspree.io and replace the form action with your endpoint.');
  }
});
