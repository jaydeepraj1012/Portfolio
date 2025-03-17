// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission (placeholder for actual form handling)
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name && email && subject && message) {
            // Here you would typically send the data to a server
            // alert('Thank you for vist please content direct by email and phone number .');
            document.getElementById('customModal').style.display = 'flex';
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });
}
// Close modal function
function closeModal() {
    document.getElementById('customModal').style.display = 'none';
  }
// Add animation to skill items when they come into view
const observeElements = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    }, {
        threshold: 0.3
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Add animations when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate skills
    const skillItems = document.querySelectorAll('.skill-item');
    observeElements(skillItems, 'animate');
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item, .education-item');
    observeElements(timelineItems, 'animate');
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    observeElements(projectCards, 'animate');
});

// Add current year to copyright in footer
const yearSpan = document.querySelector('.current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}



