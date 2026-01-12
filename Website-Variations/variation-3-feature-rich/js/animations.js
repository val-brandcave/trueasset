/**
 * Animations - Scroll-triggered reveals and interactions
 * Enhanced with scroll animation system
 */

(function() {
    'use strict';
    
    const { ScrollAnimations } = window;
    
    if (!ScrollAnimations) {
        console.warn('Scroll animation system not loaded');
        return;
    }
    
    // Feature cards scroll reveal
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        new ScrollAnimations.IntersectionAnimation(featureCards, {
            threshold: 0.2,
            stagger: 100,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Set initial state
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // Integration cards scroll reveal
    const integrationCards = document.querySelectorAll('.integration-card');
    if (integrationCards.length > 0) {
        new ScrollAnimations.IntersectionAnimation(integrationCards, {
            threshold: 0.2,
            stagger: 80,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        // Set initial state
        integrationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // Section headers scroll reveal
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length > 0) {
        new ScrollAnimations.IntersectionAnimation(sectionHeaders, {
            threshold: 0.3,
            once: true,
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Set initial state
        sectionHeaders.forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // Stats counter animation
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length > 0) {
        function animateCounter(element, targetText) {
            const hasPercent = targetText.includes('%');
            const hasPlus = targetText.includes('+');
            const target = parseInt(targetText.replace(/[^\d]/g, ''));
            
            if (isNaN(target)) return;
            
            let current = 0;
            const duration = 2000;
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = targetText;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(current);
                    element.textContent = displayValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
                }
            }, 16);
        }
        
        new ScrollAnimations.IntersectionAnimation(statValues, {
            threshold: 0.5,
            once: true,
            onReveal: (element) => {
                const targetText = element.dataset.statValue || element.textContent;
                element.dataset.statValue = targetText; // Store original value
                animateCounter(element, targetText);
            }
        });
    }
    
    // Product overlays hover effect
    const productOverlays = document.querySelectorAll('.product-overlay');
    productOverlays.forEach(overlay => {
        overlay.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0) scale(1.05)';
        });
        
        overlay.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Hero parallax effect (subtle)
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const tracker = new ScrollAnimations.ScrollProgressTracker(heroSection, {
                start: 'start start',
                end: 'end start'
            });
            
            tracker.onChange((progress) => {
                const translateY = progress * 50;
                heroVisual.style.transform = `translateY(${translateY}px)`;
            });
        }
    }
    
    // CTA section fade-in
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        new ScrollAnimations.IntersectionAnimation([ctaSection], {
            threshold: 0.3,
            once: true,
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(30px)';
        ctaSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    console.log('✨ Animations initialized');
})();
