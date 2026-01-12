/**
 * Video Modal - Opens video in modal overlay
 */

(function() {
    'use strict';
    
    const openButton = document.getElementById('open-video-modal');
    const modal = document.getElementById('video-modal');
    const closeButton = modal ? modal.querySelector('.modal-close') : null;
    const overlay = modal ? modal.querySelector('.modal-overlay') : null;
    const iframe = document.getElementById('modal-video-iframe');
    
    const videoUrl = 'https://player.vimeo.com/video/453088801?h=8d0e8c2e3e&title=0&byline=0&portrait=0&autoplay=1';
    
    function openModal() {
        if (!modal || !iframe) return;
        
        // Set video source
        iframe.src = videoUrl;
        
        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus close button
        if (closeButton) {
            setTimeout(() => closeButton.focus(), 100);
        }
    }
    
    function closeModal() {
        if (!modal || !iframe) return;
        
        // Stop video
        iframe.src = '';
        
        // Hide modal
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to button
        if (openButton) {
            openButton.focus();
        }
    }
    
    // Event listeners
    if (openButton) {
        openButton.addEventListener('click', openModal);
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('✅ Video modal initialized');
})();
