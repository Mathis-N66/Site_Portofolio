// Projects Data
const projects = [
    // Application Mobiles
    {
        id: 1,
        title: "Application de films",
        description: "Bibliothèque de films avec des fonctionnalités de recherche et de détails du film.",
        image: "./image/films_app.png",
        category: "mobile",
        technologies: ["Dart ", "/ ", "flutter "],
        github: "https://github.com/Mathis-N66/TP5_Aplication-DART",
        demo: "https://demo.com"
    },
    {
        id: 2,
        title: "Portfolio",
        description: "Description courte du projet avec les technologies utilisées.",
        image: "https://tse2.mm.bing.net/th?id=OIP.zZhZjzVvCvpcxtMAJie3GQAAAA&pid=Api",
        category: "mobile",
        technologies: ["codage ", "codage ", "codage "],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 3,
        title: "Application de listing de films",
        description: "Description courte du projet avec les technologies utilisées.",
        image: "https://tse2.mm.bing.net/th?id=OIP.zZhZjzVvCvpcxtMAJie3GQAAAA&pid=Api",
        category: "mobile",
        technologies: ["codage ", "codage ", "codage "],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 4,
        title: "Application Mobile",
        description: "Description courte du projet avec les technologies utilisées.",
        image: "https://tse2.mm.bing.net/th?id=OIP.zZhZjzVvCvpcxtMAJie3GQAAAA&pid=Api",
        category: "mobile",
        technologies: ["codage ", "codage ", "codage "],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    // HTML / CSS
    {
        id: 5,
        title: "a voir",
        description: "Description courte du projet avec les technologies utilisées.",
        image: "https://tse2.mm.bing.net/th?id=OIP.zZhZjzVvCvpcxtMAJie3GQAAAA&pid=Api",
        category: "htmlcss",
        technologies: ["codage ", "codage ", "codage "],
        github: "https://github.com",
        demo: "https://demo.com"
    },
    {
        id: 6,
        title: "a voir",
        description: "Description courte du projet avec les technologies utilisées.",
        image: "https://tse2.mm.bing.net/th?id=OIP.zZhZjzVvCvpcxtMAJie3GQAAAA&pid=Api",
        category: "htmlcss",
        technologies: ["codage ", "codage ", "codage "],
        github: "https://github.com",
        demo: "https://demo.com"
    }
];

const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function createProjectCard(project) {
    return `
        <div class="project-card fade-in" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" rel="noopener noreferrer" 
                           class="project-link" aria-label="View GitHub Repository">
                            <i class="icon-github"></i>
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

function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        projectsGrid.innerHTML = filteredProjects.map(createProjectCard).join('');
        
        const newCards = document.querySelectorAll('.project-card');
        newCards.forEach(card => {
            observer.observe(card);
            card.style.opacity = '';
            card.style.transform = '';
        });
    }, 300);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('active')) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.dataset.filter);
        }
    });
});

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

function handleLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lozad.js/1.16.0/lozad.min.js';
        document.body.appendChild(lazyLoadScript);
        lazyLoadScript.onload = function() {
            const observer = lozad();
            observer.observe();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    filterProjects('all');
    handleLazyLoading();
});

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;
        filterProjects(currentFilter);
    }, 250);
});