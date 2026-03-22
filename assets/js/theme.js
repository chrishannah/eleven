// Theme Toggle - Light/Dark/Auto + Dynamic Colors
(function() {
    'use strict';

    const STORAGE_KEY = 'theme-preference';
    const DYNAMIC_KEY = 'dynamic-colors';

    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    function resolveColorMode(theme) {
        if (theme === 'light' || theme === 'dark') return theme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function syncMinirollTheme(theme) {
        var iframe = document.querySelector('.blogroll-content iframe');
        if (!iframe || !iframe.src) return;
        var url = new URL(iframe.src);
        url.searchParams.set('color_mode', resolveColorMode(theme));
        iframe.src = url.toString();
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleButtons(theme);
    }

    function updateToggleButtons(activeTheme) {
        document.querySelectorAll('.theme-toggle button[data-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === activeTheme);
        });
    }

    var dynamicProps = [
        '--text', '--text-heading', '--text-muted', '--text-body',
        '--accent', '--accent-hover', '--border', '--border-light',
        '--hover-bg', '--code-bg', '--nav-text', '--footer-dim', '--footer-text'
    ];

    function applyDynamic(on) {
        var p = window.__colorPalette;
        if (!p) return;
        var s = document.documentElement.style;
        if (on) {
            if (p.mutedLight) s.setProperty('--text', 'rgb(' + p.mutedLight + ')');
            if (p.mutedLight) s.setProperty('--text-heading', 'rgb(' + p.mutedLight + ')');
            if (p.mutedDark) s.setProperty('--text-muted', 'rgb(' + p.mutedDark + ')');
            if (p.muted) s.setProperty('--text-body', 'rgb(' + p.muted + ')');
            if (p.vibrant) {
                s.setProperty('--accent', 'rgb(' + p.vibrant + ')');
                s.setProperty('--accent-hover', 'rgb(' + p.vibrant + ')');
                s.setProperty('--hover-bg', 'rgba(' + p.vibrant + ',0.1)');
            }
            if (p.vibrantDark) {
                s.setProperty('--border', 'rgba(' + p.vibrantDark + ',0.3)');
                s.setProperty('--border-light', 'rgba(' + p.vibrantDark + ',0.15)');
                s.setProperty('--code-bg', 'rgba(' + p.vibrantDark + ',0.08)');
            }
            if (p.muted) s.setProperty('--nav-text', 'rgb(' + p.muted + ')');
            if (p.mutedDark) s.setProperty('--footer-dim', 'rgb(' + p.mutedDark + ')');
            if (p.muted) s.setProperty('--footer-text', 'rgb(' + p.muted + ')');
        } else {
            dynamicProps.forEach(function(prop) { s.removeProperty(prop); });
        }
        var link = document.getElementById('dynamic-toggle');
        if (link) {
            link.classList.toggle('active', on);
        }
    }

    function toggleDynamic(e) {
        e.preventDefault();
        var current = localStorage.getItem(DYNAMIC_KEY) === 'on';
        var next = !current;
        localStorage.setItem(DYNAMIC_KEY, next ? 'on' : 'off');
        applyDynamic(next);
    }

    function setTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
        syncMinirollTheme(theme);
    }

    function init() {
        const theme = getStoredTheme();
        applyTheme(theme);

        document.querySelectorAll('.theme-toggle button[data-theme]').forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(btn.dataset.theme);
            });
        });

        var dynamicLink = document.getElementById('dynamic-toggle');
        if (dynamicLink) {
            dynamicLink.addEventListener('click', toggleDynamic);
        }

        applyDynamic(localStorage.getItem(DYNAMIC_KEY) === 'on');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
