/**
 * Force Theme Script
 * This script ensures a consistent theme (dark) across all browsers
 * regardless of user's system preferences or browser settings
 */

(function() {
    // Function to force dark theme
    function forceDarkTheme() {
        // Add dark theme class to HTML element
        document.documentElement.classList.remove('light-theme');
        document.documentElement.classList.add('dark-theme');
        
        // Set data attribute for frameworks that might use it
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark'); // For Bootstrap 5
        
        // Override any prefers-color-scheme media query
        const style = document.createElement('style');
        style.textContent = `
            /* Override any prefers-color-scheme media queries */
            @media (prefers-color-scheme: light) {
                :root {
                    /* Force dark theme colors */
                    --background-color: #121212 !important;
                    --text-color: #ffffff !important;
                    --primary-bg: #121212 !important;
                    --secondary-bg: #1e1e1e !important;
                    --primary-text: #ffffff !important;
                    --secondary-text: #e0e0e0 !important;
                }
                
                body {
                    background-color: #121212 !important;
                    color: #ffffff !important;
                }
            }
            
            /* Ensure dark theme is applied regardless of system preference */
            :root {
                /* Force dark theme colors */
                --background-color: #121212 !important;
                --text-color: #ffffff !important;
                --primary-bg: #121212 !important;
                --secondary-bg: #1e1e1e !important;
                --primary-text: #ffffff !important;
                --secondary-text: #e0e0e0 !important;
            }
            
            body {
                background-color: #121212 !important;
                color: #ffffff !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Run immediately
    forceDarkTheme();
    
    // Also run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceDarkTheme);
    }
    
    // Run again after window load to override any scripts that might change theme
    window.addEventListener('load', forceDarkTheme);
    
    // Override any attempts to change theme later
    const originalSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value) {
        // Intercept attempts to change theme
        if ((name === 'class' && (value.includes('light-theme') || !value.includes('dark-theme'))) ||
            (name === 'data-theme' && value !== 'dark') ||
            (name === 'data-bs-theme' && value !== 'dark')) {
            // Allow the call but then immediately restore dark theme
            originalSetAttribute.call(this, name, value);
            forceDarkTheme();
            return;
        }
        originalSetAttribute.call(this, name, value);
    };
})();