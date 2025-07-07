/**
 * Merzol.js - Combined JavaScript functionality
 * This file combines optimized.js, theme.js, and wow-minimal.js
 * with jQuery dependency removed
 */

// WOW Animation functionality (from wow-minimal.js)
(function(global) {
  var WOW = function(options) {
    this.options = options || {};
    this.boxClass = this.options.boxClass || 'wow';
    this.animateClass = this.options.animateClass || 'animated';
    this.offset = this.options.offset || 0;
    this.mobile = this.options.mobile !== undefined ? this.options.mobile : true;
    this.live = this.options.live !== undefined ? this.options.live : true;
    this.started = false;
  };

  WOW.prototype.init = function() {
    if (!this.mobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return;
    }

    this.start();
  };

  WOW.prototype.start = function() {
    var self = this;
    this.started = true;

    var elements = document.querySelectorAll('.' + this.boxClass);
    this.applyStyle(elements);

    if (this.live) {
      // Monitor for new elements with the boxClass
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          Array.prototype.forEach.call(mutation.addedNodes, function(node) {
            if (node.nodeType === 1) { // Element node
              if (node.classList.contains(self.boxClass)) {
                self.applyStyle([node]);
              }
              
              // Check children
              var children = node.querySelectorAll('.' + self.boxClass);
              if (children.length > 0) {
                self.applyStyle(children);
              }
            }
          });
        });
      });

      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
    }

    // Add scroll event listener
    window.addEventListener('scroll', this.scrollHandler.bind(this));
    // Initial check
    this.scrollHandler();
  };

  WOW.prototype.scrollHandler = function() {
    var elements = document.querySelectorAll('.' + this.boxClass + ':not(.' + this.animateClass + ')');
    this.applyStyle(elements);
  };

  WOW.prototype.applyStyle = function(elements) {
    var self = this;
    Array.prototype.forEach.call(elements, function(element) {
      if (self.isVisible(element)) {
        element.classList.add(self.animateClass);
      }
    });
  };

  WOW.prototype.isVisible = function(element) {
    var rect = element.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    var offset = this.offset;
    
    return (rect.top <= viewHeight - offset && rect.bottom >= 0);
  };

  // Export to global
  global.WOW = WOW;

})(window);

// Theme functionality (from theme.js)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize light theme
    initializeLightTheme();
    
    // Add 3D animation classes to elements
    add3DEffects();
    
    // Initialize scroll-based dissolve transitions
    initScrollDissolveEffects();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
});

/**
 * Initializes the light theme for the website
 */
function initializeLightTheme() {
    // Ensure light theme is applied
    document.body.classList.add('light-theme');
    
    // Save the light theme preference
    localStorage.setItem('merzol-theme', 'light');
    
    // Update theme-specific elements for light theme
    updateThemeElements(false);
}

/**
 * Updates elements with light theme styles
 */
function updateThemeElements() {
    // Update hero section background with light theme gradient
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundImage = 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.9) 100%)';
    }
    
    // Update feature cards with light theme styles
    const featureWraps = document.querySelectorAll('.feature-wrap');
    featureWraps.forEach(card => {
        card.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)';
    });
    
    // Update feature icons with light theme colors
    const featureIcons = document.querySelectorAll('.xb-item--feature-icon');
    featureIcons.forEach(icon => {
        icon.style.filter = 'none';
    });
    
    // Update accordion items with light theme styles
    const accordionItems = document.querySelectorAll('.accordion_box .accordion');
    accordionItems.forEach(item => {
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    // Update buttons with light theme styles
    const buttons = document.querySelectorAll('.them-btn');
    buttons.forEach(button => {
        button.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.2)';
    });
    
    // Update ASR section with enhanced background
    updateASRSection();
}

/**
 * Updates the ASR section with dynamic visual background and enhanced hover effects for light theme
 */
function updateASRSection() {
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
            wave.style.border = '2px solid rgba(231, 76, 60, 0.5)';
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
    
    // Set light theme background
    dynamicBg.style.background = 'radial-gradient(circle at right, rgba(173, 216, 230, 0.4) 0%, rgba(255, 255, 255, 0) 70%)';
    
    // Set wave colors for light theme
    const waves = dynamicBg.querySelectorAll('.sound-wave');
    waves.forEach(wave => {
        wave.style.borderColor = 'rgba(231, 76, 60, 0.2)';
    });
    
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
            asrSection.style.boxShadow = '0 15px 30px rgba(231, 76, 60, 0.15), 0 5px 15px rgba(231, 76, 60, 0.1)';
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
            this.style.filter = 'none';
            
            // Reset section shadow
            asrSection.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)';
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
        const accBtn = item.querySelector('.acc-btn');
        if (accBtn) {
            accBtn.addEventListener('click', function() {
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
        }
    });
    
    // Add 3D effect to buttons
    const buttons = document.querySelectorAll('.them-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(231, 76, 60, 0.3)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(231, 76, 60, 0.2)';
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
                
                // Use native smooth scrolling
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Optimized functionality (from optimized.js, rewritten without jQuery)
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const preloader = document.querySelector('.preloader');
    const backtotop = document.querySelector('.xb-backtotop');
    const stricky = document.querySelector('.stricky');
    const headerSearchBtn = document.querySelector(".header-search-btn");
    const headerSearchForm = document.querySelector(".header-search-form-wrapper");
    const searchClose = document.querySelector(".xb-search-close");
    const bodyOverlay = document.querySelector('.body-overlay');
    const sidebarMenuClose = document.querySelector('.sidebar-menu-close');
    const offcanvasSidebar = document.querySelector('.offcanvas-sidebar');
    const offcanvasSidebarBtn = document.querySelector('.offcanvas-sidebar-btn');
    const navMobile = document.querySelector(".xb-nav-mobile");
    const headerMenu = document.querySelector('.xb-header-menu');
    const menuClose = document.querySelector(".xb-menu-close");
    const headerMenuBackdrop = document.querySelector(".xb-header-menu-backdrop");

    // Load event handlers
    window.addEventListener('load', function() {
        preloaderFade();
        wowAnimation();
    });

    // Preloader function
    function preloaderFade() {
        if (preloader) {
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // Back to top functionality
    window.addEventListener('scroll', function() {
        if (backtotop) {
            if (window.scrollY > 500) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
            }
        }
    });

    // Scroll to top when clicking the scroll button
    const scrollButtons = document.querySelectorAll(".scroll");
    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Sticky header implementation
    if (stricky) {
        const strickyClone = stricky.cloneNode(true);
        strickyClone.classList.add('stricked-menu');
        strickyClone.classList.remove('original');
        stricky.classList.add('original');
        stricky.after(strickyClone);
        
        const strickedMenu = document.querySelector('.stricked-menu');
        
        window.addEventListener('scroll', function() {
            if (strickedMenu) {
                const headerScrollPos = 100;
                if (window.scrollY > headerScrollPos) {
                    strickedMenu.classList.add('stricky-fixed');
                } else if (window.scrollY <= headerScrollPos) {
                    strickedMenu.classList.remove('stricky-fixed');
                }
            }
        });
    }

    // Header search functionality
    if (headerSearchBtn && headerSearchForm) {
        headerSearchBtn.addEventListener("click", function(e) {
            e.preventDefault();
            headerSearchForm.classList.add("open");
            const searchInput = headerSearchForm.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
            if (bodyOverlay) {
                bodyOverlay.classList.add('active');
            }
        });
    }

    if (searchClose) {
        searchClose.addEventListener("click", function(e) {
            e.preventDefault();
            if (headerSearchForm) {
                headerSearchForm.classList.remove("open");
            }
            document.body.classList.remove("active");
            if (bodyOverlay) {
                bodyOverlay.classList.remove('active');
            }
        });
    }

    // Sidebar functionality
    if (sidebarMenuClose && bodyOverlay) {
        sidebarMenuClose.addEventListener('click', function() {
            if (offcanvasSidebar) {
                offcanvasSidebar.classList.remove('active');
            }
            bodyOverlay.classList.remove('active');
        });
        
        bodyOverlay.addEventListener('click', function() {
            if (offcanvasSidebar) {
                offcanvasSidebar.classList.remove('active');
            }
            bodyOverlay.classList.remove('active');
        });
    }

    if (offcanvasSidebarBtn && bodyOverlay) {
        offcanvasSidebarBtn.addEventListener('click', function() {
            if (offcanvasSidebar) {
                offcanvasSidebar.classList.add('active');
            }
            bodyOverlay.classList.add('active');
        });
    }

    if (bodyOverlay) {
        bodyOverlay.addEventListener('click', function() {
            this.classList.remove('active');
            if (headerSearchForm) {
                headerSearchForm.classList.remove("open");
            }
        });
    }

    // Mobile menu functionality
    const navHiddenItems = document.querySelectorAll('.xb-nav-hidden li.menu-item-has-children > a');
    navHiddenItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'xb-menu-toggle';
        item.appendChild(span);
    });

    const menuItems = document.querySelectorAll('.xb-header-menu li.menu-item-has-children, .xb-menu-primary li.menu-item-has-children');
    menuItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'xb-menu-toggle';
        item.appendChild(span);
    });

    // Add event delegation for menu toggle clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('xb-menu-toggle')) {
            const menuToggle = e.target;
            const closestUl = menuToggle.closest('ul');
            const closestMenuItem = menuToggle.closest('.menu-item');
            const subMenu = closestMenuItem.querySelector('.sub-menu');

            if (closestUl && !menuToggle.classList.contains('active')) {
                const activeToggles = closestUl.querySelectorAll('.xb-menu-toggle.active');
                activeToggles.forEach(toggle => {
                    toggle.classList.remove('active');
                });

                const activeSubMenus = closestUl.querySelectorAll('.sub-menu.active');
                activeSubMenus.forEach(menu => {
                    menu.classList.remove('active');
                    menu.style.display = 'none';
                });
            }

            menuToggle.classList.toggle('active');
            if (subMenu) {
                subMenu.classList.toggle('active');
                if (subMenu.classList.contains('active')) {
                    subMenu.style.display = 'block';
                } else {
                    subMenu.style.display = 'none';
                }
            }
        }
    });

    if (navMobile) {
        navMobile.addEventListener('click', function() {
            this.classList.toggle('active');
            if (headerMenu) {
                headerMenu.classList.toggle('active');
            }
        });
    }

    if (menuClose && headerMenuBackdrop) {
        menuClose.addEventListener('click', function() {
            this.classList.remove('active');
            if (headerMenu) {
                headerMenu.classList.remove('active');
            }
        });

        headerMenuBackdrop.addEventListener('click', function() {
            this.classList.remove('active');
            if (headerMenu) {
                headerMenu.classList.remove('active');
            }
        });
    }

    // Background and color handling
    const bgElements = document.querySelectorAll('[data-background]');
    bgElements.forEach(element => {
        element.style.backgroundImage = `url(${element.getAttribute("data-background")})`;
    });

    const colorElements = document.querySelectorAll('[data-bg-color]');
    colorElements.forEach(element => {
        element.style.backgroundColor = element.getAttribute("data-bg-color");
    });

    // Counter functionality - optimized version
    const counterElements = document.querySelectorAll(".xbo");
    if (counterElements.length > 0) {
        // Use IntersectionObserver for better performance
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        const countNumber = counter.getAttribute("data-count");
                        counter.innerHTML = countNumber;
                    }
                    // Unobserve after counting
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe all counter elements
        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
        
        window.xboOptions = {
            format: 'd',
        };
    }

    // Add page load performance improvements
    // Defer non-critical CSS
    const deferredStyles = document.querySelectorAll('link[rel="stylesheet"][data-defer="true"]');
    if (deferredStyles.length > 0) {
        deferredStyles.forEach(style => {
            style.setAttribute('rel', 'stylesheet');
        });
    }

    // Lazy load images that are not in viewport
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// WOW animation function (from optimized.js)
function wowAnimation() {
    // Remove any wow classes from our-products section before initializing WOW
    const productsSection = document.getElementById('our-products');
    if (productsSection) {
        // Remove wow classes from the section itself
        productsSection.classList.remove('wow', 'animated');
        
        // Remove wow classes from all child elements
        const productElements = productsSection.querySelectorAll('*');
        productElements.forEach(element => {
            element.classList.remove('wow', 'animated');
            
            // Ensure no animations are applied
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.animation = 'none';
        });
    }
    
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    wow.init();
}