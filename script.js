/* MATRIX BACKGROUND */
const canvas = document.getElementById('matrix');
const ctx = canvas?.getContext ? canvas.getContext('2d') : null;

function resizeCanvas(){
  if (!canvas || !ctx) return;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  cols = Math.floor(canvas.width / 20) + 1;
  ypos = new Array(cols).fill(0);
}
let cols = 0;
let ypos = [];
if (canvas && ctx) {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

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
}

/* SIMPLE SLIDESHOW (right panel) */
let slides = Array.from(document.querySelectorAll('#slideshow .slide'));
let slideIdx = 0;
function showSlide(i){
  slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
}
if (slides.length) {
  setInterval(() => {
    slideIdx = (slideIdx + 1) % slides.length;
    showSlide(slideIdx);
  }, 4000);
}

/* NAVBAR SMOOTH SCROLL & MOBILE TOGGLE */
const navLinks = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));
const hamburger = document.getElementById('hamburger');
hamburger?.addEventListener('click', () => {
  document.querySelector('.top-nav')?.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // small UX: close mobile menu if open
    document.querySelector('.top-nav')?.classList.remove('active');
    // smooth scroll to section
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72; // account for header
      window.scrollTo({ top, behavior: 'smooth' });
      // set active class
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

/* UTILITY: create simple icon-like element for socials */
function makeSocialEl(name, url){
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'social-item';
  a.innerHTML = `<span class="label">${name}</span>`;
  return a;
}

/* LOAD dynamic content from data.json */
async function loadDataAndPopulate(){
  try{
    const resp = await fetch('data.json', {cache: 'no-cache'});
    const data = await resp.json();

    // Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (data.skills && Array.isArray(data.skills) && skillsGrid){
      skillsGrid.innerHTML = ''; // clear
      data.skills.forEach(s => {
        // each skill is presented as a boxed element with glowing outline
        const box = document.createElement('div');
        box.className = 'skill-box';
        // If object with name/level provided, handle accordingly
        if (typeof s === 'string') {
          box.innerHTML = `<h4>${s}</h4>`;
        } else if (typeof s === 'object' && s.name){
          box.innerHTML = `<h4>${s.name}</h4>${s.level ? `<p>${s.level}</p>` : ''}`;
        }
        skillsGrid.appendChild(box);
      });
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (data.projects && Array.isArray(data.projects) && projectsGrid){
      projectsGrid.innerHTML = '';
      data.projects.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
          ${p.img ? `<img src="${p.img}" alt="${p.title}">` : ''}
          <h3>${p.title}</h3>
          <p>${p.desc || ''}</p>
          ${p.link ? `<p><a href="${p.link}" class="github-link" target="_blank">View on GitHub / Live</a></p>` : ''}
        `;
        projectsGrid.appendChild(card);
      });
    }

    // Socials (top-right panel + contact area)
    const socialBar = document.getElementById('social-bar-desktop');
    const socialLinks = document.getElementById('social-links');
    if (data.social && typeof data.social === 'object'){
      // clear
      if(socialBar) socialBar.innerHTML = '';
      if(socialLinks) socialLinks.innerHTML = '';

      Object.entries(data.social).forEach(([name, url]) => {
        const el = makeSocialEl(name, url);
        if(socialBar) socialBar.appendChild(el.cloneNode(true));
        if(socialLinks) socialLinks.appendChild(el.cloneNode(true));
      });
    }

  }catch(err){
    console.warn('Unable to load data.json (fallback to static HTML).', err);
  }
}
loadDataAndPopulate();

/* SKILL ANIMATION: gentle pop-in for skill boxes when they enter viewport */
function observeSkills(){
  const boxes = document.querySelectorAll('.skill-box');
  if(!boxes.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.transform = 'translateY(-4px)';
        entry.target.style.transition = 'transform 400ms ease, box-shadow 400ms ease';
        entry.target.style.boxShadow = '0 12px 30px rgba(0, 255, 213, 0.04)';
        o.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  boxes.forEach(b => obs.observe(b));
}
window.addEventListener('load', () => {
  // small delay to let dynamic skills render
  setTimeout(observeSkills, 350);
});

/* FOOTER YEAR */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
