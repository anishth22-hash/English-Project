document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const poemsDisplay = document.getElementById('poems-display');
    const artistStatementsDisplay = document.getElementById('artist-statements-display');
    const citationsDisplay = document.getElementById('citations-display');
    const themesSection = document.querySelector('.themes-section');
    const themeCards = document.querySelectorAll('.theme-card');
    const categorySections = document.querySelectorAll('.category-section');
    const backToThemesBtn = document.querySelector('.back-to-themes');
    const prevThemeBtn = document.querySelector('.prev-theme');
    const nextThemeBtn = document.querySelector('.next-theme');
    const readBtn = document.getElementById('readBtn');
    const statementBtn = document.getElementById('statementBtn');

    const themeCardsArray = Array.from(themeCards).map(card => card.getAttribute('data-theme'));
    let currentThemeIndex = -1;

    function hideAll() {
        themesSection.style.display = 'none';
        poemsDisplay.classList.add('hidden');
        artistStatementsDisplay.classList.add('hidden');
        if (citationsDisplay) citationsDisplay.classList.add('hidden');
        prevThemeBtn.style.display = 'none';
        nextThemeBtn.style.display = 'none';
        currentThemeIndex = -1;
    }

    function showHome() {
        hideAll();
        themesSection.style.display = 'block';
        navLinks.forEach(l => l.classList.remove('active'));
        const homeLink = document.querySelector('a[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateNavigationButtons() {
        if (currentThemeIndex <= 0) {
            prevThemeBtn.classList.add('disabled');
            prevThemeBtn.disabled = true;
        } else {
            prevThemeBtn.classList.remove('disabled');
            prevThemeBtn.disabled = false;
        }
        if (currentThemeIndex >= themeCardsArray.length - 1) {
            nextThemeBtn.classList.add('disabled');
            nextThemeBtn.disabled = true;
        } else {
            nextThemeBtn.classList.remove('disabled');
            nextThemeBtn.disabled = false;
        }
    }

    function navigateToTheme(theme) {
        currentThemeIndex = themeCardsArray.indexOf(theme);
        categorySections.forEach(section => section.classList.remove('active'));
        const categorySection = document.getElementById(theme);
        if (categorySection) categorySection.classList.add('active');
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showPoems(themeIndex) {
        hideAll();
        currentThemeIndex = themeIndex;
        poemsDisplay.classList.remove('hidden');
        prevThemeBtn.style.display = 'block';
        nextThemeBtn.style.display = 'block';
        categorySections.forEach(section => section.classList.remove('active'));
        const categorySection = document.getElementById(themeCardsArray[themeIndex]);
        if (categorySection) categorySection.classList.add('active');
        navLinks.forEach(link => link.classList.remove('active'));
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (target === '#artist-statements') {
                hideAll();
                artistStatementsDisplay.classList.remove('hidden');
            } else if (target === '#citations') {
                hideAll();
                if (citationsDisplay) citationsDisplay.classList.remove('hidden');
            } else {
                hideAll();
                themesSection.style.display = 'block';
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Theme cards
    themeCards.forEach(card => {
        card.addEventListener('click', () => {
            const theme = card.getAttribute('data-theme');
            showPoems(themeCardsArray.indexOf(theme));
        });
    });

    // Back to themes
    if (backToThemesBtn) backToThemesBtn.addEventListener('click', showHome);

    // All back-home buttons
    document.querySelectorAll('.back-home-btn').forEach(btn => {
        btn.addEventListener('click', showHome);
    });

    // Prev/Next theme
    prevThemeBtn.addEventListener('click', () => {
        if (currentThemeIndex > 0) navigateToTheme(themeCardsArray[currentThemeIndex - 1]);
    });
    nextThemeBtn.addEventListener('click', () => {
        if (currentThemeIndex < themeCardsArray.length - 1) navigateToTheme(themeCardsArray[currentThemeIndex + 1]);
    });

    // Read the collection button
    if (readBtn) {
        readBtn.addEventListener('click', () => { showPoems(0); });
    }

    // Artist's statement button
    if (statementBtn) {
        statementBtn.addEventListener('click', () => {
            hideAll();
            artistStatementsDisplay.classList.remove('hidden');
            navLinks.forEach(link => link.classList.remove('active'));
            const artistStatementsLink = document.querySelector('a[href="#artist-statements"]');
            if (artistStatementsLink) artistStatementsLink.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});