// Tabs Functionality for Feature Section

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Update ARIA attributes for accessibility
            tabButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
            
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
        });
        
        // Keyboard navigation for tabs
        button.addEventListener('keydown', (e) => {
            let index = Array.from(tabButtons).indexOf(button);
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                index = (index + 1) % tabButtons.length;
                tabButtons[index].click();
                tabButtons[index].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                index = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[index].click();
                tabButtons[index].focus();
            }
        });
    });
    
    // Initialize ARIA attributes
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
    });
    
    tabPanels.forEach(panel => {
        panel.setAttribute('role', 'tabpanel');
    });
});
