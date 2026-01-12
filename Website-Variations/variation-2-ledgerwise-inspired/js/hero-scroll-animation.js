/**
 * Hero Scroll Animation - Ledgerwise-Exact Recreation
 * Version: 2026-01-12-FIXED
 */

(function() {
    'use strict';
    
    console.log('🎬 Hero Animation - FIXED VERSION v2.0');
    
    const { ScrollAnimations } = window;
    const { interpolate, prefersReducedMotion } = ScrollAnimations;
    
    if (prefersReducedMotion()) {
        console.log('⏸️ Animations disabled');
        return;
    }
    
    // Get elements
    const heroContainer = document.querySelector('[data-scroll-section="hero"]');
    if (!heroContainer) {
        console.error('❌ Hero container not found');
        return;
    }
    
    const heroContent = document.querySelector('.hero-content');
    const appMockup = document.querySelector('.app-mockup');
    const heroStickyWrapper = document.querySelector('.hero-sticky-wrapper');
    const streams = document.querySelector('.connection-streams');
    const streamPaths = document.querySelectorAll('.stream-path');
    const icons = document.querySelectorAll('[data-icon]');
    const laptopGlow = document.querySelector('.laptop-glow');
    const videoSection = document.querySelector('.video-section');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    console.log('✅ Elements found:', {
        heroContent: !!heroContent,
        appMockup: !!appMockup,
        streams: !!streams,
        videoSection: !!videoSection
    });
    
    // IMMEDIATELY make elements visible
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.visibility = 'visible';
        heroContent.style.display = 'flex';
        console.log('✅ Hero content forced visible');
    }
    if (appMockup) {
        appMockup.style.opacity = '1';
        appMockup.style.visibility = 'visible';
        appMockup.style.display = 'block';
        console.log('✅ App mockup forced visible');
    }
    if (videoSection) {
        videoSection.style.opacity = '0';
        console.log('✅ Video section hidden initially');
    }
    
    // No debug panel (removed per user request)
    
    // DON'T use ScrollProgressTracker - it's broken. Use manual calculation instead.
    console.log('⚠️ Using manual scroll calculation (tracker was broken)');
    
    // Animation loop with manual progress calculation
    let frame = 0;
    
    function updateHeroAnimation() {
        frame++;
        
        // MANUAL PROGRESS CALCULATION
        const scrollY = window.scrollY || window.pageYOffset;
        const containerRect = heroContainer.getBoundingClientRect();
        const containerHeight = heroContainer.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Progress = how far we've scrolled through the container
        // 0% = container top at viewport top
        // 100% = container bottom at viewport top (container has scrolled past)
        const containerTopRelativeToViewportTop = containerRect.top;
        const scrollThroughContainer = -containerTopRelativeToViewportTop;
        const totalScrollableDistance = containerHeight - viewportHeight;
        
        let progress = scrollThroughContainer / totalScrollableDistance;
        progress = Math.max(0, Math.min(1, progress));
        
        // === HERO TEXT (Fades 0-8%, Shrinks 0-12%) - BIDIRECTIONAL ===
        let textOpacity = 1;
        if (heroContent) {
            // Fade out/in based on progress (works both ways!)
            textOpacity = Math.max(0, Math.min(1, interpolate(progress, [0, 0.08], [1, 0])));
            // Shrink/grow based on progress
            const textScale = Math.max(0.6, Math.min(1, interpolate(progress, [0, 0.12], [1, 0.6])));
            heroContent.style.opacity = textOpacity;
            heroContent.style.transform = `scale(${textScale})`;
        }
        
        // === APP MOCKUP - FULLY BIDIRECTIONAL ===
        let appY, appScale, appOpacity;
        if (appMockup) {
            // Y position: Slide up 0-10%, then stay at 0
            appY = Math.max(0, Math.min(60, interpolate(progress, [0, 0.10], [60, 0])));
            
            // Scale: 0.9 → 0.85 (0-10%), hold, then 0.85 → 0.6 (48-58%)
            if (progress < 0.10) {
                appScale = interpolate(progress, [0, 0.10], [0.9, 0.85]);
            } else if (progress < 0.48) {
                appScale = 0.85; // Hold
            } else {
                appScale = Math.max(0.6, Math.min(0.85, interpolate(progress, [0.48, 0.58], [0.85, 0.6])));
            }
            
            // Opacity: 1 until 48%, then fade 48-58%
            appOpacity = Math.max(0, Math.min(1, interpolate(progress, [0.48, 0.58], [1, 0])));
            
            appMockup.style.transform = `translate(-50%, calc(-50% + ${appY}vh)) scale(${appScale})`;
            appMockup.style.opacity = appOpacity;
        }
        
        // === STREAMS - BIDIRECTIONAL ===
        if (streams) {
            let streamsOpacity;
            // Fade in 10-15%, visible 15-52%, fade out 52-57%
            if (progress < 0.10) {
                streamsOpacity = 0;
            } else if (progress < 0.15) {
                streamsOpacity = interpolate(progress, [0.10, 0.15], [0, 1]);
            } else if (progress <= 0.52) {
                streamsOpacity = 1;
            } else if (progress <= 0.57) {
                streamsOpacity = Math.max(0, interpolate(progress, [0.52, 0.57], [1, 0]));
            } else {
                streamsOpacity = 0;
            }
            streams.style.opacity = streamsOpacity;
        }
        
        // === STREAM PATHS ===
        streamPaths.forEach((path, idx) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            
            const ranges = [[0.12, 0.52], [0.12, 0.54], [0.15, 0.56], [0.18, 0.58]];
            const range = ranges[idx] || [0.12, 0.52];
            
            const drawProg = Math.max(0, Math.min(1, interpolate(progress, range, [0, 1])));
            path.style.strokeDashoffset = length * (1 - drawProg);
        });
        
        // === ICONS ===
        icons.forEach((icon, idx) => {
            const opacityRanges = [
                [0.35, 0.43, 0.92, 0.98],
                [0.40, 0.48, 0.94, 0.99],
                [0.45, 0.53, 0.96, 1.00],
                [0.50, 0.58, 0.97, 1.00]
            ];
            const range = opacityRanges[idx];
            
            let iconOpacity = 0;
            if (progress >= range[0] && progress < range[1]) {
                iconOpacity = interpolate(progress, [range[0], range[1]], [0, 1]);
            } else if (progress >= range[1] && progress <= range[2]) {
                iconOpacity = 1;
            } else if (progress > range[2] && progress <= range[3]) {
                iconOpacity = interpolate(progress, [range[2], range[3]], [1, 0]);
            }
            
            icon.style.opacity = iconOpacity;
        });
        
        // === VIDEO - FULLY BIDIRECTIONAL ===
        let videoOpacity, videoScale, videoY;
        if (videoSection) {
            // Opacity: Fade in 48-60%, hold 60-92%, scroll visible 92-98%, fade 98-100%
            if (progress < 0.48) {
                videoOpacity = 0;
            } else if (progress < 0.60) {
                videoOpacity = Math.max(0, Math.min(1, interpolate(progress, [0.48, 0.60], [0, 1])));
            } else if (progress <= 0.98) {
                videoOpacity = 1;
            } else {
                videoOpacity = Math.max(0, Math.min(1, interpolate(progress, [0.98, 1.00], [1, 0])));
            }
            
            // Scale: 0.5 → 0.75 over 50-70%, then hold
            videoScale = Math.max(0.5, Math.min(0.75, interpolate(progress, [0.50, 0.70], [0.5, 0.75])));
            
            // Y: Scroll up 92-98%
            if (progress < 0.92) {
                videoY = 0;
            } else {
                videoY = Math.max(-100, Math.min(0, interpolate(progress, [0.92, 0.98], [0, -100])));
            }
            
            videoSection.style.opacity = videoOpacity;
            videoSection.style.transform = `scale(${videoScale}) translateY(${videoY}vh)`;
            videoSection.style.pointerEvents = videoOpacity > 0.1 ? 'auto' : 'none';
        }
        
        // === HERO SECTION - BIDIRECTIONAL scroll with video ===
        if (heroStickyWrapper) {
            const heroY = Math.max(-100, Math.min(0, interpolate(progress, [0.92, 0.98], [0, -100])));
            heroStickyWrapper.style.transform = `translateY(${heroY}vh)`;
        }
        
        // === SCROLL INDICATOR - BIDIRECTIONAL ===
        if (scrollIndicator) {
            let indOpacity = 0;
            if (progress < 0.68) {
                indOpacity = 0;
            } else if (progress < 0.72) {
                indOpacity = Math.max(0, Math.min(1, interpolate(progress, [0.68, 0.72], [0, 1])));
            } else if (progress <= 0.80) {
                indOpacity = 1;
            } else if (progress <= 0.85) {
                indOpacity = Math.max(0, Math.min(1, interpolate(progress, [0.80, 0.85], [1, 0])));
            } else {
                indOpacity = 0;
            }
            scrollIndicator.style.opacity = indOpacity;
        }
        
        // Log to console (no debug panel)
        if (frame <= 3 || frame % 90 === 0) {
            const phase = progress <= 0.10 ? 'Entry' : progress <= 0.48 ? 'APP HOLDS' : progress <= 0.70 ? 'Transition' : progress <= 0.85 ? 'Video' : 'Exit';
            console.log(`📊 ${(progress * 100).toFixed(1)}% | ${phase} | Text: ${textOpacity.toFixed(2)} | App: ${appOpacity.toFixed(2)} | Video: ${videoOpacity.toFixed(2)}`);
        }
        
        // Continue animation loop
        requestAnimationFrame(updateHeroAnimation);
    }
    
    // Start the animation loop
    requestAnimationFrame(updateHeroAnimation);
    
    console.log('✅ Hero animation loop started');
    console.log('📊 Progress logged to console (no debug panel)');
})();
