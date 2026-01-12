/**
 * Scroll Reveals - Fade in animations for cards
 */

(function() {
    'use strict';
    
    if (!window.ScrollAnimations) {
        console.warn('ScrollAnimations not loaded');
        return;
    }
    
    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        new window.ScrollAnimations.IntersectionAnimation(Array.from(featureCards), {
            threshold: 0.15,
            stagger: 100,
            animationClass: 'revealed'
        });
    }
    
    // Customer cards
    const customerCards = document.querySelectorAll('.customer-card');
    if (customerCards.length > 0) {
        new window.ScrollAnimations.IntersectionAnimation(Array.from(customerCards), {
            threshold: 0.15,
            stagger: 120,
            animationClass: 'revealed'
        });
    }
    
    console.log('✅ Scroll reveals initialized');
})();
