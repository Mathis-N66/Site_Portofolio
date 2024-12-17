// Projects Data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "Une plateforme e-commerce complète avec panier, paiement et gestion des commandes",
        image: "https://source.unsplash.com/800x600?ecommerce,shop",
        category: "fullstack",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 2,
        title: "Portfolio d'Artiste",
        description: "Site vitrine pour artiste avec galerie dynamique et système de blog",
        image: "https://source.unsplash.com/800x600?art,gallery",
        category: "frontend",
        technologies: ["Next.js", "Tailwind CSS", "Sanity.io"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 3,
        title: "Application de Gestion",
        description: "Dashboard administratif pour la gestion d'entreprise",
        image: "https://source.unsplash.com/800x600?dashboard,business",
        category: "backend",
        technologies: ["Express", "PostgreSQL", "Docker"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 4,
        title: "Application Mobile",
        description: "Application de fitness et suivi d'activités",
        image: "https://source.unsplash.com/800x600?fitness,mobile",
        category: "mobile",
        technologies: ["React Native", "Firebase", "Redux"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 5,
        title: "Réseau Social",
        description: "Plateforme sociale avec messagerie en temps réel",
        image: "https://source.unsplash.com/800x600?social,network",
        category: "fullstack",
        technologies: ["Vue.js", "Socket.io", "MongoDB"],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 6,
        title: "Application Météo",
        description: "Application météo avec géolocalisation et prévisions",
        image: "https://source.unsplash.com/800x600?weather,forecast",
        category: "frontend",
        technologies: ["React", "OpenWeather API", "Styled Components"],
        github: "https://github.com",
        demo: "https://demo.com"
    }
];

// Project Filtering and Display Logic
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Create project card with animation and hover effects
function createProjectCard(project) {
    return `
        <div class="project-card fade-in" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                           class="project-link" aria-label="View GitHub Repository">
                            <i class="lucide-github"></i>
                        </a>
                        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" 
                           class="project-link" aria-label="View Live Demo">
                            <i class="lucide-external-link"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Filter projects with smooth transitions
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Fade out existing cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    // Wait for fade out animation
    setTimeout(() => {
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
        
        // Initialize intersection observer for new cards
        const newCards = document.querySelectorAll('.project-card');
        newCards.forEach(card => {
            observer.observe(card);
            // Reset styles for fade in
            card.style.opacity = '';
            card.style.transform = '';
        });
    }, 300);
}

// Initialize filter buttons with active state management
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('active')) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Handle lazy loading of images
function handleLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        document.body.appendChild(lazyLoadScript);
        lazyLoadScript.onload = function() {
            const observer = lozad();
            observer.observe();
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    filterProjects('all');
    handleLazyLoading();
});

// Handle window resize for responsive layout
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterProjects(currentFilter);
    }, 250);
});