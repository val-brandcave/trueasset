/**
 * Word Reveal - Simplified (No Debug Panel)
 * Subtitle visible, grid when centered, words brighten when centered
 */

(function() {
    'use strict';
    
    console.log('🔄 Word Reveal v11 - No debug panel');
    
    if (!window.ScrollAnimations) {
        console.error('❌ ScrollAnimations not loaded!');
        return;
    }
    
    const wordRevealSection = document.querySelector('[data-scroll-section="word-reveal"]');
    if (!wordRevealSection) return;
    
    const revealWords = Array.from(document.querySelectorAll('.reveal-word'));
    const subtitle = document.querySelector('.reveal-subtitle');
    const dotGrid = document.querySelector('.dot-grid-overlay');
    const stickyWrapper = document.querySelector('.word-reveal-sticky');
    
    if (revealWords.length === 0) return;
    
    // Set initial state
    revealWords.forEach((word, index) => {
        word.style.setProperty('opacity', '0.2', 'important');
        word.dataset.wordIndex = index;
    });
    
    if (subtitle) {
        subtitle.style.setProperty('opacity', '1', 'important');
    }
    
    if (dotGrid) {
        dotGrid.style.setProperty('opacity', '0', 'important');
    }
    
    console.log('✅ Word reveal initialized:', revealWords.length, 'words');
    
    // Animation loop
    let sectionCenteredAt = null;
    
    function updateAnimation() {
        const scrollY = window.scrollY || window.pageYOffset;
        const sectionRect = wordRevealSection.getBoundingClientRect();
        const sectionHeight = wordRevealSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        
        const stickyRect = stickyWrapper ? stickyWrapper.getBoundingClientRect() : null;
        const stickyWrapperCenter = stickyRect ? stickyRect.top + (stickyRect.height / 2) : 999;
        const isContentCentered = Math.abs(stickyWrapperCenter - viewportCenter) < 100;
        
        // Calculate progress
        const scrollableRange = sectionHeight - viewportHeight;
        const scrolled = -sectionRect.top;
        const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableRange));
        
        // Track first centered detection
        if (isContentCentered && !sectionCenteredAt) {
            sectionCenteredAt = scrollProgress;
            console.log(`🎯 Content centered at ${(scrollProgress * 100).toFixed(1)}%`);
        }
        
        const centerPoint = sectionCenteredAt || 0.30;
        
        // === GRID: Show only when centered ===
        if (dotGrid) {
            const gridOpacity = isContentCentered ? 0.5 : 0;
            dotGrid.style.setProperty('opacity', gridOpacity.toFixed(3), 'important');
        }
        
        // === WORDS: Brighten when centered ===
        const REVEAL_START = centerPoint + 0.02;
        const REVEAL_END = 0.85;
        const REVEAL_RANGE = Math.max(0.1, REVEAL_END - REVEAL_START);
        const TOTAL_WORDS = revealWords.length;
        
        revealWords.forEach((word, wordIndex) => {
            const wordRevealStart = REVEAL_START + (wordIndex / TOTAL_WORDS) * REVEAL_RANGE;
            const wordRevealEnd = REVEAL_START + ((wordIndex + 1) / TOTAL_WORDS) * REVEAL_RANGE;
            
            let opacity;
            if (scrollProgress < wordRevealStart) {
                opacity = 0.2;
            } else if (scrollProgress >= wordRevealEnd) {
                opacity = 1.0;
            } else {
                const progressThroughWord = (scrollProgress - wordRevealStart) / (wordRevealEnd - wordRevealStart);
                opacity = 0.2 + (progressThroughWord * 0.8);
            }
            
            word.style.setProperty('opacity', opacity.toFixed(3), 'important');
        });
        
        requestAnimationFrame(updateAnimation);
    }
    
    requestAnimationFrame(updateAnimation);
    console.log('✅ Word reveal animation started');
})();
