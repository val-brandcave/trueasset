/**
 * Animations - Scroll-triggered reveals and number counters
 * Enhanced with scroll animation system
 */

(function() {
    'use strict';
    
    const { ScrollAnimations } = window;
    
    // Scroll-triggered animations for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0 && ScrollAnimations) {
        // Add initial hidden state FIRST
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Convert to array for IntersectionAnimation
        const featureCardsArray = Array.from(featureCards);
        
        new ScrollAnimations.IntersectionAnimation(featureCardsArray, {
            threshold: 0.15,
            stagger: 100,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    } else {
        // Fallback if ScrollAnimations not loaded - show cards
        featureCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }
    
    // Scroll-triggered animations for solution cards
    const solutionCards = document.querySelectorAll('.solution-card');
    if (solutionCards.length > 0 && ScrollAnimations) {
        // Add initial hidden state FIRST
        solutionCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95) translateY(20px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Convert to array
        const solutionCardsArray = Array.from(solutionCards);
        
        new ScrollAnimations.IntersectionAnimation(solutionCardsArray, {
            threshold: 0.15,
            stagger: 150,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1) translateY(0)';
            }
        });
    } else {
        // Fallback if ScrollAnimations not loaded - show cards
        solutionCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        });
    }
    
    // Number counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Find and animate stat numbers when they come into view
    const statNumbers = document.querySelectorAll('[data-stat-number]');
    if (statNumbers.length > 0 && ScrollAnimations) {
        new ScrollAnimations.IntersectionAnimation(statNumbers, {
            threshold: 0.5,
            once: true,
            onReveal: (element) => {
                const target = parseInt(element.dataset.statNumber);
                if (!isNaN(target)) {
                    animateCounter(element, target);
                }
            }
        });
    }
    
    // Floating card animations (hero section)
    const floatingCards = document.querySelectorAll('.floating-card');
    if (floatingCards.length > 0) {
        // Already have CSS animation, just make sure they're visible
        floatingCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    // Hero section - keep visible always
    const heroSection = document.querySelector('.hero');
    const heroContent = heroSection ? heroSection.querySelector('.hero-content') : null;
    const heroText = heroSection ? heroSection.querySelector('.hero-text') : null;
    
    // Force hero to stay visible
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'scale(1)';
    }
    if (heroText) {
        heroText.style.opacity = '1';
    }
    
    // Disable parallax that was hiding hero
    // Can re-enable with different settings later if needed
    
    // Section headers fade-in animations
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length > 0 && ScrollAnimations) {
        // Set initial state FIRST
        sectionHeaders.forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(30px)';
            header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Convert to array
        const headersArray = Array.from(sectionHeaders);
        
        new ScrollAnimations.IntersectionAnimation(headersArray, {
            threshold: 0.2,
            once: true,
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    } else {
        // Fallback - show headers
        sectionHeaders.forEach(header => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        });
    }
    
    // Check list items animation
    const checkItems = document.querySelectorAll('.check-item');
    if (checkItems.length > 0 && ScrollAnimations) {
        // Initial state FIRST
        checkItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Convert to array
        const checkItemsArray = Array.from(checkItems);
        
        new ScrollAnimations.IntersectionAnimation(checkItemsArray, {
            threshold: 0.3,
            stagger: 80,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }
        });
    } else {
        // Fallback
        checkItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        });
    }
    
    // Compliance logos animation
    const complianceLogos = document.querySelectorAll('.compliance-logo');
    if (complianceLogos.length > 0 && ScrollAnimations) {
        // Initial state FIRST
        complianceLogos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.8)';
            logo.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Convert to array
        const logosArray = Array.from(complianceLogos);
        
        new ScrollAnimations.IntersectionAnimation(logosArray, {
            threshold: 0.2,
            stagger: 100,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
    } else {
        // Fallback
        complianceLogos.forEach(logo => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        });
    }
    
    console.log('✨ Animations initialized');
})();
