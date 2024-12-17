// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formDataObj = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formDataObj);
    
    // Simulate success (replace with actual API call)
    alert('Message envoyé avec succès!');
    contactForm.reset();
});