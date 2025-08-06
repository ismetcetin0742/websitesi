// Universal dropdown functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.dataset.dropdown;
        const menu = document.getElementById(dropdown + '-menu');
        const arrow = toggle.querySelector('.dropdown-arrow');
        
        if (!menu || !arrow) return; // Skip if elements don't exist
        
        // Toggle dropdown on click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherDropdown = otherToggle.dataset.dropdown;
                    const otherMenu = document.getElementById(otherDropdown + '-menu');
                    const otherArrow = otherToggle.querySelector('.dropdown-arrow');
                    if (otherMenu) otherMenu.classList.add('hidden');
                    if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current dropdown
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            } else {
                menu.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            }
        });
        
        // Show dropdown on hover
        toggle.parentElement.addEventListener('mouseenter', function() {
            menu.classList.remove('hidden');
            arrow.style.transform = 'rotate(180deg)';
        });
        
        // Hide dropdown when mouse leaves
        toggle.parentElement.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!toggle.parentElement.matches(':hover')) {
                    menu.classList.add('hidden');
                    arrow.style.transform = 'rotate(0deg)';
                }
            }, 100);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.dataset.dropdown;
            const menu = document.getElementById(dropdown + '-menu');
            const arrow = toggle.querySelector('.dropdown-arrow');
            if (menu) menu.classList.add('hidden');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    });
});