/**
 * Flip Cards - 3D Card Flip Animations
 * Handles hover, click, and keyboard interactions for flip cards
 */

(function() {
    'use strict';
    
    const { ScrollAnimations } = window;
    const { prefersReducedMotion } = ScrollAnimations;
    
    // Get all flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    const promisesSection = document.querySelector('[data-scroll-section="promises"]');
    
    if (flipCards.length === 0) return;
    
    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion()) {
        // Show back content immediately on mobile
        flipCards.forEach(card => {
            card.classList.add('flipped');
        });
        console.log('⏸️ Flip card animations disabled (prefers-reduced-motion)');
        return;
    }
    
    // Initialize each flip card
    flipCards.forEach((card, index) => {
        let isFlipped = false;
        
        // Mouse enter - flip card
        card.addEventListener('mouseenter', () => {
            if (!isFlipped) {
                card.classList.add('flipped');
                isFlipped = true;
            }
        });
        
        // Mouse leave - flip back
        card.addEventListener('mouseleave', () => {
            if (isFlipped) {
                card.classList.remove('flipped');
                isFlipped = false;
            }
        });
        
        // Click/Tap - toggle flip (for touch devices)
        card.addEventListener('click', () => {
            if (isFlipped) {
                card.classList.remove('flipped');
                isFlipped = false;
            } else {
                card.classList.add('flipped');
                isFlipped = true;
            }
        });
        
        // Keyboard support (Enter and Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isFlipped) {
                    card.classList.remove('flipped');
                    isFlipped = false;
                } else {
                    card.classList.add('flipped');
                    isFlipped = true;
                }
            }
        });
    });
    
    // Compliance logos ticker is always visible (CSS animation only)
    console.log('✅ Flip cards ready');
    
    console.log('✨ Flip cards initialized:', flipCards.length);
})();
