document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorRing = document.querySelector('.cursor-ring');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }, 500);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.background = 'var(--accent)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });

    // Links hover effect
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
        });

        link.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
        });
    });
});

// Loading screen fade out
// window.addEventListener('particle-canvas', () => {
    // const loadingScreen = document.getElementById('loading-screen');
    // setTimeout(() => {
    //     loadingScreen.style.opacity = '0';
    // setTimeout(() => {
    //     loadingScreen.style.display = 'none';
    // }, 1000);
    // }, 1000);
// });

// Particle network background
function initParticleNetwork() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 150;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            size: Math.random() * 2 + 1,
            color: `rgba(100, 255, 218, ${Math.random() * 0.5 + 0.2})`
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const otherParticle = particles[j];
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.2 * (1 - distance / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

initParticleNetwork();

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.education-card, .language-badge, .contact-card, .avatar-container'
    );

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

initScrollReveal();
// document.querySelectorAll('.reveal, .edu-item, .exp-card').forEach(el => observer.observe(el));
