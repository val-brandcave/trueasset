/**
 * Debug Helper - Temporary file to diagnose scroll behavior
 * Add this to HTML temporarily: <script src="js/debug-helper.js"></script>
 */

(function() {
    'use strict';
    
    // Create debug overlay
    const debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 11px;
        z-index: 99999;
        max-width: 320px;
        line-height: 1.5;
    `;
    document.body.appendChild(debugPanel);
    
    // Add version timestamp
    const versionTag = document.createElement('div');
    versionTag.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: monospace;
        font-size: 10px;
        z-index: 99999;
        font-weight: bold;
    `;
    versionTag.textContent = 'v2026-01-09-17:25-LATER';
    document.body.appendChild(versionTag);
    
    // Track scroll progress
    const wordRevealSection = document.querySelector('[data-scroll-section="word-reveal"]');
    
    if (!wordRevealSection) {
        debugPanel.innerHTML = '❌ Word reveal section not found';
        return;
    }
    
    const firstWord = document.querySelector('.reveal-word');
    const lastWord = document.querySelectorAll('.reveal-word')[18]; // Last word
    const allWords = document.querySelectorAll('.reveal-word');
    
    function updateDebug() {
        const rect = wordRevealSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate section position relative to viewport
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionHeight = rect.height;
        
        // Calculate scroll progress (rough estimate)
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
        
        // Get computed opacities
        const firstOpacity = firstWord ? window.getComputedStyle(firstWord).opacity : 'N/A';
        const lastOpacity = lastWord ? window.getComputedStyle(lastWord).opacity : 'N/A';
        
        // Check if callback is being called
        const callbackStatus = window._wordRevealCallbackCalled ? '✅ Yes' : '❌ No';
        const lastProgress = window._lastScrollProgress || 0;
        
        // Calculate what progressThroughWord would be for first word (updated values)
        const TOTAL_WORDS = 19;
        const REVEAL_START = 0.50;  // Updated to match word-reveal-FIXED.js
        const REVEAL_END = 0.90;    // Updated to match word-reveal-FIXED.js
        const REVEAL_RANGE = REVEAL_END - REVEAL_START;
        const wordRevealStart = REVEAL_START + (0 / TOTAL_WORDS) * REVEAL_RANGE;
        const wordRevealEnd = REVEAL_START + ((0 + 1) / TOTAL_WORDS) * REVEAL_RANGE;
        const progressThroughWord = (lastProgress - wordRevealStart) / (wordRevealEnd - wordRevealStart);
        
        // Calculate expected opacity at this progress
        let expectedFirstOpacity = 0.2;
        if (progress >= 0.1) {
            if (progress >= 0.6 / 19 + 0.1) {
                expectedFirstOpacity = 1.0;
            } else {
                const t = (progress - 0.1) / (0.5 / 19);
                expectedFirstOpacity = 0.2 + (t * 0.8);
            }
        }
        
        const info = `
            <strong style="color: #3399FF;">Debug Info:</strong><br><br>
            Section Top: ${sectionTop.toFixed(0)}px<br>
            Section Bottom: ${sectionBottom.toFixed(0)}px<br>
            Section Height: ${sectionHeight.toFixed(0)}px<br>
            <br>
            <strong>Scroll Progress: ${(lastProgress * 100).toFixed(1)}%</strong><br>
            <br>
            <strong style="color: ${firstOpacity === expectedFirstOpacity.toFixed(1) ? '#10B981' : '#EF4444'};">
            First Word Opacity: ${firstOpacity}</strong><br>
            Last Word Opacity: ${lastOpacity}<br>
            <br>
            Expected First: ${expectedFirstOpacity.toFixed(2)}<br>
            Callback Called: ${callbackStatus}<br>
            <br>
            <strong style="color: ${progressThroughWord < 0 ? '#EF4444' : '#10B981'};">
            progressThroughWord: ${progressThroughWord.toFixed(3)}</strong><br>
            ${progressThroughWord < 0 ? '<strong style="color: #EF4444;">⚠️ NEGATIVE! This is the bug!</strong>' : ''}<br>
            <br>
            Word 0 Start: ${(wordRevealStart * 100).toFixed(1)}%<br>
            Word 0 End: ${(wordRevealEnd * 100).toFixed(1)}%<br>
            <br>
            <strong>Expected at ${(lastProgress * 100).toFixed(0)}%:</strong><br>
            ${lastProgress < 0.1 ? '- Words should be 0.2' : ''}
            ${lastProgress >= 0.1 && lastProgress < 0.3 ? '- First word brightening...' : ''}
            ${lastProgress >= 0.3 ? '- First word should be 1.0' : ''}
            ${lastProgress >= 0.6 ? '- ALL words should be 1.0' : ''}
            <br>
            <small>Scroll up/down to see values change</small>
        `;
        
        debugPanel.innerHTML = info;
    }
    
    // Update on scroll
    let rafId;
    window.addEventListener('scroll', () => {
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                updateDebug();
                rafId = null;
            });
        }
    }, { passive: true });
    
    // Initial update
    updateDebug();
    
    console.log('🐛 Debug helper active - check top right corner');
})();
