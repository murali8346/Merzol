/**
 * Merzol.js - Combined JavaScript functionality
 * This file combines optimized.js, theme.js, and wow-minimal.js
 * with jQuery dependency removed
 */

// Disabled WOW Animation functionality
(function(global) {
  var WOW = function(options) {
    // Empty constructor
  };

  WOW.prototype.init = function() {
    // Do nothing
  };

  WOW.prototype.start = function() {
    // Do nothing
  };

  WOW.prototype.scrollHandler = function() {
    // Do nothing
  };

  WOW.prototype.applyStyle = function(elements) {
    // Do nothing
  };

  WOW.prototype.isVisible = function(element) {
    return false;
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
 * Updates elements with white background styles
 */
function updateThemeElements() {
    // Update hero section background with white background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundColor = '#ffffff';
        heroSection.style.backgroundImage = 'none';
    }
    
    // Update feature cards with white background
    const featureWraps = document.querySelectorAll('.feature-wrap');
    featureWraps.forEach(card => {
        card.style.backgroundColor = '#ffffff';
        card.style.boxShadow = 'none';
        card.style.border = '1px solid #e0e0e0';
    });
    
    // Update feature icons with no filters
    const featureIcons = document.querySelectorAll('.xb-item--feature-icon');
    featureIcons.forEach(icon => {
        icon.style.filter = 'none';
    });
    
    // Update accordion items with white background
    const accordionItems = document.querySelectorAll('.accordion_box .accordion');
    accordionItems.forEach(item => {
        item.style.backgroundColor = '#ffffff';
        item.style.boxShadow = 'none';
        item.style.border = '1px solid #e0e0e0';
    });
    
    // Update buttons with no shadow
    const buttons = document.querySelectorAll('.them-btn');
    buttons.forEach(button => {
        button.style.boxShadow = 'none';
        button.style.border = '1px solid #e0e0e0';
    });
}

// ASR section update function removed

/**
 * Disabled 3D animation effects
 */
function add3DEffects() {
    // All animations disabled
}

/**
 * Initializes scroll-based dissolve transitions between sections
 */
function initScrollDissolveEffects() {
    // All scroll effects disabled
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
    // All WOW animations disabled
    
    // Remove wow classes from all elements
    const wowElements = document.querySelectorAll('.wow');
    wowElements.forEach(element => {
        element.classList.remove('wow', 'animated');
    });
}