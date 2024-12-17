import { initializeMobileMenu } from './components/mobileMenu.js';
import { createIntersectionObserver } from './utils/animations.js';
import { initializeLoader } from './utils/loader.js';
import { updateFooterYear, initializeAnimations } from './utils/dom.js';

// Initialize loader
const loader = initializeLoader();

// Initialize mobile menu
initializeMobileMenu();

// Update Footer Year
updateFooterYear();

// Intersection Observer for Fade In Animation
const observer = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
});

// Handle page load events
const handlePageLoad = () => {
    initializeAnimations(observer);
    setTimeout(() => loader.hide(), 800);
};

window.addEventListener('load', handlePageLoad);
document.addEventListener('DOMContentLoaded', handlePageLoad);