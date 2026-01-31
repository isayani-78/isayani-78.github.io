// Initialize EmailJS (Replace with your keys from emailjs.com)
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// Handle Contact Form
document.getElementById('email-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            alert("Transmission Sent Successfully!");
        }, (error) => {
            alert("Connection Failed: " + JSON.stringify(error));
        });
});

// Matrix Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#28ffc6";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Fetch Data.json
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const skillsDiv = document.getElementById('skills-grid');
        data.skills_categories.forEach(cat => {
            skillsDiv.innerHTML += `
                <div class="card">
                    <h3 class="accent">${cat.title}</h3>
                    <p class="mono">${cat.list.join(' / ')}</p>
                </div>`;
        });
        
        const projDiv = document.getElementById('projects-grid');
        data.projects.forEach(p => {
            projDiv.innerHTML += `
                <div class="card">
                    <img src="${p.image}" style="width:100%; border-radius:8px">
                    <h3>${p.title}</h3>
                    <p>${p.desc}</p>
                    <a href="${p.github}" class="accent mono" target="_blank">Access Code ></a>
                </div>`;
        });
    });
