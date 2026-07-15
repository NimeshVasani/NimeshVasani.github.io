// script.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Fetch Header
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load header.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            initializeMobileMenu();
        })
        .catch(err => console.error(err));

    // 2. Fetch Projects
    fetch("projects.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load projects.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("projects-placeholder").innerHTML = data;
            initializeProjectFilters();
        })
        .catch(err => console.error(err));
});

// Mobile menu controller
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Project Tag Filtering Controller
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active states from all tabs
            filterButtons.forEach(btn => {
                btn.classList.remove("active", "bg-[#D4AF37]", "text-black", "border-[#D4AF37]");
                btn.classList.add("bg-[#111827]", "text-gray-400", "border-gray-800");
            });

            // Make active tab highlighted
            button.classList.add("active", "bg-[#D4AF37]", "text-black", "border-[#D4AF37]");
            button.classList.remove("bg-[#111827]", "text-gray-400", "border-gray-800");

            const selectedCategory = button.getAttribute("data-filter");

            // Filter logic
            projectCards.forEach(card => {
                const tags = card.getAttribute("data-tags").split(" ");
                
                if (selectedCategory === "all" || tags.includes(selectedCategory)) {
                    // Show matching item
                    card.classList.remove("hidden");
                    card.style.opacity = "0";
                    setTimeout(() => {
                        card.style.opacity = "1";
                    }, 50);
                } else {
                    // Hide non-matching item
                    card.classList.add("hidden");
                }
            });
        });
    });
}
