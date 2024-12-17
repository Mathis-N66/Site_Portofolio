export function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

export function initializeAnimations(observer) {
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}