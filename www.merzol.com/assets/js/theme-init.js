/**
 * Theme Initialization Script
 * This script runs before any other scripts to ensure dark theme is applied immediately
 */

// Immediately-invoked function expression to avoid polluting global scope
(function() {
    // Apply dark theme class to HTML element immediately
    document.documentElement.classList.remove('light-theme', 'light', 'theme-light');
    document.documentElement.classList.add('dark-theme', 'dark', 'theme-dark');
    
    // Set data attributes for frameworks that use them
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    
    // Create and inject a style element with critical dark theme styles
    const style = document.createElement('style');
    style.textContent = `
        /* Critical dark theme styles */
        :root {
            --background-color: #121212 !important;
            --text-color: #ffffff !important;
            --primary-bg: #121212 !important;
            --secondary-bg: #1e1e1e !important;
            --primary-text: #ffffff !important;
            --secondary-text: #e0e0e0 !important;
            color-scheme: dark !important;
        }
        
        html, body {
            background-color: #121212 !important;
            color: #ffffff !important;
        }
        
        /* Override any prefers-color-scheme media queries */
        @media (prefers-color-scheme: light) {
            :root {
                --background-color: #121212 !important;
                --text-color: #ffffff !important;
            }
            
            html, body {
                background-color: #121212 !important;
                color: #ffffff !important;
            }
        }
    `;
    
    // Insert the style element at the beginning of the head
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
    } else {
        head.appendChild(style);
    }
    
    // Override matchMedia for prefers-color-scheme before any scripts can use it
    if (window.matchMedia) {
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = function(query) {
            if (query.includes('prefers-color-scheme: light')) {
                return {
                    matches: false,
                    media: query,
                    onchange: null,
                    addListener: function() {},
                    removeListener: function() {},
                    addEventListener: function() {},
                    removeEventListener: function() {},
                    dispatchEvent: function() { return true; }
                };
            } else if (query.includes('prefers-color-scheme: dark')) {
                return {
                    matches: true,
                    media: query,
                    onchange: null,
                    addListener: function() {},
                    removeListener: function() {},
                    addEventListener: function() {},
                    removeEventListener: function() {},
                    dispatchEvent: function() { return true; }
                };
            }
            return originalMatchMedia.call(window, query);
        };
    }
    
    // Set a flag to indicate dark theme is enforced
    window.__DARK_THEME_ENFORCED__ = true;
})();