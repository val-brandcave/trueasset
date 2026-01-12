/**
 * Word Reveal - COMPLETELY REWRITTEN
 * SIMPLE LOGIC: Scroll DOWN = Words get BRIGHTER (0.2 → 1.0)
 * Version: 2026-01-09-v3 (16:30)
 */

(function() {
    'use strict';
    
    console.log('🔄 Word Reveal Loading - Version: 2026-01-09-v3 (16:30)');
    
    if (!window.ScrollAnimations) {
        console.error('❌ ScrollAnimations not loaded!');
        return;
    }
    
    const wordRevealSection = document.querySelector('[data-scroll-section="word-reveal"]');
    if (!wordRevealSection) {
        console.warn('⚠️ Word reveal section not found');
        return;
    }
    
    const revealWords = Array.from(document.querySelectorAll('.reveal-word')).filter(w => w);
    const subtitle = document.querySelector('.reveal-subtitle');
    const dotGrid = document.querySelector('.dot-grid-overlay');
    
    if (revealWords.length === 0) {
        console.warn('⚠️ No reveal words found');
        return;
    }
    
    console.log('📝 Found', revealWords.length, 'words to reveal');
    
    // Skip if reduced motion
    if (window.ScrollAnimations.prefersReducedMotion()) {
        revealWords.forEach(word => word.style.opacity = '1');
        if (subtitle) subtitle.style.opacity = '1';
        console.log('⏸️ Animations disabled (reduced motion)');
        return;
    }
    
    // Set initial word opacity to DIM using !important
    revealWords.forEach((word, index) => {
        word.style.setProperty('opacity', '0.2', 'important');
        word.dataset.wordIndex = index;
    });
    
    if (subtitle) {
        subtitle.style.setProperty('opacity', '0', 'important');
    }
    
    if (dotGrid) {
        dotGrid.style.setProperty('opacity', '0', 'important');
    }
    
    console.log('🎨 Set all', revealWords.length, 'words to initial opacity: 0.2 (DIM) with !important');
    
    // Create tracker
    // FIXED: Changed offsets so progress goes 0→1 as you scroll DOWN
    const tracker = new window.ScrollAnimations.ScrollProgressTracker(wordRevealSection, {
        start: 'start start',  // When section top hits viewport top (entering)
        end: 'end end'         // When section bottom hits viewport bottom (exiting)
    });
    
    const TOTAL_WORDS = revealWords.length;
    
    // Main update function
    tracker.onChange((scrollProgress) => {
        // Set flag for debug
        window._wordRevealCallbackCalled = true;
        window._lastScrollProgress = scrollProgress;
        
        // Clamp
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Subtitle: Fade IN when section settling in view - starts at 30%
        if (subtitle) {
            let subOpacity;
            if (scrollProgress < 0.30) {
                subOpacity = 0;
            } else if (scrollProgress < 0.45) {
                subOpacity = (scrollProgress - 0.30) / 0.15; // 0 to 1 over 30-45%
            } else {
                subOpacity = 1;
            }
            subtitle.style.setProperty('opacity', Math.min(1, Math.max(0, subOpacity)).toFixed(2), 'important');
        }
        
        // Dot grid: Fade IN and stay visible longer (40-98%)
        if (dotGrid) {
            let gridOpacity = 0;
            if (scrollProgress < 0.40) {
                gridOpacity = 0;
            } else if (scrollProgress < 0.50) {
                gridOpacity = ((scrollProgress - 0.40) / 0.10) * 0.65; // 0 to 0.65 over 40-50%
            } else if (scrollProgress > 0.98) {
                gridOpacity = Math.max(0, 0.65 * (1 - ((scrollProgress - 0.98) / 0.02)));
            } else {
                gridOpacity = 0.65; // Stay at 0.65 until 98% (more prominent)
            }
            dotGrid.style.setProperty('opacity', gridOpacity.toFixed(2), 'important');
        }
        
        // WORDS: Reveal from 50% to 90% of scroll (text centered, actively scrolling through)
        // LOGIC: Higher scroll progress = Higher opacity (BRIGHTER)
        const REVEAL_START = 0.50;  // Text centered in viewport
        const REVEAL_END = 0.90;    // Complete near end
        const REVEAL_RANGE = REVEAL_END - REVEAL_START;
        
        revealWords.forEach((word, wordIndex) => {
            // Each word gets an equal slice of the reveal range
            const wordRevealStart = REVEAL_START + (wordIndex / TOTAL_WORDS) * REVEAL_RANGE;
            const wordRevealEnd = REVEAL_START + ((wordIndex + 1) / TOTAL_WORDS) * REVEAL_RANGE;
            
            let opacity;
            
            // SIMPLE STATE MACHINE:
            if (scrollProgress < wordRevealStart) {
                // Not there yet - DIM
                opacity = 0.2;
            } else if (scrollProgress >= wordRevealEnd) {
                // Already passed - BRIGHT
                opacity = 1.0;
            } else {
                // In between - TRANSITIONING from 0.2 to 1.0
                const progressThroughWord = (scrollProgress - wordRevealStart) / (wordRevealEnd - wordRevealStart);
                opacity = 0.2 + (progressThroughWord * 0.8);
            }
            
            // Set opacity with !important via style.setProperty
            word.style.setProperty('opacity', opacity.toFixed(2), 'important');
            
            // Debug first and last words occasionally
            if (wordIndex === 0 && Math.random() < 0.1) {
                console.log(`📍 Word 0 (first): progress=${(scrollProgress*100).toFixed(1)}%, start=${(wordRevealStart*100).toFixed(1)}%, end=${(wordRevealEnd*100).toFixed(1)}%, setting opacity to ${opacity.toFixed(2)}`);
            }
            if (wordIndex === TOTAL_WORDS - 1 && Math.random() < 0.1) {
                console.log(`📍 Word ${TOTAL_WORDS-1} (last): progress=${(scrollProgress*100).toFixed(1)}%, opacity=${opacity.toFixed(2)}`);
            }
        });
    });
    
    console.log('✅ Word reveal initialized - Version 2026-01-09-v3');
})();
