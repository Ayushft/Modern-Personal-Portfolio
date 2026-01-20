// ===== NAVIGATION FUNCTIONALITY =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scroll-progress');

// Navbar scroll effect and progress bar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== TYPING ANIMATION =====
const typingText = document.querySelector('.typing-text');
const titles = [
    'Software Engineer - Salesforce',
    'Salesforce Developer',
    'Integration Developer',
    'Platform Developer'
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeTitle, typingSpeed);
}

// Start typing animation
setTimeout(typeTitle, 1000);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CERTIFICATIONS CAROUSEL =====
const prevBtn = document.getElementById('prev-cert');
const nextBtn = document.getElementById('next-cert');
const certsWrapper = document.querySelector('.certifications-wrapper');

if (prevBtn && nextBtn && certsWrapper) {
    prevBtn.addEventListener('click', () => {
        certsWrapper.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        certsWrapper.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-method, .contact-form');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
position: fixed;
top: 50 %;
left: 50 %;
transform: translate(-50 %, -50 %);
background: linear - gradient(135deg, var(--color - accent - 1), var(--color - accent - 2));
color: white;
padding: 2rem 3rem;
border - radius: 1rem;
box - shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
z - index: 10000;
text - align: center;
animation: fadeIn 0.3s ease;
`;
    successMessage.innerHTML = `
    < h3 style = "margin-bottom: 0.5rem; font-size: 1.5rem;" > Message Sent! ✓</h3 >
        <p style="margin: 0;">Thank you for reaching out. I'll get back to you soon!</p>
`;

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove message after 3 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 300);
    }, 3000);
});

// ===== PARALLAX EFFECT FOR GRADIENT ORBS =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== PROJECT CARD TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');

    if (circles.length === 0) {
        // Create cursor circles
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
position: fixed;
width: 10px;
height: 10px;
border - radius: 50 %;
background: linear - gradient(135deg, var(--color - accent - 1), var(--color - accent - 3));
pointer - events: none;
z - index: 9999;
opacity: 0;
transition: opacity 0.3s ease;
`;
            document.body.appendChild(circle);
        }
    }

    const circlesArray = Array.from(document.querySelectorAll('.cursor-circle'));

    circlesArray.forEach((circle, index) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circlesArray.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.opacity = (20 - index) / 40;
            circle.style.transform = `scale(${(20 - index) / 20})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circlesArray[index + 1] || circlesArray[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
};

// Uncomment to enable cursor trail effect
// createCursorTrail();

// ===== ADD FADE OUT ANIMATION TO CSS =====
const style = document.createElement('style');
style.textContent = `
@keyframes fadeOut {
        from {
        opacity: 1;
        transform: translate(-50 %, -50 %) scale(1);
    }
        to {
        opacity: 0;
        transform: translate(-50 %, -50 %) scale(0.9);
    }
}
`;
document.head.appendChild(style);

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any additional scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

console.log('Portfolio loaded successfully! 🚀');
