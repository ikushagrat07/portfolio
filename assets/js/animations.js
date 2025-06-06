// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all elements with fade-up class
document.querySelectorAll('.fade-up').forEach(element => {
    observer.observe(element);
});

// Observe reveal elements
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Skill icon rotation on hover
document.querySelectorAll('.skill-box i').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'skillIconRotate 1s ease-in-out';
    });
    
    icon.addEventListener('animationend', () => {
        icon.style.animation = '';
    });
});

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Project hover effects
document.querySelectorAll('.project-box').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.style.animation = 'projectHover 1s ease-in-out infinite';
    });

    project.addEventListener('mouseleave', () => {
        project.style.animation = '';
    });
});

// Button hover animation
document.querySelectorAll('.animated-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.animation = 'buttonPulse 1s infinite';
    });

    button.addEventListener('mouseleave', () => {
        button.style.animation = '';
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading-animation');
    img.addEventListener('load', () => {
        img.classList.remove('loading-animation');
    });
});

// Navbar scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}); 