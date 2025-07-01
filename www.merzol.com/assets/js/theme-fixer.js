/**
 * Theme Fixer Script
 * This script runs after the page loads to detect and fix any theme-related issues
 */

(function() {
    // Function to fix theme issues
    function fixThemeIssues() {
        // Get all elements in the document
        const allElements = document.querySelectorAll('*');
        
        // Check for elements with light background or text colors
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const backgroundColor = computedStyle.backgroundColor;
            const color = computedStyle.color;
            
            // Check if background color is light (simple RGB check)
            if (isLightColor(backgroundColor)) {
                // Set to dark background
                element.style.backgroundColor = '#1e1e1e';
            }
            
            // Check if text color is dark (simple RGB check)
            if (isDarkColor(color)) {
                // Set to light text
                element.style.color = '#ffffff';
            }
        });
        
        // Force dark theme on html and body elements
        document.documentElement.style.backgroundColor = '#121212';
        document.documentElement.style.color = '#ffffff';
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
        
        // Add dark theme class to html element
        document.documentElement.classList.remove('light-theme', 'light', 'theme-light');
        document.documentElement.classList.add('dark-theme', 'dark', 'theme-dark');
        
        // Set data attributes for frameworks that use them
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    }
    
    // Helper function to check if a color is light
    function isLightColor(color) {
        // Handle rgba and rgb formats
        const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            
            // Calculate perceived brightness (ITU-R BT.709)
            const brightness = (r * 0.2126 + g * 0.7152 + b * 0.0722);
            
            // If brightness is high, it's a light color
            return brightness > 128;
        }
        
        // Handle hex format
        const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
        if (hexMatch) {
            const r = parseInt(hexMatch[1], 16);
            const g = parseInt(hexMatch[2], 16);
            const b = parseInt(hexMatch[3], 16);
            
            // Calculate perceived brightness (ITU-R BT.709)
            const brightness = (r * 0.2126 + g * 0.7152 + b * 0.0722);
            
            // If brightness is high, it's a light color
            return brightness > 128;
        }
        
        // For named colors, return true for known light colors
        const lightColors = ['white', 'ivory', 'lightyellow', 'yellow', 'lightgoldenrodyellow', 
                           'lemonchiffon', 'cornsilk', 'beige', 'lightsalmon', 'lightcoral', 
                           'lightpink', 'pink', 'peachpuff', 'moccasin', 'navajowhite', 
                           'wheat', 'bisque', 'blanchedalmond', 'papayawhip', 'antiquewhite', 
                           'linen', 'oldlace', 'seashell', 'mistyrose', 'lavenderblush', 
                           'aliceblue', 'azure', 'lightcyan', 'paleturquoise', 'aquamarine', 
                           'powderblue', 'lightblue', 'lightsteelblue', 'lightskyblue', 'skyblue', 
                           'lavender', 'thistle', 'plum', 'violet', 'orchid', 'palevioletred', 
                           'lightgreen', 'palegreen', 'honeydew', 'mintcream', 'ghostwhite', 
                           'whitesmoke', 'snow', 'floralwhite'];
        
        return lightColors.includes(color.toLowerCase());
    }
    
    // Helper function to check if a color is dark
    function isDarkColor(color) {
        // Handle rgba and rgb formats
        const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\s*\)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            
            // Calculate perceived brightness (ITU-R BT.709)
            const brightness = (r * 0.2126 + g * 0.7152 + b * 0.0722);
            
            // If brightness is low, it's a dark color
            return brightness < 128;
        }
        
        // Handle hex format
        const hexMatch = color.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
        if (hexMatch) {
            const r = parseInt(hexMatch[1], 16);
            const g = parseInt(hexMatch[2], 16);
            const b = parseInt(hexMatch[3], 16);
            
            // Calculate perceived brightness (ITU-R BT.709)
            const brightness = (r * 0.2126 + g * 0.7152 + b * 0.0722);
            
            // If brightness is low, it's a dark color
            return brightness < 128;
        }
        
        // For named colors, return true for known dark colors
        const darkColors = ['black', 'darkslategray', 'darkslategrey', 'dimgray', 'dimgrey', 
                          'slategray', 'slategrey', 'gray', 'grey', 'darkgray', 'darkgrey', 
                          'lightslategray', 'lightslategrey', 'maroon', 'darkred', 'brown', 
                          'firebrick', 'crimson', 'darkmagenta', 'darkviolet', 'darkorchid', 
                          'indigo', 'darkslateblue', 'darkblue', 'midnightblue', 'navy', 
                          'darkgreen', 'darkolivegreen', 'darkseagreen', 'darkgoldenrod', 
                          'saddlebrown', 'sienna', 'olive', 'olivedrab', 'forestgreen', 
                          'green', 'darkturquoise', 'darkcyan', 'teal', 'steelblue', 
                          'royalblue', 'mediumblue', 'darkkhaki', 'peru', 'chocolate', 
                          'rosybrown', 'indianred'];
        
        return darkColors.includes(color.toLowerCase());
    }
    
    // Run after DOM is loaded
    document.addEventListener('DOMContentLoaded', fixThemeIssues);
    
    // Run after all resources are loaded
    window.addEventListener('load', fixThemeIssues);
    
    // Run periodically to catch any dynamic changes
    setInterval(fixThemeIssues, 2000);
})();