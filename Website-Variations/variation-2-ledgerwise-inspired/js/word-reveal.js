/**
 * Word Reveal - Progressive Text Reveal on Scroll
 * Words fade in one by one as user scrolls DOWN
 */

(function() {
    'use strict';
    
    if (!window.ScrollAnimations) {
        console.error('❌ ScrollAnimations not loaded! Cannot initialize word reveal.');
        return;
    }
    
    const { interpolate, prefersReducedMotion } = window.ScrollAnimations;
    
    // Get word reveal section
    const wordRevealSection = document.querySelector('[data-scroll-section="word-reveal"]');
    
    if (!wordRevealSection) {
        console.warn('⚠️ Word reveal section not found');
        return;
    }
    
    const revealWords = wordRevealSection.querySelectorAll('.reveal-word');
    const subtitle = wordRevealSection.querySelector('.reveal-subtitle');
    const dotGrid = document.querySelector('.dot-grid-overlay');
    
    if (revealWords.length === 0) {
        console.warn('⚠️ No reveal words found');
        return;
    }
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
        revealWords.forEach(word => {
            word.style.opacity = '1';
        });
        if (subtitle) subtitle.style.opacity = '1';
        if (dotGrid) dotGrid.style.opacity = '0';
        console.log('⏸️ Word reveal disabled (prefers-reduced-motion)');
        return;
    }
    
    // Create scroll tracker
    const tracker = new window.ScrollAnimations.ScrollProgressTracker(wordRevealSection, {
        start: 'start end',
        end: 'end start'
    });
    
    const totalWords = revealWords.length;
    console.log('📝 Tracking', totalWords, 'words for reveal');
    
    // Update on scroll
    tracker.onChange((progress) => {
        // Set flag for debug panel
        window._wordRevealCallbackCalled = true;
        
        // Clamp progress
        progress = Math.max(0, Math.min(1, progress));
        
        // Debug: Log progress occasionally
        if (Math.random() < 0.02) { // Log ~2% of the time
            console.log('📊 Word reveal progress:', (progress * 100).toFixed(1) + '%, first word will be:', (progress < 0.1 ? 0.2 : (progress >= 0.15 ? 1.0 : 'transitioning')));
        }
        
        // Subtitle: Fade IN from 0 to 1 (0-10% scroll)
        if (subtitle) {
            const subOpacity = Math.min(1, progress * 10);
            subtitle.style.opacity = subOpacity;
        }
        
        // Dot grid: Fade IN to 0.5, stay visible
        if (dotGrid) {
            let dotOpacity;
            if (progress < 0.15) {
                dotOpacity = (progress / 0.15) * 0.5;
            } else if (progress > 0.85) {
                dotOpacity = Math.max(0, 0.5 - ((progress - 0.85) / 0.15) * 0.5);
            } else {
                dotOpacity = 0.5;
            }
            dotGrid.style.opacity = dotOpacity;
        }
        
        // Words: Progressive reveal from 0.2 to 1.0
        // Reveal window: 10% to 60% of scroll progress
        const START = 0.1;
        const END = 0.6;
        const RANGE = END - START;
        
        revealWords.forEach((word, index) => {
            // Each word gets a portion of the reveal range
            const wordStartProgress = START + (index / totalWords) * RANGE;
            const wordEndProgress = wordStartProgress + (RANGE / totalWords);
            
            let opacity;
            
            if (progress < wordStartProgress) {
                // Before this word - dim
                opacity = 0.2;
            } else if (progress >= wordEndProgress) {
                // After this word - bright and STAY
                opacity = 1.0;
            } else {
                // During reveal - interpolate
                const wordProgress = (progress - wordStartProgress) / (wordEndProgress - wordStartProgress);
                opacity = 0.2 + (wordProgress * 0.8); // 0.2 to 1.0
            }
            
            // IMPORTANT: Ensure we're setting increasing opacity as progress increases
            word.style.opacity = opacity.toFixed(2);
            
            // Debug first word
            if (index === 0 && Math.random() < 0.05) {
                console.log('First word at progress', (progress * 100).toFixed(1) + '%, opacity:', opacity.toFixed(2));
            }
        });
    });
    
    console.log('✨ Word reveal initialized:', totalWords, 'words');
})();
