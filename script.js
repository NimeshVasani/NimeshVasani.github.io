// script.js

// 1. Fetch and inject the header on page load
document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header file");
            }
            return response.text();
        })
        .then(data => {
            // Inject the HTML into our placeholder
            document.getElementById("header-placeholder").innerHTML = data;
            
            // Now that the header is on the page, activate the mobile menu button
            initializeMobileMenu();
        })
        .catch(error => console.error("Error loading header:", error));
});

// 2. Mobile Menu Toggle Logic
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu automatically when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}
