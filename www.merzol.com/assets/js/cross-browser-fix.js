/**
 * Cross-browser compatibility fixes
 * This script addresses common cross-browser compatibility issues
 * and ensures consistent rendering across different browsers
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect browser
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    
    // Add browser-specific class to body
    const body = document.body;
    if (isIE) body.classList.add('browser-ie');
    if (isEdge) body.classList.add('browser-edge');
    if (isChrome) body.classList.add('browser-chrome');
    if (isFirefox) body.classList.add('browser-firefox');
    if (isSafari) body.classList.add('browser-safari');
    
    // Fix flexbox issues in IE and Edge
    if (isIE || isEdge) {
        const flexContainers = document.querySelectorAll('.flex-container, [class*="d-flex"], [style*="display: flex"], [style*="display:flex"]');
        flexContainers.forEach(container => {
            if (getComputedStyle(container).display.indexOf('flex') > -1) {
                // Force repaint to fix flex rendering
                container.style.display = 'block';
                setTimeout(() => {
                    container.style.display = 'flex';
                }, 0);
            }
        });
    }
    
    // Fix for grid layout in IE
    if (isIE) {
        const gridContainers = document.querySelectorAll('.grid-container, [style*="display: grid"], [style*="display:grid"]');
        gridContainers.forEach(container => {
            // Add IE-specific grid polyfill class
            container.classList.add('ie-grid-fix');
        });
    }
    
    // Fix for object-fit in IE and Edge
    if (isIE || isEdge) {
        const objectFitImages = document.querySelectorAll('img[style*="object-fit"], video[style*="object-fit"]');
        objectFitImages.forEach(img => {
            const objectFit = getComputedStyle(img).objectFit;
            if (objectFit && objectFit !== 'fill') {
                const imgUrl = img.src;
                const imgContainer = img.parentElement;
                
                // Only proceed if we have a parent and a valid src
                if (imgContainer && imgUrl) {
                    imgContainer.style.position = 'relative';
                    
                    // Set background image instead of img src
                    img.style.opacity = '0';
                    imgContainer.style.backgroundImage = `url(${imgUrl})`;
                    imgContainer.style.backgroundSize = objectFit === 'cover' ? 'cover' : 'contain';
                    imgContainer.style.backgroundPosition = 'center center';
                    imgContainer.style.backgroundRepeat = 'no-repeat';
                }
            }
        });
    }
    
    // Fix for CSS variables in IE
    if (isIE) {
        // Simple CSS variable polyfill for basic color variables
        const style = getComputedStyle(document.documentElement);
        const cssVars = {
            '--primary-color': style.getPropertyValue('--primary-color') || '#ff0000',
            '--secondary-color': style.getPropertyValue('--secondary-color') || '#000000',
            '--text-color': style.getPropertyValue('--text-color') || '#333333',
            '--light-bg': style.getPropertyValue('--light-bg') || '#ffffff',
            '--dark-bg': style.getPropertyValue('--dark-bg') || '#121212'
        };
        
        // Apply these as inline styles where needed
        document.querySelectorAll('[style*="var(--"]').forEach(el => {
            const styles = el.getAttribute('style');
            let newStyles = styles;
            
            Object.keys(cssVars).forEach(variable => {
                const regex = new RegExp(`var\\(${variable}\\)`, 'g');
                newStyles = newStyles.replace(regex, cssVars[variable]);
            });
            
            if (newStyles !== styles) {
                el.setAttribute('style', newStyles);
            }
        });
    }
    
    // Fix for sticky positioning in older browsers
    const stickyElements = document.querySelectorAll('.sticky-top, .sticky-bottom, [style*="position: sticky"], [style*="position:sticky"]');
    stickyElements.forEach(el => {
        const position = getComputedStyle(el).position;
        if (position === 'sticky' || position === '-webkit-sticky') {
            // Check if browser supports sticky
            const stickySupport = CSS.supports && (CSS.supports('position', 'sticky') || CSS.supports('position', '-webkit-sticky'));
            if (!stickySupport) {
                // Fallback to fixed with scroll event listener
                const parent = el.parentElement;
                const parentTop = parent.getBoundingClientRect().top;
                const elTop = el.getBoundingClientRect().top - parentTop;
                
                window.addEventListener('scroll', function() {
                    const scrollY = window.scrollY || window.pageYOffset;
                    if (scrollY > parentTop + elTop) {
                        el.style.position = 'fixed';
                        el.style.top = '0';
                        el.style.width = parent.offsetWidth + 'px';
                    } else {
                        el.style.position = 'relative';
                        el.style.top = 'auto';
                        el.style.width = 'auto';
                    }
                });
            }
        }
    });
    
    // Fix for interview section specifically
    const interviewSections = document.querySelectorAll('.interview-section');
    interviewSections.forEach(section => {
        // Ensure proper display mode across browsers
        section.style.display = 'block'; // Reset display
        setTimeout(() => {
            section.style.display = 'flex';
            section.style.flexDirection = 'column';
            section.style.width = '100%';
            section.style.maxWidth = '100%';
            section.style.overflow = 'hidden';
        }, 0);
        
        // Fix media elements within interview section
        const mediaElements = section.querySelectorAll('img, video');
        mediaElements.forEach(media => {
            media.style.maxWidth = '100%';
            media.style.height = 'auto';
            
            // Apply object-fit with cross-browser support
            if (isIE || isEdge) {
                const parent = media.parentElement;
                parent.style.position = 'relative';
                
                if (media.tagName.toLowerCase() === 'img' && media.src) {
                    const imgUrl = media.src;
                    media.style.opacity = '0';
                    parent.style.backgroundImage = `url(${imgUrl})`;
                    parent.style.backgroundSize = 'cover';
                    parent.style.backgroundPosition = 'center center';
                    parent.style.backgroundRepeat = 'no-repeat';
                    parent.style.width = '100%';
                    parent.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                }
            } else {
                media.style.objectFit = 'cover';
            }
        });
    });
});