// Animation utilities
export const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

export function createIntersectionObserver(callback) {
    return new IntersectionObserver(callback, observerOptions);
}