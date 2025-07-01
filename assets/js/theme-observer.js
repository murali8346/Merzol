/**
 * Theme Observer Script
 * This script monitors for any attempts to change the theme and forces dark theme
 */

(function() {
    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'class' || 
                 mutation.attributeName === 'data-theme' || 
                 mutation.attributeName === 'data-bs-theme')) {
                
                // Check if light theme was applied
                const htmlElement = document.documentElement;
                const hasLightTheme = htmlElement.classList.contains('light-theme') || 
                                     htmlElement.getAttribute('data-theme') === 'light' || 
                                     htmlElement.getAttribute('data-bs-theme') === 'light';
                
                // If light theme was applied, force dark theme
                if (hasLightTheme) {
                    console.log('Theme change detected. Forcing dark theme.');
                    forceDarkTheme();
                }
            }
        });
    });
    
    // Function to force dark theme
    function forceDarkTheme() {
        const htmlElement = document.documentElement;
        
        // Remove light theme classes
        htmlElement.classList.remove('light-theme', 'light', 'theme-light');
        
        // Add dark theme classes
        htmlElement.classList.add('dark-theme', 'dark', 'theme-dark');
        
        // Set data attributes
        htmlElement.setAttribute('data-theme', 'dark');
        htmlElement.setAttribute('data-bs-theme', 'dark');
        
        // Force body background and text color
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
    }
    
    // Start observing the html element
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-bs-theme']
    });
    
    // Also observe the body element
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'style']
    });
    
    // Force dark theme initially
    forceDarkTheme();
    
    // Force dark theme after DOM is loaded
    document.addEventListener('DOMContentLoaded', forceDarkTheme);
    
    // Force dark theme after all resources are loaded
    window.addEventListener('load', forceDarkTheme);
    
    // Check periodically to ensure dark theme is maintained
    setInterval(forceDarkTheme, 1000);
    
    // Override localStorage to prevent theme storage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        // Intercept theme-related localStorage settings
        if (key.toLowerCase().includes('theme') && value.toLowerCase().includes('light')) {
            console.log('Prevented storing light theme preference in localStorage');
            return originalSetItem.call(this, key, 'dark');
        }
        return originalSetItem.call(this, key, value);
    };
    
    // Override CSS media query matching for prefers-color-scheme
    if (window.matchMedia) {
        const originalMatchMedia = window.matchMedia;
        window.matchMedia = function(query) {
            if (query.includes('prefers-color-scheme: light')) {
                // Return a media query list that never matches
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
                // Return a media query list that always matches
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
})();