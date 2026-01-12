// Carousel functionality for Solutions Section
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarousel);
    } else {
        initCarousel();
    }
    
    function initCarousel() {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        const dots = Array.from(document.querySelectorAll('.carousel-dot'));
        
        if (!track || !slides.length || !prevButton || !nextButton) {
            return; // Exit if carousel elements don't exist
        }
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();
        const totalSlides = slides.length;
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        
        // Get number of slides visible based on screen width
        function getSlidesPerView() {
            const width = window.innerWidth;
            if (width >= 1024) return 3;
            if (width >= 768) return 2;
            return 1;
        }
        
        // Update carousel position
        function updateCarousel(animate = true) {
            const slideWidth = slides[0].offsetWidth;
            const gap = parseInt(getComputedStyle(track).gap) || 24;
            const offset = -(currentIndex * (slideWidth + gap));
            
            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                track.style.transition = 'none';
            }
            
            track.style.transform = `translateX(${offset}px)`;
            
            // Update button states
            updateButtons();
            
            // Update dots
            updateDots();
        }
        
        // Update button disabled states
        function updateButtons() {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex >= maxIndex;
        }
        
        // Update dot indicators
        function updateDots() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Navigate to specific slide
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }
        
        // Previous slide
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        
        // Next slide
        function nextSlide() {
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            }
        }
        
        // Event listeners
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newSlidesPerView = getSlidesPerView();
                if (newSlidesPerView !== slidesPerView) {
                    slidesPerView = newSlidesPerView;
                    // Recalculate maxIndex
                    const newMaxIndex = Math.max(0, totalSlides - slidesPerView);
                    
                    // Adjust currentIndex if needed
                    if (currentIndex > newMaxIndex) {
                        currentIndex = newMaxIndex;
                    }
                    
                    updateCarousel(false);
                }
            }, 250);
        });
        
        // Initialize
        updateCarousel(false);
    }
})();
