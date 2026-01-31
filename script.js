// INITIALIZE EMAILJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // GET THIS FROM EMAILJS DASHBOARD
})();

// DATA FROM YOUR JSON
const data = {
    "skills": {
        "Forensics": ["Autopsy", "FTK Imager", "Magnet AXIOM"],
        "Security": ["VAPT", "WAPT", "Burp Suite", "Nmap"],
        "Languages": ["Python", "Bash", "Shell Scripting"]
    },
    "projects": [
        { "title": "CMTL Multi-Tool", "link": "https://github.com/isayani-78/CMTL" },
        { "title": "AI Phishing Detector", "link": "https://github.com/isayani-78/AI-Powered-Phishing-Email-Detector" }
    ]
};

// POPULATE SKILLS (Aditya Style)
const skillBox = document.getElementById('skills-display');
Object.entries(data.skills).forEach(([cat, list]) => {
    const div = document.createElement('div');
    div.className = 'bento-item';
    div.innerHTML = `<h3>${cat}</h3><p style="color:#8b949e">${list.join(' • ')}</p>`;
    skillBox.appendChild(div);
});

// POPULATE PROJECTS
const projectBox = document.getElementById('projects-grid');
data.projects.forEach(p => {
    const div = document.createElement('div');
    div.className = 'bento-item';
    div.innerHTML = `<h4>${p.title}</h4><a href="${p.link}" class="btn-cyber" style="font-size:0.8rem">Source Code</a>`;
    projectBox.appendChild(div);
});

// FORM HANDLING
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.innerText = "Sending...";

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            status.innerText = "Transmission Successful.";
            this.reset();
        }, (err) => {
            status.innerText = "Error: " + JSON.stringify(err);
        });
});

// CURSOR GLOW
document.addEventListener('mousemove', e => {
    const glow = document.querySelector('.cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
