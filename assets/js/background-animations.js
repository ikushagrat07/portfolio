// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random movement direction
        particle.style.setProperty('--move-x', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--move-y', `${(Math.random() - 0.5) * 200}px`);
        
        // Random animation duration
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;
        
        // Random delay
        particle.style.animationDelay = `${-Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Optimize performance by checking if elements are in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
}, {
    threshold: 0
});

// Observe animated elements
document.querySelectorAll('.orb, .glow-line, .particle').forEach(element => {
    observer.observe(element);
});

// Adjust animation intensity based on scroll position
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    const scrollSpeed = Math.abs(scrollTop - lastScrollTop);
    
    // Adjust orb movement based on scroll
    document.querySelectorAll('.orb').forEach(orb => {
        if (scrollSpeed > 30) {
            const scale = 1 + (scrollSpeed * 0.001);
            orb.style.transform = `scale(${scale})`;
        }
    });
    
    lastScrollTop = scrollTop;
});

// Add parallax effect to background elements
window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.orb').forEach(orb => {
        const speed = parseFloat(orb.dataset.speed || 0.05);
        const x = (mouseX - 0.5) * 100 * speed;
        const y = (mouseY - 0.5) * 100 * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}); 