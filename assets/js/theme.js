/**
 * Theme Toggle Functionality for Merzol Website
 * Handles switching between light and dark themes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    createThemeToggle();
    
    // Initialize theme based on user preference or system preference
    initializeTheme();
    
    // Add 3D animation classes to elements
    add3DEffects();
    
    // Initialize scroll-based dissolve transitions
    initScrollDissolveEffects();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

/**
 * Creates and appends the theme toggle button to the header
 */
function createThemeToggle() {
    // Create toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('title', 'Toggle Light/Dark Theme');
    
    // Add sun and moon icons
    const sunIcon = document.createElement('i');
    sunIcon.className = 'fas fa-sun';
    
    const moonIcon = document.createElement('i');
    moonIcon.className = 'fas fa-moon';
    
    // Append icons to toggle
    themeToggle.appendChild(sunIcon);
    themeToggle.appendChild(moonIcon);
    
    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Find a suitable place in the header to append the toggle
    const headerRight = document.querySelector('.xb-header-right');
    if (headerRight) {
        // Create a container for the toggle to fit the header style
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'xb-header-btn theme-toggle-container';
        toggleContainer.appendChild(themeToggle);
        
        // Insert before the first child or append if empty
        if (headerRight.firstChild) {
            headerRight.insertBefore(toggleContainer, headerRight.firstChild);
        } else {
            headerRight.appendChild(toggleContainer);
        }
    }
}

/**
 * Initializes the theme based on user preference or system preference
 */
function initializeTheme() {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('merzol-theme');
    
    if (savedTheme) {
        // Apply saved theme
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-theme', prefersDark);
        
        // Save the initial theme preference
        localStorage.setItem('merzol-theme', prefersDark ? 'dark' : 'light');
    }
    
    // Update theme-specific elements
    updateThemeElements();
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    // Toggle the dark-theme class on the body
    document.body.classList.toggle('dark-theme');
    
    // Determine the current theme
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Save the theme preference
    localStorage.setItem('merzol-theme', isDarkTheme ? 'dark' : 'light');
    
    // Update theme-specific elements
    updateThemeElements();
    
    // Add a brief animation to indicate theme change
    animateThemeChange();
}

/**
 * Updates elements that need specific changes when theme changes
 */
function updateThemeElements() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    // Update logo if needed (assuming there might be different logos for different themes)
    const logo = document.querySelector('.xb-header-logo img');
    if (logo) {
        // You can set different logo sources for different themes if needed
        // logo.src = isDarkTheme ? 'dark-logo-path.png' : 'light-logo-path.png';
    }
    
    // Update hero section background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundImage = isDarkTheme ? 
            'linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.9) 100%)' : 
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.9) 100%)';
    }
    
    // Update feature cards with theme-specific styles
    const featureWraps = document.querySelectorAll('.feature-wrap');
    featureWraps.forEach(card => {
        if (isDarkTheme) {
            card.style.backgroundColor = 'rgba(30, 30, 40, 0.8)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)';
        } else {
            card.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Update feature icons with theme-specific colors
    const featureIcons = document.querySelectorAll('.xb-item--feature-icon');
    featureIcons.forEach(icon => {
        icon.style.filter = isDarkTheme ? 'brightness(0.8) saturate(1.2)' : 'none';
    });
    
    // Update accordion items with theme-specific styles
    const accordionItems = document.querySelectorAll('.accordion_box .accordion');
    accordionItems.forEach(item => {
        if (isDarkTheme) {
            item.style.backgroundColor = 'rgba(30, 30, 40, 0.8)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            item.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Update buttons with theme-specific styles
    const buttons = document.querySelectorAll('.them-btn');
    buttons.forEach(button => {
        if (isDarkTheme) {
            button.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.3)';
        } else {
            button.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.2)';
        }
    });
    
    // Update ASR section with enhanced background
    updateASRSection(isDarkTheme);
}

/**
 * Adds a brief animation to indicate theme change
 */
function animateThemeChange() {
    // Create a flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(flash);
    
    // Trigger animation
    setTimeout(() => {
        flash.style.opacity = '0.5';
        
        setTimeout(() => {
            flash.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 300);
        }, 300);
    }, 0);
}

/**
 * Updates the ASR section with dynamic visual background and enhanced hover effects
 * @param {boolean} isDarkTheme - Whether the current theme is dark
 */
function updateASRSection(isDarkTheme) {
    // Find the ASR section (the first feature-wrap with voice-recognition.png)
    const asrSections = document.querySelectorAll('.feature-wrap');
    let asrSection = null;
    
    asrSections.forEach(section => {
        const img = section.querySelector('img[src*="voice-recognition.png"]');
        if (img) {
            asrSection = section;
        }
    });
    
    if (!asrSection) return; // ASR section not found
    
    // Add a dynamic background to the ASR section
    asrSection.style.position = 'relative';
    asrSection.style.overflow = 'hidden';
    
    // Create or update the dynamic background
    let dynamicBg = asrSection.querySelector('.dynamic-asr-bg');
    
    if (!dynamicBg) {
        dynamicBg = document.createElement('div');
        dynamicBg.className = 'dynamic-asr-bg';
        dynamicBg.style.position = 'absolute';
        dynamicBg.style.top = '0';
        dynamicBg.style.left = '0';
        dynamicBg.style.width = '100%';
        dynamicBg.style.height = '100%';
        dynamicBg.style.zIndex = '-1';
        dynamicBg.style.opacity = '0.4';
        dynamicBg.style.transition = 'all 0.5s ease';
        
        // Create sound wave animation elements
        for (let i = 0; i < 5; i++) {
            const wave = document.createElement('div');
            wave.className = 'sound-wave';
            wave.style.position = 'absolute';
            wave.style.borderRadius = '50%';
            wave.style.border = '2px solid rgba(255, 0, 0, 0.5)';
            wave.style.width = (i * 20 + 10) + 'px';
            wave.style.height = (i * 20 + 10) + 'px';
            wave.style.top = '50%';
            wave.style.right = '25%';
            wave.style.transform = 'translate(50%, -50%)';
            wave.style.opacity = '0';
            wave.style.animation = `wave-animation ${1 + i * 0.2}s infinite ease-out ${i * 0.2}s`;
            
            dynamicBg.appendChild(wave);
        }
        
        asrSection.appendChild(dynamicBg);
        
        // Add keyframes for wave animation if not already added
        if (!document.querySelector('#wave-animation-keyframes')) {
            const style = document.createElement('style');
            style.id = 'wave-animation-keyframes';
            style.textContent = `
                @keyframes wave-animation {
                    0% {
                        opacity: 0.7;
                        transform: translate(50%, -50%) scale(0.1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(50%, -50%) scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Update the background based on theme
    if (isDarkTheme) {
        dynamicBg.style.background = 'radial-gradient(circle at right, rgba(60, 0, 0, 0.4) 0%, rgba(30, 30, 40, 0) 70%)';
        
        // Update wave colors for dark theme
        const waves = dynamicBg.querySelectorAll('.sound-wave');
        waves.forEach(wave => {
            wave.style.borderColor = 'rgba(255, 50, 50, 0.3)';
        });
    } else {
        dynamicBg.style.background = 'radial-gradient(circle at right, rgba(255, 200, 200, 0.4) 0%, rgba(255, 255, 255, 0) 70%)';
        
        // Update wave colors for light theme
        const waves = dynamicBg.querySelectorAll('.sound-wave');
        waves.forEach(wave => {
            wave.style.borderColor = 'rgba(255, 0, 0, 0.2)';
        });
    }
    
    // Enhance the hover effect for the speech recognition icon
    const asrIcon = asrSection.querySelector('.xb-item--feature-icon');
    if (asrIcon) {
        // Remove existing event listeners by cloning and replacing
        const newIcon = asrIcon.cloneNode(true);
        asrIcon.parentNode.replaceChild(newIcon, asrIcon);
        
        // Add enhanced hover effects
        newIcon.addEventListener('mouseenter', function() {
            // Increase wave animation intensity
            const waves = dynamicBg.querySelectorAll('.sound-wave');
            waves.forEach(wave => {
                wave.style.opacity = '0.9';
                wave.style.animationDuration = '0.8s';
            });
            
            // Add pulse effect to icon
            this.style.transform = 'scale(1.1)';
            this.style.filter = 'brightness(1.2) saturate(1.5)';
            this.style.transition = 'all 0.3s ease';
            
            // Highlight the ASR section
            asrSection.style.boxShadow = isDarkTheme ? 
                '0 15px 30px rgba(255, 50, 50, 0.2), 0 5px 15px rgba(255, 50, 50, 0.1)' : 
                '0 15px 30px rgba(255, 0, 0, 0.15), 0 5px 15px rgba(255, 0, 0, 0.1)';
        });
        
        newIcon.addEventListener('mouseleave', function() {
            // Reset wave animation
            const waves = dynamicBg.querySelectorAll('.sound-wave');
            waves.forEach((wave, index) => {
                wave.style.opacity = '0';
                wave.style.animationDuration = `${1 + index * 0.2}s`;
            });
            
            // Reset icon
            this.style.transform = 'scale(1)';
            this.style.filter = isDarkTheme ? 'brightness(0.8) saturate(1.2)' : 'none';
            
            // Reset section shadow
            asrSection.style.boxShadow = isDarkTheme ? 
                '0 15px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)' : 
                '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    }
}

/**
 * Adds 3D effects and animations to various elements
 */
function add3DEffects() {
    // Add float animation to hero elements
    const heroTitle = document.querySelector('.merzolTitle');
    if (heroTitle) {
        heroTitle.classList.add('float-animation');
    }
    
    // Add 3D hover effect to cards (excluding product cards)
    const cards = document.querySelectorAll('.card:not(#our-products .card), .service-card:not(#our-products .service-card)');
    cards.forEach(card => {
        // Skip cards in the our-products section
        if (card.closest('#our-products')) {
            return;
        }
        
        // Add perspective to parent for better 3D effect
        if (card.parentElement) {
            card.parentElement.style.perspective = '1000px';
        }
        
        // Add mouse movement effect for 3D tilt
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const xRotation = 20 * ((y - rect.height / 2) / rect.height);
            const yRotation = -20 * ((x - rect.width / 2) / rect.width);
            
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(10px)`;
        });
        
        // Reset transform on mouse out
        card.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Add 3D effects to feature items (excluding our-products section)
    const featureItems = document.querySelectorAll('.xb-item--feature');
    featureItems.forEach(item => {
        // Skip items in the our-products section
        if (item.closest('#our-products')) {
            return;
        }
        
        // Add perspective to parent for better 3D effect
        if (item.parentElement) {
            item.parentElement.style.perspective = '1000px';
        }
        
        // Add float animation to feature icons
        const featureIcon = item.querySelector('.xb-item--feature-icon');
        if (featureIcon) {
            featureIcon.classList.add('float-animation');
        }
        
        // Add hover effect
        item.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const xRotation = 10 * ((y - rect.height / 2) / rect.height);
            const yRotation = -10 * ((x - rect.width / 2) / rect.width);
            
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(5px)`;
        });
        
        // Reset transform on mouse out
        item.addEventListener('mouseout', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Add 3D effects to FAQ accordion items
    const accordionItems = document.querySelectorAll('.accordion_box .accordion');
    accordionItems.forEach(item => {
        // Add perspective to parent for better 3D effect
        if (item.parentElement) {
            item.parentElement.style.perspective = '1000px';
        }
        
        // Add hover effect
        item.addEventListener('mousemove', function(e) {
            if (!this.classList.contains('active-block')) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                const xRotation = 5 * ((y - rect.height / 2) / rect.height);
                const yRotation = -5 * ((x - rect.width / 2) / rect.width);
                
                this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateZ(3px)`;
            }
        });
        
        // Reset transform on mouse out
        item.addEventListener('mouseout', function() {
            if (!this.classList.contains('active-block')) {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            }
        });
        
        // Add click effect
        item.querySelector('.acc-btn').addEventListener('click', function() {
            const accordion = this.parentElement;
            
            // If this accordion is being activated, add a special effect
            if (!accordion.classList.contains('active-block')) {
                accordion.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(5px)';
                setTimeout(() => {
                    accordion.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }, 300);
            } else {
                accordion.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            }
        });
    });
    
    // Add 3D effect to buttons
    const buttons = document.querySelectorAll('.them-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(255, 0, 0, 0.2)';
        });
    });
    
    // Ensure product cards in our-products section have no 3D effects
    const productCards = document.querySelectorAll('#our-products .service-card');
    productCards.forEach(card => {
        card.style.transform = 'none';
        card.style.transition = 'none';
    });
}

/**
 * Initializes scroll-based dissolve transitions between sections
 */
function initScrollDissolveEffects() {
    // Select all main sections to apply the effect
    const sections = document.querySelectorAll('section, .hero, .xb-footer-bottom');
    
    // Initial setup - hide all sections except the first visible one and the products section
    sections.forEach((section, index) => {
        // Skip the first section and the products section
        if (index > 0 && section.id !== 'our-products') {
            // Add a class for the transition effect
            section.classList.add('dissolve-section');
            // Set initial opacity
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        } else if (section.id === 'our-products') {
            // Ensure the products section and its children have no animations
            section.style.opacity = '1';
            section.style.transform = 'none';
            
            // Make sure all product cards have no animations
            const productCards = section.querySelectorAll('.service-card');
            productCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
            });
        }
    });
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When a section enters the viewport
            if (entry.isIntersecting) {
                // Fade in the section
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Optional: Stop observing after it's been revealed
                // observer.unobserve(entry.target);
            } else {
                // Optional: Fade out when leaving viewport for parallax-like effect
                // Uncomment if you want sections to fade out when scrolling away
                // entry.target.style.opacity = '0';
                // entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // trigger when 10% of the element is visible
        rootMargin: '-50px 0px' // trigger slightly before the element enters the viewport
    });
    
    // Start observing each section
    sections.forEach((section, index) => {
        // Skip the first section which is already visible and the products section
        if (index > 0 && section.id !== 'our-products') {
            observer.observe(section);
        }
    });
}

/**
 * Initializes smooth scrolling with easing animations
 */
function initSmoothScrolling() {
    // Select all internal links (that point to an ID)
    const internalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the target position with offset for fixed header
                const headerOffset = 100; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Smooth scroll with easing
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // For browsers that don't support smooth scrolling natively
                // or if you want custom easing, use jQuery with easing plugin
                if (typeof jQuery !== 'undefined' && jQuery.easing) {
                    jQuery('html, body').animate({
                        scrollTop: offsetPosition
                    }, 1000, 'easeInOutCubic'); // You can change the easing function
                }
            }
        });
    });
}