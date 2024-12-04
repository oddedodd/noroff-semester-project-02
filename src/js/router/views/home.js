function createHeroSection() {
    const heroSection = document.createElement('section');
    heroSection.className = 'bg-blue-500 text-white py-20';

    const container = document.createElement('div');
    container.className = 'container mx-auto text-center';

    const heading = document.createElement('h1');
    heading.className = 'text-4xl font-bold mb-4';
    heading.textContent = 'Welcome to Our Website';

    const button = document.createElement('a');
    button.href = '/test/';
    button.className = 'bg-white text-blue-500 py-2 px-4 rounded';
    button.textContent = 'Learn More';

    container.appendChild(heading);
    container.appendChild(button);
    heroSection.appendChild(container);

    document.body.appendChild(heroSection);
}

createHeroSection();