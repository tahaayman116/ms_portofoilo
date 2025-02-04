// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    once: false,
    mirror: false,
    offset: 100,
    easing: 'ease-in-out',
    delay: 100
});

// Cursor effect
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const updateCursor = () => {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return; // تحقق من وجود العنصرين

    posX += (mouseX - posX) * 0.1;
    posY += (mouseY - posY) * 0.1;
    
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    
    requestAnimationFrame(updateCursor);
};

updateCursor();

// Add hover effect for links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1.5)`;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(1.5)`;
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(1)`;
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(1)`;
    });
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.transform = `scaleX(${scrolled / 100})`;
    });
};

createScrollProgress();

// Enhanced scroll reveal for sections
const sections = document.querySelectorAll('section');
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});

sections.forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (hero) {
        hero.style.backgroundPosition = `50% ${scrolled * 0.5}px`;
    }
});

// Matrix rain effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const matrix = document.querySelector('.hero-matrix');

if (matrix) {
    matrix.appendChild(canvas);
    
    canvas.width = matrix.offsetWidth;
    canvas.height = matrix.offsetHeight;
    
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 10, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Certificates slider functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    const swiper = new Swiper('.certificates-swiper', {
        effect: 'cards',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 50
            }
        }
    });

    // Load certificates
    const certificatesPath = './certificates/';
    const certificates = [
        'WhatsApp Image 2025-01-26 at 8.28.28 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.28.29 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.30.05 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.30.14 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.32.51 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.33.16 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.33.35 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.34.41 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.35.04 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.35.27 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.35.46 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.36.10 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.36.39 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.39.08 PM (1).jpeg',
        'WhatsApp Image 2025-01-26 at 8.39.08 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.39.42 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.40.34 PM.jpeg',
        'WhatsApp Image 2025-01-26 at 8.44.46 PM.jpeg'
    ];

    const certificatesWrapper = document.querySelector('.swiper-wrapper');
    console.log('Loading certificates...');
    certificates.forEach((cert, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        
        const img = document.createElement('img');
        img.src = certificatesPath + cert;
        img.alt = `Certificate ${index + 1}`;
        img.loading = 'lazy';
        
        // Better error handling
        img.onerror = () => {
            console.error(`Failed to load image: ${certificatesPath + cert}`);
            // Add a fallback/placeholder
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNHB4IiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            slide.classList.add('error');
        };
        
        // Log successful loads
        img.onload = () => {
            console.log(`Successfully loaded image: ${cert}`);
            slide.classList.add('loaded');
        };

        slide.appendChild(img);
        certificatesWrapper.appendChild(slide);
    });

    // Update Swiper after adding slides
    swiper.update();
});

// Modal elements
const modal = document.querySelector('.certificate-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.querySelector('.modal-image');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
let currentImageIndex = 0;

// Modal functions
const openModal = (index) => {
    currentImageIndex = index;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadModalImage(index);
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        modalImage.src = '';
        modalImage.classList.remove('loaded');
    }, 300);
};

const loadModalImage = (index) => {
    modalImage.classList.remove('loaded');
    modalImage.src = certificatesPath + certificates[index];
    modalImage.onload = () => {
        modalImage.classList.add('loaded');
    };
};

const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + certificates.length) % certificates.length;
    loadModalImage(currentImageIndex);
};

const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % certificates.length;
    loadModalImage(currentImageIndex);
};

// Event listeners for modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Form handling with validation
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // Add form submission logic here
        this.showNotification('Message sent successfully!', 'success');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
