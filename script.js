/* ================= Matrix Background ================= */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
function resizeCanvas(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resizeCanvas();
addEventListener('resize', resizeCanvas);

const columns = Math.floor(canvas.width / 18);
let drops = new Array(columns).fill(1);
function drawMatrix(){
  ctx.fillStyle = 'rgba(1,4,6,0.16)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#28ffc6';
  ctx.font = '14px monospace';
  for(let i=0;i<drops.length;i++){
    const char = String.fromCharCode(65 + Math.random()*26);
    ctx.fillText(char, i*18, drops[i]*18);
    if(drops[i]*18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 55);

/* ================= Global Slideshow (fixed) ================= */
const gsSlides = document.querySelectorAll('#global-slideshow .gs-slide');
let gsIdx = 0;
function gsShow(i){
  gsSlides.forEach((s, idx)=> s.classList.toggle('active', idx===i));
}
document.getElementById('gs-prev').addEventListener('click', ()=>{ gsIdx=(gsIdx-1+gsSlides.length)%gsSlides.length; gsShow(gsIdx); });
document.getElementById('gs-next').addEventListener('click', ()=>{ gsIdx=(gsIdx+1)%gsSlides.length; gsShow(gsIdx); });
setInterval(()=>{ gsIdx=(gsIdx+1)%gsSlides.length; gsShow(gsIdx); }, 4500);

/* ================= Page slide navigation + nav highlight ================= */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.top-nav a');

function activatePage(id){
  // show page
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if(target) target.classList.add('active');

  // nav highlight
  navLinks.forEach(l => l.classList.remove('active'));
  const link = document.querySelector(`.top-nav a[href="#${id}"]`);
  if(link) link.classList.add('active');

  // bring to top
  window.scrollTo({top:0,behavior:'smooth'});
}

// set click handlers
navLinks.forEach(link=>{
  const href = link.getAttribute('href');
  if(!href || !href.startsWith('#')) return;
  const id = href.slice(1);
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    activatePage(id);
  });
});

// auto-activate home on load
window.addEventListener('load', ()=> activatePage('home'));

/* ================= Global Page intersection: animate skill bars ONCE ================= */
let skillsAnimated = false;
const skillEls = document.querySelectorAll('.skill');

function animateSkillsOnce(){
  if(skillsAnimated) return;
  // if skills section is active or visible, animate
  const skillsSection = document.getElementById('skills');
  if(!skillsSection) return;
  const rect = skillsSection.getBoundingClientRect();
  if(rect.top < window.innerHeight){
    skillsAnimated = true;
    skillEls.forEach((el, idx)=>{
      const val = parseInt(el.getAttribute('data-val')) || 70;
      const fill = el.querySelector('.fill');
      const pct = el.querySelector('.pct');
      // animate width after small stagger
      setTimeout(()=>{
        fill.style.width = val + '%';
        // show percentage counting up
        let count = 0;
        const step = Math.max(1, Math.round(val/30));
        const interval = setInterval(()=>{
          count += step;
          if(count >= val) count = val;
          if(pct) pct.textContent = count + '%';
          if(count >= val) clearInterval(interval);
        }, 18);
        // add highlight glow then remove
        el.classList.add('highlight','filled');
        setTimeout(()=>{ el.classList.remove('highlight'); }, 1600);
      }, idx * 120);
    });
  }
}

// trigger on load and on page change/scroll
window.addEventListener('load', animateSkillsOnce);
window.addEventListener('scroll', animateSkillsOnce);

// Also run animate when skills page activated via nav
document.querySelectorAll('.top-nav a[href="#skills"]').forEach(a=>{
  a.addEventListener('click', ()=> { setTimeout(animateSkillsOnce, 300); });
});

/* ================= Contact form placeholder ================= */
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    if(this.action.includes('REPLACE_WITH')){
      e.preventDefault();
      alert('Form endpoint not set. Replace action with Formspree or your endpoint to receive messages.');
    }
  });
}

/* ================= footer year ================= */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
