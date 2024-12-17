export function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('lucide-menu');
            icon.classList.add('lucide-x');
        } else {
            icon.classList.remove('lucide-x');
            icon.classList.add('lucide-menu');
        }
    });
}