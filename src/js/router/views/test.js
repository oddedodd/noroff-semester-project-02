function renderTestView() {
    const container = document.createElement('div');
    container.className = 'min-h-screen flex flex-col';

    const header = document.createElement('header');
    header.className = 'bg-gray-800 text-white p-4';
    const headerTitle = document.createElement('h1');
    headerTitle.className = 'text-2xl';
    headerTitle.textContent = 'Header';
    header.appendChild(headerTitle);

    const main = document.createElement('main');
    main.className = 'flex-grow flex items-center justify-center bg-gray-100';
    const section = document.createElement('section');
    section.className = 'text-center';
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'text-4xl font-bold mb-4';
    sectionTitle.textContent = 'TEST';
    const backLink = document.createElement('a');
    backLink.href = '/';
    backLink.className = 'text-blue-500 underline';
    backLink.textContent = 'Back to Home';
    section.appendChild(sectionTitle);
    section.appendChild(backLink);
    main.appendChild(section);

    const footer = document.createElement('footer');
    footer.className = 'bg-gray-800 text-white p-4 text-center';
    const footerText = document.createElement('p');
    footerText.textContent = 'Footer';
    footer.appendChild(footerText);

    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    document.body.appendChild(container);
}

renderTestView();