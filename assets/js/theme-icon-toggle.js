// Theme icon toggle functionality
const themeIconToggle = {
    init() {
        this.theme = localStorage.getItem('theme') || 'auto';
        this.applyTheme();
        this.createIconToggle();
    },

    applyTheme() {
        const root = document.documentElement;
        if (this.theme === 'auto') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', this.theme);
        }
        localStorage.setItem('theme', this.theme);
    },

    createIconToggle() {
        // Create the icon toggle element
        const iconToggle = document.createElement('div');
        iconToggle.className = 'theme-icon-toggle';
        iconToggle.setAttribute('aria-label', 'Toggle theme');
        iconToggle.setAttribute('role', 'button');
        iconToggle.setAttribute('tabindex', '0');

        // Create the SVG icon
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');

        // Create initial icon based on current theme
        this.updateIcon(svg);

        // Add click event
        iconToggle.addEventListener('click', () => {
            this.cycleTheme();
            this.updateIcon(svg);
        });

        // Add keyboard event
        iconToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.cycleTheme();
                this.updateIcon(svg);
            }
        });

        // Add the icon to the toggle
        iconToggle.appendChild(svg);

        // Add the toggle to the page
        document.body.appendChild(iconToggle);
    },

    cycleTheme() {
        // Cycle through themes: auto -> light -> dark -> auto
        if (this.theme === 'auto') {
            this.theme = 'light';
        } else if (this.theme === 'light') {
            this.theme = 'dark';
        } else {
            this.theme = 'auto';
        }

        this.applyTheme();
    },

    updateIcon(svg) {
        // Clear existing paths
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        if (this.theme === 'auto') {
            // Auto theme icon (settings gear)
            const gear = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            gear.setAttribute('d', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z');
            svg.appendChild(gear);

            const gearTeeth = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            gearTeeth.setAttribute('d', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z');
            svg.appendChild(gearTeeth);

        } else if (this.theme === 'light') {
            // Light theme icon (sun)
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', '12');
            circle.setAttribute('cy', '12');
            circle.setAttribute('r', '5');
            const rays = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            rays.setAttribute('d', 'M12 1v2m0 18v2M4 12H2m20 0h-2m-2.05-6.95l-1.41 1.41M5.46 18.54l-1.41 1.41m0-14l1.41 1.41m11.08 11.08l1.41 1.41');
            svg.appendChild(circle);
            svg.appendChild(rays);
        } else {
            // Dark theme icon (moon)
            const moonPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            moonPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
            svg.appendChild(moonPath);
        }
    }
};

// Initialize theme icon toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => themeIconToggle.init());
