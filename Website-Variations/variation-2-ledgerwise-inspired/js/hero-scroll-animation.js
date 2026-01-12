/**
 * Hero Scroll Animation - Ledgerwise-Inspired
 * Multi-phase scroll choreography with app mockup, streams, and icons
 */

(function() {
    'use strict';
    
    const { ScrollAnimations } = window;
    const { interpolate, quadraticBezier, prefersReducedMotion } = ScrollAnimations;
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion()) {
        console.log('⏸️ Scroll animations disabled (prefers-reduced-motion)');
        return;
    }
    
    // Get elements
    const heroContainer = document.querySelector('[data-scroll-section="hero"]');
    if (!heroContainer) return;
    
    const appMockup = document.querySelector('.app-mockup');
    const heroContent = document.querySelector('.hero-content');
    const streams = document.querySelector('.connection-streams');
    const stakeholderIcons = document.querySelector('.stakeholder-icons');
    const laptopGlow = document.querySelector('.laptop-glow');
    
    // Gradient layers
    const gradientInitial = document.querySelector('[data-gradient="initial"]');
    const gradientConvergence = document.querySelector('[data-gradient="convergence"]');
    const gradientFinal = document.querySelector('[data-gradient="final"]');
    
    // Stream paths and icons
    const streamPaths = document.querySelectorAll('.stream-path');
    const icons = document.querySelectorAll('[data-icon]');
    
    // Create scroll tracker
    const tracker = new ScrollAnimations.ScrollProgressTracker(heroContainer, {
        start: 'start start',
        end: 'end start'
    });
    
    // Bezier curve points for icon paths (viewport percentage coordinates)
    const iconPaths = {
        1: {
            // Top-left: M 0 150 Q 150 150, 250 250 T 500 300
            points: [
                { x: 0, y: 25 },      // Start (0%, 25%)
                { x: 15, y: 25 },     // Control 1
                { x: 25, y: 42 },     // Control 2
                { x: 50, y: 50 }      // End (center)
            ]
        },
        2: {
            // Top-right: M 1000 120 Q 850 120, 750 220 T 500 300
            points: [
                { x: 100, y: 20 },    // Start (100%, 20%)
                { x: 85, y: 20 },     // Control 1
                { x: 75, y: 37 },     // Control 2
                { x: 50, y: 50 }      // End (center)
            ]
        },
        3: {
            // Bottom-left: M 0 480 Q 150 480, 250 380 T 500 300
            points: [
                { x: 0, y: 80 },      // Start (0%, 80%)
                { x: 15, y: 80 },     // Control 1
                { x: 25, y: 63 },     // Control 2
                { x: 50, y: 50 }      // End (center)
            ]
        },
        4: {
            // Bottom-right: M 1000 450 Q 850 450, 750 370 T 500 300
            points: [
                { x: 100, y: 75 },    // Start (100%, 75%)
                { x: 85, y: 75 },     // Control 1
                { x: 75, y: 62 },     // Control 2
                { x: 50, y: 50 }      // End (center)
            ]
        }
    };
    
    // Get video section for scale-in effect
    const videoSection = document.querySelector('[data-scroll-section="video"]');
    const videoContainer = document.querySelector('.video-container');
    
    // Track if user has scrolled yet
    let userHasScrolled = false;
    let scrollCheckInterval;
    
    // Force hero visible on page load with !important
    if (heroContent) {
        heroContent.style.setProperty('opacity', '1', 'important');
        heroContent.style.setProperty('transform', 'scale(1)', 'important');
    }
    if (appMockup) {
        appMockup.style.setProperty('opacity', '1', 'important');
        appMockup.style.setProperty('transform', 'translate(-50%, -50%) scale(0.9)', 'important');
    }
    
    // Listen for actual scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        userHasScrolled = true;
        clearInterval(scrollCheckInterval);
    }, { once: true, passive: true });
    
    // Check if user has scrolled, if not keep hero visible
    scrollCheckInterval = setInterval(() => {
        if (!userHasScrolled) {
            if (heroContent) {
                heroContent.style.setProperty('opacity', '1', 'important');
                heroContent.style.setProperty('transform', 'scale(1)', 'important');
            }
            if (appMockup) {
                appMockup.style.setProperty('opacity', '1', 'important');
                appMockup.style.setProperty('transform', 'translate(-50%, -50%) scale(0.9)', 'important');
            }
        }
    }, 50);
    
    // Start tracker only after user scrolls
    tracker.onChange((progress) => {
        // Don't do anything until user has actually scrolled
        if (!userHasScrolled) {
            return;
        }
        
        // Don't animate until meaningful progress
        if (progress < 0.02) {
            return;
        }
        
        updateHeroAnimation(progress);
        
            // Video scales in while app mockup is still visible (50-75%)
            // Starts scaling while app is still at center, takes over as app zooms out
            if (videoContainer) {
                let videoOpacity, videoScale;
                if (progress < 0.50) {
                    videoOpacity = 0;
                    videoScale = 0.92;
                } else if (progress > 0.75) {
                    videoOpacity = 1;
                    videoScale = 1;
                } else {
                    const videoProgress = (progress - 0.50) / 0.25;
                    videoOpacity = videoProgress;
                    videoScale = 0.92 + (videoProgress * 0.08);
                }
                videoContainer.style.opacity = videoOpacity.toFixed(2);
                videoContainer.style.transform = `scale(${videoScale.toFixed(2)})`;
            }
    });
    
    console.log('✅ Hero initialized - will animate only after user scrolls');
    
    function updateHeroAnimation(progress) {
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(1, progress));
        
        // HERO CONTENT: Keep visible always (no fade out for now)
        if (heroContent) {
            heroContent.style.setProperty('opacity', '1', 'important');
            heroContent.style.setProperty('transform', 'scale(1)', 'important');
        }
        
        // APP MOCKUP: Fades IN, slides up, stays visible, then zooms out late
        // Phase 1 (0-8%): Fade IN from 0 to 1
        // Phase 2 (8-15%): Slide up to center
        // Phase 3 (15-60%): Hold at center (stays visible while video appears)
        // Phase 4 (60-68%): Zoom out and fade
        
        // App mockup is now inline below buttons - no animations needed
        // It stays visible as part of hero content flow
        
        // Phase 2: Streams appear and animate (10-55%)
        const streamsOpacity = interpolate(progress, [0.10, 0.15, 0.52, 0.57], [0, 1, 1, 0], 'easeInOut');
        
        if (streams) {
            streams.style.opacity = streamsOpacity;
        }
        
        // Animate stream paths (stroke-dasharray)
        const streamProgress = interpolate(progress, [0.12, 0.52], [0, 1], 'easeInOut');
        
        streamPaths.forEach((path, index) => {
            const length = path.getTotalLength();
            const offset = interpolate(progress, [0.10 + (index * 0.05), 0.55 + (index * 0.05)], [length, 0], 'easeInOut');
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = offset;
        });
        
        // Phase 3: Icons travel along paths (35-95%)
        const iconsOpacity = interpolate(progress, [0.35, 0.43, 0.92, 0.98], [0, 1, 1, 0], 'easeInOut');
        
        if (stakeholderIcons) {
            stakeholderIcons.style.opacity = iconsOpacity;
        }
        
        icons.forEach((icon, index) => {
            const iconNum = index + 1;
            const path = iconPaths[iconNum];
            if (!path) return;
            
            // Icon starts moving later (staggered)
            const iconProgress = interpolate(progress, [0.35 + (index * 0.05), 0.95 + (index * 0.01)], [0, 1], 'easeInOut');
            
            // Calculate position along bezier curve
            const t = iconProgress;
            const u = 1 - t;
            const tt = t * t;
            const uu = u * u;
            
            // Cubic bezier calculation
            const x = uu * u * path.points[0].x + 
                     3 * uu * t * path.points[1].x + 
                     3 * u * tt * path.points[2].x + 
                     tt * t * path.points[3].x;
                     
            const y = uu * u * path.points[0].y + 
                     3 * uu * t * path.points[1].y + 
                     3 * u * tt * path.points[2].y + 
                     tt * t * path.points[3].y;
            
            icon.style.left = `${x}%`;
            icon.style.top = `${y}%`;
        });
        
        // Laptop glow when icons converge (35-58%)
        const glowOpacity = interpolate(progress, [0.35, 0.42, 0.52, 0.58], [0, 1, 1, 0], 'easeInOut');
        
        if (laptopGlow) {
            laptopGlow.style.opacity = glowOpacity;
        }
        
        // Background gradients
        // Initial gradient (10-18%)
        if (gradientInitial) {
            const initialOpacity = interpolate(progress, [0.10, 0.18], [0, 1], 'easeInOut');
            gradientInitial.style.opacity = initialOpacity;
        }
        
        // Convergence glow (32-58%)
        if (gradientConvergence) {
            const convergenceOpacity = interpolate(progress, [0.32, 0.42, 0.52, 0.58], [0, 1, 1, 0], 'easeInOut');
            gradientConvergence.style.opacity = convergenceOpacity;
            
            // Create blue glow effect
            if (convergenceOpacity > 0) {
                const glowHTML = `
                    <div style="
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        width: 150vw;
                        height: 150vh;
                        background: radial-gradient(ellipse at center, rgba(57, 128, 165, 0.4) 0%, rgba(57, 128, 165, 0.25) 25%, rgba(57, 128, 165, 0.1) 50%, transparent 70%);
                    "></div>
                    <div style="
                        position: absolute;
                        left: 50%;
                        top: 0;
                        transform: translateX(-50%);
                        width: 100vw;
                        height: 60vh;
                        background: radial-gradient(ellipse at top, rgba(57, 128, 165, 0.2) 0%, transparent 70%);
                    "></div>
                `;
                if (gradientConvergence.innerHTML === '') {
                    gradientConvergence.innerHTML = glowHTML;
                }
            }
        }
        
        // Final blue screen (48-85%)
        if (gradientFinal) {
            const finalOpacity = interpolate(progress, [0.48, 0.55, 0.75, 0.85], [0, 1, 1, 0], 'easeInOut');
            gradientFinal.style.opacity = finalOpacity;
            
            if (gradientFinal.style.background === '') {
                gradientFinal.style.background = 'linear-gradient(135deg, #3980A5 0%, #2d6a8a 50%, #245770 100%)';
            }
        }
    }
    
    console.log('✨ Hero scroll animation initialized');
})();
