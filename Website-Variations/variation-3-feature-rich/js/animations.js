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
        // Set initial state FIRST (before setting up animation)
        integrationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Then set up the reveal animation
        new ScrollAnimations.IntersectionAnimation(integrationCards, {
            threshold: 0.1,  // Lower threshold so it triggers earlier
            stagger: 80,
            animationClass: 'revealed',
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }
        });
        
        // Fallback: If animation system fails, show cards after 500ms
        setTimeout(() => {
            integrationCards.forEach(card => {
                if (card.style.opacity === '0') {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
            });
        }, 500);
    }
    
    // Section headers scroll reveal
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length > 0) {
        // Set initial state FIRST
        sectionHeaders.forEach(header => {
            header.style.opacity = '0';
            header.style.transform = 'translateY(20px)';
            header.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Then set up reveal animation with lower threshold
        new ScrollAnimations.IntersectionAnimation(sectionHeaders, {
            threshold: 0.1,  // Lower threshold to trigger earlier
            once: true,
            onReveal: (element) => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Fallback: Ensure section headers are visible after 500ms
        setTimeout(() => {
            sectionHeaders.forEach(header => {
                if (header.style.opacity === '0') {
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                }
            });
        }, 500);
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
    
    // Hero visual - no parallax (translateY = 0)
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = 'translateY(0)';
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
    
    // Data visualization parallax effect
    const dataVizBackground = document.querySelector('.data-viz-background');
    const lineChart = document.querySelector('.viz-line-chart');
    const barChart = document.querySelector('.viz-bar-chart');
    const pieChart = document.querySelector('.viz-pie-chart');
    const dataPoints = document.querySelectorAll('.data-point-float');
    
    if (dataVizBackground) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            function updateDataVizParallax() {
                const heroRect = heroSection.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1, -heroRect.top / heroRect.height));
                
                // Different parallax speeds for each element
                if (lineChart) {
                    const lineY = scrollProgress * 30;
                    lineChart.style.transform = `translateY(${lineY}px)`;
                }
                
                if (barChart) {
                    const barY = scrollProgress * 50;
                    barChart.style.transform = `translateY(${barY}px)`;
                }
                
                if (pieChart) {
                    const pieY = scrollProgress * 40;
                    const pieRotate = scrollProgress * 20;
                    pieChart.style.transform = `translateY(${pieY}px) rotate(${pieRotate}deg)`;
                }
                
                // Floating points move at different speeds
                dataPoints.forEach((point, index) => {
                    const speed = 20 + (index * 10);
                    const y = scrollProgress * speed;
                    point.style.transform = `translate(${point.style.transform?.match(/translate\(([^,]+)/)?.[1] || '0'}, ${y}px)`;
                });
                
                // Fade out as hero exits
                const fadeOut = Math.max(0, 1 - scrollProgress * 1.5);
                dataVizBackground.style.opacity = fadeOut * 0.7;
                
                requestAnimationFrame(updateDataVizParallax);
            }
            
            requestAnimationFrame(updateDataVizParallax);
            console.log('✅ Data visualization parallax initialized');
        }
    }
    
    console.log('✨ Animations initialized');
})();
