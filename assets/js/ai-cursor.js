/**
 * AI Cursor Animation - Interactive AI element that follows mouse movement
 * with red color scheme and interactive effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create the AI element
    createAIElement();
    
    // Initialize mouse tracking
    initMouseTracking();
    
    // Add click interaction
    addClickInteraction();
    
    // Add scroll interaction
    addScrollInteraction();
});

/**
 * Creates the AI element and adds it to the DOM
 */
function createAIElement() {
    // Create the container
    const aiContainer = document.createElement('div');
    aiContainer.className = 'ai-cursor-container';
    aiContainer.id = 'aiCursor';
    
    // Create the AI robot element
    const aiElement = document.createElement('div');
    aiElement.className = 'ai-robot';
    
    // Create the robot face
    const robotFace = document.createElement('div');
    robotFace.className = 'robot-face';
    
    // Create robot eyes
    const leftEye = document.createElement('div');
    leftEye.className = 'robot-eye left';
    
    const rightEye = document.createElement('div');
    rightEye.className = 'robot-eye right';
    
    // Create robot antenna
    const antenna = document.createElement('div');
    antenna.className = 'robot-antenna';
    
    // Create pulse effect
    const pulse = document.createElement('div');
    pulse.className = 'pulse-effect';
    
    // Create message bubble
    const messageBubble = document.createElement('div');
    messageBubble.className = 'ai-message-bubble';
    messageBubble.textContent = 'Hello! I\'m your AI assistant';
    
    // Assemble the robot
    robotFace.appendChild(leftEye);
    robotFace.appendChild(rightEye);
    aiElement.appendChild(antenna);
    aiElement.appendChild(robotFace);
    aiElement.appendChild(pulse);
    aiElement.appendChild(messageBubble);
    aiContainer.appendChild(aiElement);
    
    // Add to the body
    document.body.appendChild(aiContainer);
    
    // Add interactive hover effect
    aiContainer.addEventListener('mouseenter', function() {
        aiElement.classList.add('hover');
        messageBubble.style.opacity = '1';
        messageBubble.style.transform = 'translateY(0) scale(1)';
    });
    
    aiContainer.addEventListener('mouseleave', function() {
        aiElement.classList.remove('hover');
        messageBubble.style.opacity = '0';
        messageBubble.style.transform = 'translateY(10px) scale(0.8)';
    });
    
    // Add interactive behavior for buttons and links
    setupInteractiveElements(messageBubble);
}

/**
 * Initializes mouse tracking for the AI element
 */
function initMouseTracking() {
    const aiCursor = document.getElementById('aiCursor');
    const aiRobot = aiCursor.querySelector('.ai-robot');
    
    // Variables for smooth movement
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const ease = 0.1; // Easing factor (lower = smoother but slower)
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Make the eyes follow the mouse
        const eyes = aiCursor.querySelectorAll('.robot-eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            // Calculate angle between eye and mouse
            const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
            
            // Move the pupil (using CSS custom property)
            eye.style.setProperty('--eye-direction', `${angle}rad`);
        });
    });
    
    // Animate the AI cursor with smooth following
    function animateAI() {
        // Calculate the distance between current position and mouse position
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        // Apply easing
        currentX += dx * ease;
        currentY += dy * ease;
        
        // Apply position with slight offset to avoid being directly under the cursor
        aiCursor.style.transform = `translate(${currentX - 25}px, ${currentY - 25}px)`;
        
        // Add slight rotation based on movement direction
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);
        aiRobot.style.transform = `rotate(${rotation}deg)`;
        
        // Continue animation
        requestAnimationFrame(animateAI);
    }
    
    // Start the animation
    animateAI();
}

/**
 * Adds click interaction to the AI element
 */
function addClickInteraction() {
    const aiRobot = document.querySelector('.ai-robot');
    
    // Add click effect to the entire document
    document.addEventListener('click', function(e) {
        // Create a click ripple effect
        const ripple = document.createElement('div');
        ripple.className = 'ai-click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        
        // Make the AI react to clicks
        aiRobot.classList.add('click-reaction');
        
        // Remove the ripple and reaction after animation completes
        setTimeout(() => {
            ripple.remove();
            aiRobot.classList.remove('click-reaction');
        }, 700);
    });
}

/**
 * Adds scroll interaction to the AI element
 */
function addScrollInteraction() {
    const aiRobot = document.querySelector('.ai-robot');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            aiRobot.classList.add('scroll-down');
            aiRobot.classList.remove('scroll-up');
        } else {
            // Scrolling up
            aiRobot.classList.add('scroll-up');
            aiRobot.classList.remove('scroll-down');
        }
        
        // Remove classes after a short delay
        clearTimeout(aiRobot.scrollTimeout);
        aiRobot.scrollTimeout = setTimeout(() => {
            aiRobot.classList.remove('scroll-up', 'scroll-down');
        }, 300);
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });
}

/**
 * Sets up interactive elements to change AI behavior when hovering over them
 * @param {HTMLElement} messageBubble - The message bubble element
 */
function setupInteractiveElements(messageBubble) {
    // Define interactive elements
    const interactiveSelectors = [
        'a', 'button', '.btn', '.theme-toggle', '.feature-wrap',
        '.xb-item--feature', '.accordion_box .accordion', '.service-card:not(#our-products .service-card)'
    ];
    
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll(interactiveSelectors.join(','));
    
    // Add hover listeners to each element
    interactiveElements.forEach(element => {
        // Custom messages based on element type
        let message = 'I can help with this!';
        
        if (element.tagName === 'A') {
            message = 'Click to navigate';
        } else if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
            message = 'Click this button';
        } else if (element.classList.contains('theme-toggle')) {
            message = 'Change theme';
        } else if (element.classList.contains('feature-wrap') || element.classList.contains('xb-item--feature')) {
            message = 'Explore this feature';
        } else if (element.classList.contains('accordion')) {
            message = 'Click to expand';
        } else if (element.classList.contains('service-card')) {
            message = 'Learn about this service';
        }
        
        // Store original message
        const originalMessage = messageBubble.textContent;
        
        // Add mouseenter event
        element.addEventListener('mouseenter', function() {
            // Update message
            messageBubble.textContent = message;
            messageBubble.style.opacity = '1';
            messageBubble.style.transform = 'translateY(0) scale(1)';
            
            // Add excited class to AI
            const aiRobot = document.querySelector('.ai-robot');
            aiRobot.classList.add('excited');
        });
        
        // Add mouseleave event
        element.addEventListener('mouseleave', function() {
            // Reset message after a short delay
            setTimeout(() => {
                messageBubble.textContent = originalMessage;
            }, 500);
            
            // Remove excited class from AI
            const aiRobot = document.querySelector('.ai-robot');
            aiRobot.classList.remove('excited');
        });
    });
}