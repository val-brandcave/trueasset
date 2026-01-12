/**
 * Navigation - Mobile Menu & Smooth Scrolling
 */

(function() {
    'use strict';
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    
    if (mobileMenuToggle && navLinks) {
        let isMenuOpen = false;
        
        mobileMenuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            // Toggle ARIA attribute
            mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
            
            // Toggle menu visibility (you'd add mobile menu styles in CSS)
            if (isMenuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.position = 'fixed';
                navLinks.style.top = '64px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.flexDirection = 'column';
                navLinks.style.background = 'white';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                navLinks.style.zIndex = '1000';
            } else {
                navLinks.style.display = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.right = '';
                navLinks.style.flexDirection = '';
                navLinks.style.background = '';
                navLinks.style.padding = '';
                navLinks.style.boxShadow = '';
            }
            
            // Animate hamburger icon
            const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
            if (isMenuOpen) {
                lines[0].style.transform = 'translateY(6px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                lines[0].style.transform = '';
                lines[1].style.opacity = '';
                lines[2].style.transform = '';
            }
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen && window.innerWidth < 1024) {
                    mobileMenuToggle.click();
                }
            });
        });
        
        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                isMenuOpen = false;
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.style.display = '';
                // Reset hamburger
                const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = '';
                lines[1].style.opacity = '';
                lines[2].style.transform = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or javascript:
            if (href === '#' || href.startsWith('javascript:')) {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
    
    // Header scroll behavior (fade in background on scroll)
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }
    
    // All sections now visible by default - no animation classes needed
    // JavaScript scroll effects are handled by specific component files
    
    console.log('✨ Navigation initialized');
})();
