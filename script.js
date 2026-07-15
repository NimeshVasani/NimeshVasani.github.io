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
            initializeScrollSpy(); // Enable real-time active tab highlighter
        })
        .catch(err => console.error(err));

    // 2. Fetch Home Content
    fetch("home.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load home.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("home-placeholder").innerHTML = data;
            initializeScrollToBottom(); // Enable your new bottom scroll button
        })
        .catch(err => console.error(err));

    // 3. Fetch Projects
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

// Controls the Hero "Scroll Down" action to bottom of screen
function initializeScrollToBottom() {
    const scrollBtn = document.getElementById("scroll-to-bottom-btn");
    if (scrollBtn) {
        scrollBtn.addEventListener("click", () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });
        });
    }
}

// Mobile hamburger toggle logic
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

// iOS-Glass style real-time page-scroll active tab highlighter (ScrollSpy)
function initializeScrollSpy() {
    const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
    const sections = document.querySelectorAll("section");

    // iOS glass classes to apply for active tab
    const activeClasses = [
        "bg-white/10", 
        "text-[#D4AF37]", 
        "border", 
        "border-white/10", 
        "backdrop-blur-md", 
        "shadow-sm"
    ];
    
    const defaultClasses = ["text-gray-400"];

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px", // Focus tracking area roughly in the center-top of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    const href = link.getAttribute("href").substring(1);
                    if (href === id) {
                        // Apply gorgeous iOS glass pill look
                        link.classList.add(...activeClasses);
                        link.classList.remove(...defaultClasses);
                    } else {
                        // Reset other non-active tabs
                        link.classList.remove(...activeClasses);
                        link.classList.add(...defaultClasses);
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Interactive Project filtering engine
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active", "bg-[#D4AF37]", "text-black", "border-[#D4AF37]");
                btn.classList.add("bg-[#111827]", "text-gray-400", "border-gray-800");
            });

            button.classList.add("active", "bg-[#D4AF37]", "text-black", "border-[#D4AF37]");
            button.classList.remove("bg-[#111827]", "text-gray-400", "border-gray-800");

            const selectedCategory = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const tags = card.getAttribute("data-tags").split(" ");
                
                if (selectedCategory === "all" || tags.includes(selectedCategory)) {
                    card.classList.remove("hidden");
                    card.style.opacity = "0";
                    setTimeout(() => {
                        card.style.opacity = "1";
                    }, 50);
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}        .catch(err => console.error(err));
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
