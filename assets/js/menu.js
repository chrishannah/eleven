document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;
    let overlay;

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', closeMenu);
    }

    function openMenu() {
        nav.classList.add('menu-open');
        body.style.overflow = 'hidden';
        if (!overlay) {
            createOverlay();
        }
        overlay.classList.add('active');
    }

    function closeMenu() {
        nav.classList.remove('menu-open');
        body.style.overflow = '';
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    menuToggle.addEventListener('click', () => {
        if (nav.classList.contains('menu-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
            closeMenu();
        }
    });
});
