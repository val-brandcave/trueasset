/**
 * Variation 3 - Hero Scroll Animation
 * Simple fade-out for app, fade-in for video, with background gradient
 */

(function() {
    'use strict';
    
    console.log('🎬 Variation 3 - Hero scroll animation');
    
    const { ScrollAnimations } = window;
    if (!ScrollAnimations) return;
    
    const { interpolate, prefersReducedMotion } = ScrollAnimations;
    if (prefersReducedMotion()) return;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const productMain = document.querySelector('.product-main');
    const videoModal = document.getElementById('video-modal');
    
    // Create gradient overlay for animation
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'hero-gradient-overlay';
    gradientOverlay.setAttribute('aria-hidden', 'true');
    heroSection.insertBefore(gradientOverlay, heroSection.firstChild);
    
    console.log('✅ Hero scroll elements ready');
    
    // Animation loop
    function updateHeroScroll() {
        const heroRect = heroSection.getBoundingClientRect();
        const heroHeight = heroSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate progress through hero section
        const scrolled = -heroRect.top;
        const scrollableDistance = heroHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
        
        // === APP MOCKUP: Fade out 0-30% (no scaling) ===
        if (productMain) {
            const appOpacity = Math.max(0, Math.min(1, interpolate(progress, [0, 0.30], [1, 0])));
            productMain.style.opacity = appOpacity;
        }
        
        // === BACKGROUND GRADIENT: Animate while app is visible ===
        if (gradientOverlay) {
            let gradientOpacity = 0;
            
            if (progress >= 0.05 && progress < 0.15) {
                // Fade in
                gradientOpacity = interpolate(progress, [0.05, 0.15], [0, 1]);
            } else if (progress >= 0.15 && progress <= 0.30) {
                // Hold while app fades
                gradientOpacity = 1;
            } else if (progress > 0.30 && progress <= 0.40) {
                // Fade out
                gradientOpacity = Math.max(0, interpolate(progress, [0.30, 0.40], [1, 0]));
            } else {
                gradientOpacity = 0;
            }
            
            gradientOverlay.style.opacity = gradientOpacity;
        }
        
        // Log occasionally
        if (Math.random() < 0.02) {
            console.log(`Hero: ${(progress * 100).toFixed(1)}% | App: ${productMain ? productMain.style.opacity : 'N/A'}`);
        }
        
        requestAnimationFrame(updateHeroScroll);
    }
    
    requestAnimationFrame(updateHeroScroll);
    console.log('✅ Hero scroll animation started');
})();
