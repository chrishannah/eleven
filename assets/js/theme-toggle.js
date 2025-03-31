// Theme toggle functionality
const themeToggle = {
    init() {
        this.theme = localStorage.getItem('theme') || 'auto';
        this.applyTheme();
        this.setupToggles();
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

    setupToggles() {
        const buttons = document.querySelectorAll('.theme-option');
        if (!buttons.length) return;

        // Set initial state
        this.updateToggleState();

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.theme = button.dataset.theme;
                this.applyTheme();
                this.updateToggleState();
            });
        });
    },

    updateToggleState() {
        const buttons = document.querySelectorAll('.theme-option');
        if (!buttons.length) return;

        buttons.forEach(button => {
            if (button.dataset.theme === this.theme) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
};

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => themeToggle.init());
