// Navigation links
const navLinks = document.querySelectorAll('.nav-link');
const poemsDisplay = document.getElementById('poems-display');
const artistStatementsDisplay = document.getElementById('artist-statements-display');
const themesSection = document.querySelector('.themes-section');
const themeCards = document.querySelectorAll('.theme-card');
const categorySections = document.querySelectorAll('.category-section');

// Poems navigation buttons
const backToThemesBtn = document.querySelector('.back-to-themes');
const prevThemeBtn = document.querySelector('.prev-theme');
const nextThemeBtn = document.querySelector('.next-theme');
const backHomeBtn = document.querySelector('.back-home-btn');

const themeCardsArray = Array.from(themeCards).map(card => card.getAttribute('data-theme'));
let currentThemeIndex = -1;

// Navigation between home, poems, and artist statements
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        if (target === '#artist-statements') {
            // Show artist statements page
            themesSection.style.display = 'none';
            poemsDisplay.classList.add('hidden');
            artistStatementsDisplay.classList.remove('hidden');
            
            // Hide navigation buttons when not viewing poems
            prevThemeBtn.style.display = 'none';
            nextThemeBtn.style.display = 'none';
            
            currentThemeIndex = -1;
        } else {
            // Show themes section (home)
            themesSection.style.display = 'block';
            poemsDisplay.classList.add('hidden');
            artistStatementsDisplay.classList.add('hidden');
            
            // Hide navigation buttons when not viewing poems
            prevThemeBtn.style.display = 'none';
            nextThemeBtn.style.display = 'none';
            
            currentThemeIndex = -1;
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Click on theme cards to view poems
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme');
        currentThemeIndex = themeCardsArray.indexOf(theme);
        
        // Hide themes section and show poems display
        themesSection.style.display = 'none';
        poemsDisplay.classList.remove('hidden');
        artistStatementsDisplay.classList.add('hidden');
        
        // Show navigation buttons when viewing poems
        prevThemeBtn.style.display = 'block';
        nextThemeBtn.style.display = 'block';
        
        // Hide all category sections
        categorySections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected category
        const categorySection = document.getElementById(theme);
        if (categorySection) {
            categorySection.classList.add('active');
        }
        
        // Update nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Back to themes button
backToThemesBtn.addEventListener('click', () => {
    themesSection.style.display = 'block';
    poemsDisplay.classList.add('hidden');
    artistStatementsDisplay.classList.add('hidden');
    currentThemeIndex = -1;
    
    // Hide navigation buttons when returning to themes
    prevThemeBtn.style.display = 'none';
    nextThemeBtn.style.display = 'none';
    
    // Update nav links
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Back home button (from artist statements)
backHomeBtn.addEventListener('click', () => {
    themesSection.style.display = 'block';
    poemsDisplay.classList.add('hidden');
    artistStatementsDisplay.classList.add('hidden');
    currentThemeIndex = -1;
    
    // Update nav links
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Previous theme button
prevThemeBtn.addEventListener('click', () => {
    if (currentThemeIndex > 0) {
        const prevTheme = themeCardsArray[currentThemeIndex - 1];
        navigateToTheme(prevTheme);
    }
});

// Next theme button
nextThemeBtn.addEventListener('click', () => {
    if (currentThemeIndex < themeCardsArray.length - 1) {
        const nextTheme = themeCardsArray[currentThemeIndex + 1];
        navigateToTheme(nextTheme);
    }
});

// Helper function to navigate to a theme
function navigateToTheme(theme) {
    currentThemeIndex = themeCardsArray.indexOf(theme);
    
    // Hide all category sections
    categorySections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected category
    const categorySection = document.getElementById(theme);
    if (categorySection) {
        categorySection.classList.add('active');
    }
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper function to update navigation buttons
function updateNavigationButtons() {
    // Update previous button
    if (currentThemeIndex <= 0) {
        prevThemeBtn.classList.add('disabled');
        prevThemeBtn.disabled = true;
    } else {
        prevThemeBtn.classList.remove('disabled');
        prevThemeBtn.disabled = false;
    }
    
    // Update next button
    if (currentThemeIndex >= themeCardsArray.length - 1) {
        nextThemeBtn.classList.add('disabled');
        nextThemeBtn.disabled = true;
    } else {
        nextThemeBtn.classList.remove('disabled');
        nextThemeBtn.disabled = false;
    }
}

// "Read the collection" button - navigate to first theme (Societal Expectations)
const readBtn = document.getElementById('readBtn');
if (readBtn) {
    readBtn.addEventListener('click', () => {
        const firstTheme = themeCardsArray[0]; // 'kindred' - Societal Expectations
        currentThemeIndex = 0;
        
        // Hide themes section and show poems display
        themesSection.style.display = 'none';
        poemsDisplay.classList.remove('hidden');
        artistStatementsDisplay.classList.add('hidden');
        
        // Show navigation buttons when viewing poems
        prevThemeBtn.style.display = 'block';
        nextThemeBtn.style.display = 'block';
        
        // Hide all category sections
        categorySections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected category
        const categorySection = document.getElementById(firstTheme);
        if (categorySection) {
            categorySection.classList.add('active');
        }
        
        // Update nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// "Artist's statement" button
const statementBtn = document.getElementById('statementBtn');
if (statementBtn) {
    statementBtn.addEventListener('click', () => {
        // Show artist statements page
        themesSection.style.display = 'none';
        poemsDisplay.classList.add('hidden');
        artistStatementsDisplay.classList.remove('hidden');
        currentThemeIndex = -1;
        
        // Update nav links
        navLinks.forEach(link => link.classList.remove('active'));
        const artistStatementsLink = document.querySelector('a[href="#artist-statements"]');
        if (artistStatementsLink) {
            artistStatementsLink.classList.add('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
