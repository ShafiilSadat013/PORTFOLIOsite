// Navigation Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Photography Gallery
const photos = [
    "./attached_assets/IMG-20250419-WA0022_1752081021866.jpg",
    "./attached_assets/IMG-20250419-WA0023_1752081021867.jpg",
    "./attached_assets/IMG-20250419-WA0024_1752081021867.jpg",
    "./attached_assets/IMG-20250419-WA0025_1752081021867.jpg",
    "./attached_assets/IMG-20250419-WA0026_1752081021867.jpg",
    "./attached_assets/IMG-20250419-WA0027_1752081021867.jpg",
    "./attached_assets/IMG-20250419-WA0028_1752081021868.jpg",
    "./attached_assets/IMG-20250419-WA0029_1752081021868.jpg",
    "./attached_assets/IMG-20250419-WA0030_1752081021868.jpg",
    "./attached_assets/IMG-20250419-WA0031_1752081021868.jpg"
];

let currentPhotoIndex = 0;

// Change photo function
function changePhoto(direction) {
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    } else if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }
    
    updatePhoto();
}

// Select photo function
function selectPhoto(index) {
    currentPhotoIndex = index;
    updatePhoto();
}

// Update photo display
function updatePhoto() {
    const currentPhoto = document.getElementById('currentPhoto');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main photo
    currentPhoto.src = photos[currentPhotoIndex];
    
    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentPhotoIndex);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                skillObserver.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.info-card, .skill-card, .language-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add keyboard navigation for photo gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changePhoto(-1);
    } else if (e.key === 'ArrowRight') {
        changePhoto(1);
    }
});

// Auto-play photo slideshow (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        changePhoto(1);
    }, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play when page loads
// startAutoPlay();

// Stop auto-play when user interacts with gallery
document.querySelector('.photo-viewer').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.photo-viewer').addEventListener('mouseleave', startAutoPlay);

// Mobile touch support for photo gallery
let startX = 0;
let startY = 0;

document.querySelector('.photo-display').addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.querySelector('.photo-display').addEventListener('touchend', function(e) {
    if (!startX || !startY) {
        return;
    }
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Check if it's a horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            // Swipe left - next photo
            changePhoto(1);
        } else {
            // Swipe right - previous photo
            changePhoto(-1);
        }
    }
    
    startX = 0;
    startY = 0;
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});