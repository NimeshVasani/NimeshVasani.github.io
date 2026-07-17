// 6. SCROLL SPY ENGINE
// ==========================================
function initializeScrollSpy() {
    const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
    
    // FIX: Instead of gathering raw divs, dynamically match ONLY the elements targeted by your nav links!
    const sections = [];
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                sections.push(element);
            }
        }
    });

    console.log(`🎯 ScrollSpy initialized! Watching exactly ${sections.length} sections:`, sections.map(s => s.id));

    const activeClasses = [
        "bg-white/10",
        "text-[#E14D4D]",
        "border-white/10",
        "backdrop-blur-md",
        "shadow-sm"
    ];

    const defaultClasses = [
        "text-gray-400",
        "border-transparent"
    ];

    // Ensure transition frames are pre-assigned to prevent sudden shifts
    navLinks.forEach(link => {
        link.classList.add("border", "transition-all", "duration-300", "ease-in-out");
    });

    function updateActiveSection() {
        // Safe Fallback: instantly highlight 'home' if user scrolls near the top
        if (window.scrollY < 120) {
            setActiveLink("home");
            return;
        }

        let currentSection = null;
        let minDistance = Infinity;
        const viewportCenter = window.innerHeight / 2;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Ignore structures out of vertical screen scope
            if (rect.bottom < 0 || rect.top > window.innerHeight) return;

            const sectionCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - sectionCenter);

            if (distance < minDistance) {
                minDistance = distance;
                currentSection = section.id;
            }
        });

        if (currentSection) {
            setActiveLink(currentSection);
            console.log(`📍 ScrollSpy Active Section: #${currentSection}`);
        }
    }

    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            const href = link.getAttribute("href");

            // Safety check + substring match
            if (href && href.substring(1) === activeId) {
                link.classList.add(...activeClasses);
                link.classList.remove(...defaultClasses);
            } else {
                link.classList.remove(...activeClasses);
                link.classList.add(...defaultClasses);
            }
        });
    }

    // Run layout scan
    updateActiveSection();

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener("resize", updateActiveSection);
}
