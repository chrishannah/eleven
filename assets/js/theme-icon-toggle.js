// Theme icon toggle functionality
const themeIconToggle = {
    init() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.applyTheme();
        this.createIconToggle();
    },

    applyTheme() {
        const root = document.documentElement;
        root.setAttribute('data-theme', this.theme);
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
            this.toggleTheme();
            this.updateIcon(svg);
        });

        // Add keyboard event
        iconToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
                this.updateIcon(svg);
            }
        });

        // Add the icon to the toggle
        iconToggle.appendChild(svg);

        // Add the toggle to the page
        document.body.appendChild(iconToggle);
    },

    toggleTheme() {
        // Toggle between light and dark
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    },

    updateIcon(svg) {
        // Clear existing paths
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        if (this.theme === 'light') {
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
