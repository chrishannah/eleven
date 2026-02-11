// Theme Toggle - Light/Dark/Auto + Dynamic Colors
(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';
    const DYNAMIC_KEY = 'dynamic-colors';

    // Get stored preference or default to 'auto'
    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    // Resolve the effective color mode (light or dark) for a given theme setting
    function resolveColorMode(theme) {
        if (theme === 'light' || theme === 'dark') return theme;
        // 'auto' — check system preference
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // Sync Miniroll embed iframe theme
    function syncMinirollTheme(theme) {
        var iframe = document.querySelector('.blogroll-content iframe');
        if (!iframe || !iframe.src) return;
        var url = new URL(iframe.src);
        url.searchParams.set('color_mode', resolveColorMode(theme));
        iframe.src = url.toString();
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButtons(theme);
    }

    // Update toggle button states (only theme buttons, not dynamic)
    function updateToggleButtons(activeTheme) {
        document.querySelectorAll('.theme-toggle button[data-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === activeTheme);
        });
    }

    // Apply or remove dynamic color overrides
    function applyDynamic(on) {
        var p = window.__colorPalette;
        if (!p) return;
        var s = document.documentElement.style;
        if (on) {
            if (p.mutedLight) s.setProperty('--text', 'rgb(' + p.mutedLight + ')');
            if (p.muted) s.setProperty('--text-muted', 'rgb(' + p.muted + ')');
            if (p.vibrant) {
                s.setProperty('--accent', 'rgb(' + p.vibrant + ')');
                s.setProperty('--hover-bg', 'rgba(' + p.vibrant + ',0.1)');
            }
            if (p.vibrantDark) s.setProperty('--border', 'rgba(' + p.vibrantDark + ',0.3)');
        } else {
            s.removeProperty('--text');
            s.removeProperty('--text-muted');
            s.removeProperty('--accent');
            s.removeProperty('--hover-bg');
            s.removeProperty('--border');
        }
        // Update dynamic button state
        document.querySelectorAll('.dynamic-toggle').forEach(btn => {
            btn.classList.toggle('active', on);
        });
    }

    // Toggle dynamic colors on/off
    function toggleDynamic() {
        var current = localStorage.getItem(DYNAMIC_KEY) === 'on';
        var next = !current;
        localStorage.setItem(DYNAMIC_KEY, next ? 'on' : 'off');
        applyDynamic(next);
    }

    // Save preference and apply theme
    function setTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
        syncMinirollTheme(theme);
    }

    // Initialize on page load
    function init() {
        const theme = getStoredTheme();
        applyTheme(theme);

        // Add click handlers to theme toggle buttons
        document.querySelectorAll('.theme-toggle button[data-theme]').forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(btn.dataset.theme);
            });
        });

        // Add click handlers to dynamic toggle buttons
        document.querySelectorAll('.dynamic-toggle').forEach(btn => {
            btn.addEventListener('click', toggleDynamic);
        });

        // Apply stored dynamic state
        applyDynamic(localStorage.getItem(DYNAMIC_KEY) === 'on');
    }

    // Run immediately if DOM ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
