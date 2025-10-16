/* MATRIX BACKGROUND */
const canvas = document.getElementById('matrix');
const ctx = canvas?.getContext ? canvas.getContext('2d') : null;

let cols = 0;
let ypos = [];

function resizeCanvas(){
  if (!canvas || !ctx) return;
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  cols = Math.floor(canvas.width / 20) + 1;
  ypos = new Array(cols).fill(0);
}
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

/* SIMPLE SLIDESHOW */
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

/* Smooth scroll to anchor and set active */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelector('.top-nav')?.classList.remove('active');
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72; // header offset
      window.scrollTo({ top, behavior: 'smooth' });
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

/* HIDE RIGHT PANEL WHEN SCROLL AWAY FROM TOP */
const rightPanel = document.getElementById('right-panel');
function evaluateRightPanelVisibility(){
  if (!rightPanel) return;
  // Show only when near the top (home hero visible)
  if (window.scrollY < 120) {
    rightPanel.classList.remove('hidden');
    rightPanel.setAttribute('aria-hidden', 'false');
  } else {
    rightPanel.classList.add('hidden');
    rightPanel.setAttribute('aria-hidden', 'true');
  }
}
window.addEventListener('scroll', evaluateRightPanelVisibility);
window.addEventListener('load', evaluateRightPanelVisibility);

/* IN-viewport nav highlighting (IntersectionObserver) */
const sectionEls = Array.from(document.querySelectorAll('main .section'));
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, {root: null, threshold: 0.45});
  sectionEls.forEach(s => obs.observe(s));
}

/* certificates reveal */
function revealCertificates(){
  const certs = document.querySelectorAll('.certificate-card');
  if(!certs.length || !('IntersectionObserver' in window)) {
    // fallback: show all
    certs.forEach(c => c.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        o.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  certs.forEach(c => obs.observe(c));
}

/* inject social links and handle dynamic content from data.json (if present) */
function makeSocialAnch(name, url){
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = name;
  return a;
}

async function tryLoadDataJson(){
  try {
    const r = await fetch('data.json', {cache:'no-cache'});
    if (!r.ok) throw new Error('no data.json');
    const data = await r.json();

    // inject socials (desktop and contact)
    const bar = document.getElementById('social-bar-desktop');
    const links = document.getElementById('social-links');
    if (data.social && typeof data.social === 'object') {
      if(bar) { bar.innerHTML = ''; Object.entries(data.social).forEach(([n,u]) => bar.appendChild(makeSocialAnch(n,u))); }
      if(links) { links.innerHTML = ''; Object.entries(data.social).forEach(([n,u]) => links.appendChild(makeSocialAnch(n,u))); }
    }

    // optional: also inject projects if you want dynamic update (but we kept static projects to preserve original)
    if (data.projects && Array.isArray(data.projects) && data.projects.length) {
      const projectsGrid = document.getElementById('projects-grid');
      if(projectsGrid) {
        // Only add items not already present (prevents duplication)
        // We'll append any additional projects defined in data.json beyond the 4 kept statically
        const existingCount = projectsGrid.querySelectorAll('.project-card').length;
        data.projects.slice(existingCount).forEach(p => {
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
    }
  } catch (e) {
    // it's fine — data.json optional
    // console.log('data.json not loaded:', e);
  }
}

/* Register on window load */
window.addEventListener('load', () => {
  revealCertificates();
  tryLoadDataJson();
  // small delay to ensure right panel evaluated
  setTimeout(evaluateRightPanelVisibility, 120);
});

/* Footer year injection */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

/* Contact form placeholder check */
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    if(this.action && this.action.includes('REPLACE_WITH')){
      e.preventDefault();
      alert('Contact endpoint not configured. Replace the form action with your Formspree endpoint.');
    }
  });
}
