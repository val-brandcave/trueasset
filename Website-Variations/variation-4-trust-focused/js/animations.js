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
    
    // Testimonial cards scroll reveal
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        new ScrollAnimations.IntersectionAnimation(testimonialCards, {
            threshold: 0.2,
            stagger: 150,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1) translateY(0)';
            }
        });
        
        // Set initial state
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95) translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // Trust indicators scroll reveal
    const trustIndicators = document.querySelectorAll('.trust-indicator, .security-badge');
    if (trustIndicators.length > 0) {
        new ScrollAnimations.IntersectionAnimation(trustIndicators, {
            threshold: 0.3,
            stagger: 100,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        // Set initial state
        trustIndicators.forEach(indicator => {
            indicator.style.opacity = '0';
            indicator.style.transform = 'scale(0.9)';
            indicator.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
                element.dataset.statValue = targetText;
                animateCounter(element, targetText);
            }
        });
    }
    
    // CTA section fade-in with scale
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        new ScrollAnimations.IntersectionAnimation([ctaSection], {
            threshold: 0.3,
            once: true,
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'scale(0.98)';
        ctaSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Compliance logos animation
    const complianceLogos = document.querySelectorAll('.compliance-logo');
    if (complianceLogos.length > 0) {
        new ScrollAnimations.IntersectionAnimation(complianceLogos, {
            threshold: 0.3,
            stagger: 80,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        // Set initial state
        complianceLogos.forEach(logo => {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.85)';
            logo.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    }
    
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
                const translateY = progress * 40;
                heroVisual.style.transform = `translateY(${translateY}px)`;
            });
        }
    }
    
    console.log('✨ Animations initialized (V4 Trust-Focused)');
})();
