// ===== Hero Background Particles =====
const canvas = document.getElementById('hero-bg');
const ctx = canvas.getContext('2d');
let w, h;
let particles = [];

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 1,
            dy: (Math.random() - 0.5) * 1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,140,66,0.7)';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawParticles();

// ===== Typing Effect с градиентом =====
const heroText = `Привет! Я Xeokp
Разрабатываю веб-приложения,
Telegram и Discord ботов,
увлекаюсь олимпиадным программированием
и математикой!`;

// ключевые слова для градиента
const highlights = ['веб-приложения', 'Telegram', 'Discord ботов', 'олимпиадным программированием', 'математикой'];

function typeTextGradient(elementId, text, speed = 40) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            element.innerHTML += char;

            // Проверяем текущее содержимое на наличие ключевых слов
            highlights.forEach(word => {
                const regex = new RegExp(`(${word})`, 'g');
                element.innerHTML = element.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
            });

            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('DOMContentLoaded', () => {
    typeTextGradient('hero-typing', heroText);
});

// ===== Projects Progress Bars Animation =====
const projectBars = document.querySelectorAll('.project-progress');
projectBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    const fill = document.createElement('div');
    fill.style.width = '0%';
    bar.appendChild(fill);
    setTimeout(() => {
        fill.style.width = percent + '%';
    }, 500);
});

// ===== Circular Skill Bars =====
function animateCircles() {
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        let current = 0;
        const interval = setInterval(() => {
            if (current >= percent) {
                clearInterval(interval);
            } else {
                current++;
                circle.style.background = `conic-gradient(#ff8c42 ${current}%, #2b0f0f ${current}%)`;
                circle.textContent = current + '%';
            }
        }, 15);
    });
}
animateCircles();

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.tool-card, .project-card, .skill');

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
