// Matrix background
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
let w = canvas.width = innerWidth, h = canvas.height = innerHeight;
const cols = Math.floor(w/20)+1, ypos = Array(cols).fill(0);
function matrix(){
  ctx.fillStyle='rgba(2,6,10,0.15)';ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#0ff6c8';ctx.font='15pt monospace';
  ypos.forEach((y,ind)=>{
    const text=String.fromCharCode(65+Math.random()*33);
    ctx.fillText(text,ind*20,y);
    if(y>100+Math.random()*10000) ypos[ind]=0; else ypos[ind]=y+18;
  });
}
setInterval(matrix,60);
addEventListener('resize',()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight;});

// Slide controls
let slides=document.querySelectorAll('.slide');let idx=0;
function show(i){slides.forEach(s=>s.classList.remove('active'));slides[i].classList.add('active');}
document.getElementById('next').addEventListener('click',()=>{idx=(idx+1)%slides.length;show(idx);});
document.getElementById('prev').addEventListener('click',()=>{idx=(idx-1+slides.length)%slides.length;show(idx);});

// Skill bar animation
window.addEventListener('load',()=>{
  document.querySelectorAll('.skill').forEach(skill=>{
    const val=skill.getAttribute('data-val');
    skill.querySelector('.fill').style.width=val+'%';
  });
});
