// Theme Toggle - Light/Dark/Auto
(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';

    // Get stored preference or default to 'auto'
    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButtons(theme);
    }

    // Update toggle button states
    function updateToggleButtons(activeTheme) {
        document.querySelectorAll('.theme-toggle button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === activeTheme);
        });
    }

    // Save preference and apply theme
    function setTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
    }

    // Initialize on page load
    function init() {
        const theme = getStoredTheme();
        applyTheme(theme);

        // Add click handlers to toggle buttons
        document.querySelectorAll('.theme-toggle button').forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(btn.dataset.theme);
            });
        });
    }

    // Run immediately if DOM ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
