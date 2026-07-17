// ==========================================
// 1. BOOTSTRAP INITIALIZATION (Unified & Async Safe)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Array to hold all fetch promises so we can track when they are completely loaded
    const fetchPromises = [];

    // 1. Fetch Header Template
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (headerPlaceholder) {
        const pHeader = fetch("header.html")
            .then(response => {
                if (!response.ok) throw new Error("Could not load header.html");
                return response.text();
            })
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initializeMobileMenu();
            })
            .catch(err => console.error(err));
        fetchPromises.push(pHeader);
    }

    // 2. Fetch Home Content Template
    const homePlaceholder = document.getElementById("home-placeholder");
    if (homePlaceholder) {
        const pHome = fetch("home.html")
            .then(response => {
                if (!response.ok) throw new Error("Could not load home.html");
                return response.text();
            })
            .then(data => {
                homePlaceholder.innerHTML = data;
                initializeScrollToNext(); 
            })
            .catch(err => console.error(err));
        fetchPromises.push(pHome);
    }

    // 3. Fetch Projects Section
    const projectsPlaceholder = document.getElementById("projects-placeholder");
    if (projectsPlaceholder) {
        const pProjects = fetch("projects.html")
            .then(response => {
                if (!response.ok) throw new Error(`Could not load projects.html. Status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                projectsPlaceholder.innerHTML = data;
                initializeProjectFilters(); 
            })
            .catch(err => {
                console.error("Failed to load projects.html, running fallback:", err);
                initializeProjectFilters(); // Safe Fallback
            });
        fetchPromises.push(pProjects);
    } else {
        initializeProjectFilters();
    }

    // 4. Fetch Experience Section
    const experiencePlaceholder = document.getElementById("experience-placeholder");
    if (experiencePlaceholder) {
        const pExperience = fetch("experience.html")
            .then(response => {
                if (!response.ok) throw new Error(`Could not load experience.html. Status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                experiencePlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Failed to load experience.html:", err));
        fetchPromises.push(pExperience);
    }

    // 5. Fetch Extra Section (Freelance Pitch & Quotes Grid)
    const extraPlaceholder = document.getElementById("extra-placeholder");
    if (extraPlaceholder) {
        const pExtra = fetch("extra.html")
            .then(response => {
                if (!response.ok) throw new Error(`Could not load extra.html. Status: ${response.status}`);
                return response.text();
            })
            .then(data => {
                extraPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Failed to load extra.html:", err));
        fetchPromises.push(pExtra);
    }

    // ==========================================
    // Run Scroll Spy ONLY after all layouts are complete
    // ==========================================
    Promise.all(fetchPromises)
        .then(() => {
            console.log("📂 Step 1: All HTML templates successfully fetched!");
            setTimeout(() => {
                initializeScrollSpy();
            }, 150); 
        })
        .catch(err => {
            console.warn("One or more templates failed to load, initializing ScrollSpy anyway.", err);
            initializeScrollSpy();
        });
});

// ==========================================
// 2. PROJECT PORTFOLIO DATA (Stored locally)
// ==========================================
const projectsData = [
  {
    "id": "bhagavad-gita-app",
    "title": "The Bhagavad Gita App",
    "subtitle": "[ Kotlin Multiplatform (KMP) ]",
    "tags": "android ios",
    "shortDescription": "A beautiful cross-platform app blending technology & spirituality, sharing a codebase while optimizing native performance.",
    "longDescription": "Presenting The Bhagavad Gita App, thoughtfully crafted using Kotlin Multiplatform (KMP) to deliver an immersive spiritual experience on Android and iOS platforms. The journey of creating this app has been incredibly fulfilling. Leveraging KMP allowed me to share a unified codebase while ensuring platform-specific native optimizations, leading to faster development and highly consistent user experiences.",
    "keyFeatures": [
      "Read in Multiple Languages: Sanskrit, Hindi, and English.",
      "Listen in 8+ Languages: Soulful audio narrations in Sanskrit, English, Hindi, Gujarati, Tamil, Arabic, Spanish, and French.",
      "Audio Player Integration: Full audio player controls, background playback, and persistent system notification support.",
      "Bookmarks & Offline Access: Save favorite verses or entire chapters to access anytime without network connectivity.",
      "Engaging UI/UX: A modern, minimalist design built with Jetpack Compose Multiplatform for a seamless aesthetic."
    ],
    "mediaType": "video",
    "mediaUrl": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/280882cc163fc76d72a8efcb06cc02469822daad/bhagavad_gita.mp4",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/35c2178c9ea495db600ddf388b1299db22cde232/bhagavad_gita.png",
    "projectLink": "https://github.com/"
  },
  {
    "id": "ai-assistant-app",
    "title": "Personal AI Assistant",
    "subtitle": "[ Kotlin Multiplatform & Compose ]",
    "tags": "android ios",
    "shortDescription": "A cutting-edge AI companion app built with KMP, Jetpack Compose, and SwiftUI to deliver high-impact cross-platform performance.",
    "longDescription": "An advanced, conversational AI client utilizing a shared Kotlin Multiplatform core. The app features intelligent chatbot capabilities with high responsiveness and custom UI modules tailored specifically for both iOS and Android frameworks.",
    "keyFeatures": [
      "Rich Text Handling: Native support for markdown formatting inside conversation feeds.",
      "Conversational Memory: Smart retention of conversational context across active messaging streams.",
      "Media Utilities: Quick actions like one-click image saving directly into the system gallery.",
      "Consistent Cross-Platform UX: Unified development that guarantees matching experiences on both operating systems."
    ],
    "mediaType": "video",
    "mediaUrl": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/f314afaf55f8299d519a88ea517c16ea1c414e8b/personal_ai_assistant.mp4",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/65198d48bd6b5d5920dad0dd4b2c900fcc1764c2/personal_ai_assistant.jpg",
    "projectLink": "https://github.com/"
  },
  {
    "id": "transit-app-clone",
    "title": "Transit App Clone",
    "subtitle": "[ Compose Multiplatform ]",
    "tags": "android ios",
    "shortDescription": "A robust geolocation transit clone integrating mapping APIs natively on Android & iOS devices.",
    "longDescription": "A multiplatform transportation tracking prototype utilizing shared UI mechanics through Compose Multiplatform. This project implements complex native platform channels to integrate system-level map kits seamlessly.",
    "keyFeatures": [
      "Dual Map Integration: Google Maps SDK on Android, and Apple MapKit natively implemented on iOS.",
      "Live Tracking Capabilities: Efficient processing of location telemetry data in real time.",
      "Optimized Core Logic: Cross-compiled modules designed to reduce battery drain during continuous tracking."
    ],
    "mediaType": "video",
    "mediaUrl": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/6e4a8d70c53109d84384ef2e4b9cde47715f4bb8/transit_app_clone.mp4",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/65198d48bd6b5d5920dad0dd4b2c900fcc1764c2/transit_app_clone.jpg",
    "projectLink": "https://github.com/"
  },
  {
    "id": "tic-tac-toe-cmp",
    "title": "Tic Tac Toe Multiplayer",
    "subtitle": "[ KMP & Jetpack Compose ]",
    "tags": "android ios",
    "shortDescription": "A dynamic multiplayer classic board game featuring MVI state architecture and interactive animations.",
    "longDescription": "Tic Tac Toe! Built using Kotlin Multiplatform (KMP) and Jetpack Compose. This project focuses on beautiful layout transitions, interactive motion design, and scalable reactive state patterns.",
    "keyFeatures": [
      "MVI Architecture: Elegant application state handling to enforce a strictly unidirectional data flow.",
      "Flexible Modes: Interactive Local Multiplayer alongside Single Player Mode with 3 dynamic AI difficulty levels (Easy, Medium, Hard).",
      "Sleek Gameplay Motion: Built custom canvas-driven animations for satisfying UI responses.",
      "Audio & Profile Tweaks: Personalized sound boards, soundtrack controls, and player profile settings."
    ],
    "mediaType": "video",
    "mediaUrl": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/6e4a8d70c53109d84384ef2e4b9cde47715f4bb8/tic_tac_toe_cmp.mp4",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/65198d48bd6b5d5920dad0dd4b2c900fcc1764c2/tic_tac_toe.jpg",
    "projectLink": "https://github.com/"
  },
  {
    "id": "rbc-redesign",
    "title": "RBC App Redesign",
    "subtitle": "[ Flutter UI Challenge ]",
    "tags": "flutter",
    "shortDescription": "A sleek concept redesign of the Royal Bank of Canada mobile app showcasing modern fintech UX.",
    "longDescription": "An absolute blast of a design sprint! In this Flutter-driven RBC App Redesign Challenge, I took on the objective of polishing, restructuring, and modernizing the financial interface with intuitive micro-interactions and security features.",
    "keyFeatures": [
      "Fintech Dashboard UI: Fluid widgets, balance hidden/reveal actions, and visual analytics charts.",
      "Enhanced Security Visuals: Simulated biometric prompts and dynamic card detail screens.",
      "Cross-Platform Consistency: Shared Flutter codebase running beautifully across Android and iOS screens."
    ],
    "mediaType": "video",
    "mediaUrl": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/9e3eb5f242b5acb9e19668dedf1f02c9c5038a80/2048_cmp.mp4",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/65198d48bd6b5d5920dad0dd4b2c900fcc1764c2/2048_cmp.jpg",
    "projectLink": "https://github.com/"
  },
  {
    "id": "kidtest-app",
    "title": "KidTest IQ Booster",
    "subtitle": "[ Android Native ]",
    "tags": "android",
    "shortDescription": "A lightweight, gamified native Android application designed to improve early development logic skills.",
    "longDescription": "Built specifically for children, this native Android application focuses on clean design layouts and basic logic engines to help kids test and strengthen their cognitive and general reasoning capabilities.",
    "keyFeatures": [
      "Interactive Game Engine: Playful visual quizzes with scoreboards.",
      "High Performance: Standard, lightweight XML and Kotlin architecture optimized for budget tablets and older Android devices.",
      "Kid-Friendly Interfaces: Bold color block structures designed with accessibility guidelines in mind."
    ],
    "mediaType": "image",
    "mediaUrl": "kidtest_mockup.png",
    "imageSrc": "https://raw.githubusercontent.com/NimeshVasani/projects_videos/65198d48bd6b5d5920dad0dd4b2c900fcc1764c2/kid_test.jpg",
    "projectLink": "https://github.com/"
  }
];

const FALLBACK_MEDIA = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";

// ==========================================
// 3. CORE LOGIC & CARD RENDERING
// ==========================================
function initializeProjectFilters() {
    renderProjectCards(projectsData);
    setupFilterEventListeners();
}

function renderProjectCards(projects) {
    const grid = document.getElementById("dynamic-project-grid");
    if (!grid) return;
    
    grid.innerHTML = ""; 

    projects.forEach(project => {
        const isVideo = project.mediaType === "video";
        const imageSrc = project.imageSrc;

        const cardHtml = `
            <div onclick="openProjectDetails('${project.id}')" 
                 class="project-card bg-[#161D30] rounded-xl border border-gray-800 hover:border-[#E14D4D]/50 transition duration-300 overflow-hidden group cursor-pointer" 
                 data-tags="${project.tags}"
                 onmouseenter="handleCardHover(this, true)"
                 onmouseleave="handleCardHover(this, false)">
                
                <!-- Media Frame -->
                <div class="h-48 bg-gray-800 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                    
                    <!-- Cover Artwork Image -->
                    <img src="${imageSrc}" 
                         alt="${project.title}" 
                         class="project-card-image w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                         onerror="this.src='${FALLBACK_MEDIA}'">
                    
                    <!-- Optional Video Hover Element -->
                    ${isVideo ? `
                        <video class="project-card-video absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 pointer-events-none" 
                               muted 
                               loop 
                               playsinline 
                               preload="metadata">
                            <source src="${project.mediaUrl}" type="video/mp4">
                        </video>
                    ` : ''}
                </div>

                <!-- Card Meta Data -->
                <div class="p-6 space-y-4">
                    <div class="flex gap-2">
                        ${project.tags.split(' ').map(tag => `
                            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#E14D4D]/10 text-[#E14D4D] uppercase">${tag}</span>
                        `).join('')}
                    </div>
                    <h3 class="text-xl font-bold text-white">${project.title}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed">${project.shortDescription}</p>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML("beforeend", cardHtml);
    });
}

window.handleCardHover = function(cardElement, isHovering) {
    const video = cardElement.querySelector(".project-card-video");
    const image = cardElement.querySelector(".project-card-image");
    
    if (!video) return;

    if (isHovering) {
        video.classList.remove("opacity-0");
        image.classList.add("opacity-0"); 
        
        video.muted = true;
        video.play().catch(err => console.log("Hover video play blocked: ", err));
    } else {
        video.classList.add("opacity-0");
        image.classList.remove("opacity-0");
        video.pause();
        video.currentTime = 0; 
    }
}

function setupFilterEventListeners() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.remove("active", "bg-[#E14D4D]", "text-white", "border-[#E14D4D]");
                btn.classList.add("bg-[#111827]", "text-gray-400", "border-gray-800");
            });

            button.classList.add("active", "bg-[#E14D4D]", "text-white", "border-[#E14D4D]");
            button.classList.remove("bg-[#111827]", "text-gray-400", "border-gray-800");

            const selectedCategory = button.getAttribute("data-filter");

            if (selectedCategory === "all") {
                renderProjectCards(projectsData);
            } else {
                const filtered = projectsData.filter(p => p.tags.split(' ').includes(selectedCategory));
                renderProjectCards(filtered);
            }
        });
    });
}

// ==========================================
// 4. DETAILED MODAL VIEWER
// ==========================================
window.openProjectDetails = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-subtitle").innerText = project.subtitle;
    document.getElementById("modal-long-desc").innerText = project.longDescription;
    
    const modalImg = document.getElementById("modal-image");
    const modalVideo = document.getElementById("modal-video");
    const modalVideoSource = document.getElementById("modal-video-source");

    modalImg.classList.add("hidden");
    modalVideo.classList.add("hidden");
    modalVideo.pause(); 

    if (project.mediaType === "video") {
        modalVideoSource.src = project.mediaUrl;
        modalVideo.load(); 
        modalVideo.classList.remove("hidden");
        
        modalVideo.muted = true;
        modalVideo.setAttribute('playsinline', '');
        modalVideo.setAttribute('preload', 'metadata');
        
        modalVideo.play().catch(err => {
            console.log("Interactive modal block. Retrying with explicit muted layout...", err);
            modalVideo.muted = true;
            modalVideo.play();
        });
    } else {
        modalImg.onerror = function() {
            this.onerror = null; 
            this.src = FALLBACK_MEDIA;
        };
        modalImg.src = project.mediaUrl || FALLBACK_MEDIA;
        modalImg.classList.remove("hidden");
    }

    const listContainer = document.getElementById("modal-features-list");
    listContainer.innerHTML = "";
    project.keyFeatures.forEach(feature => {
        const item = document.createElement("li");
        item.classList.add("flex", "items-start");
        item.innerHTML = `
            <span class="text-yellow-400 mr-3 mt-0.5">✦</span>
            <span>${feature}</span>
        `;
        listContainer.appendChild(item);
    });

    const modal = document.getElementById("project-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    document.body.classList.add("overflow-hidden");
}

window.closeProjectDetails = function() {
    const modal = document.getElementById("project-modal");
    const modalVideo = document.getElementById("modal-video");
    
    if (modalVideo) {
        modalVideo.pause();
    }

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    
    document.body.classList.remove("overflow-hidden");
}

// ==========================================
// 5. LAYOUT ANIMATIONS & GLOBAL UTILITIES
// ==========================================
function initializeScrollToNext() {
    const scrollBtn = document.getElementById("scroll-to-next-btn");
    const skillsSection = document.getElementById("skills");
    
    if (scrollBtn && skillsSection) {
        scrollBtn.addEventListener("click", () => {
            skillsSection.scrollIntoView({ behavior: "smooth" });
        });

        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                scrollBtn.classList.add("opacity-0", "pointer-events-none");
            } else {
                scrollBtn.classList.remove("opacity-0", "pointer-events-none");
            }
        });
    }
}

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

// ==========================================
// 6. SCROLL SPY ENGINE (Updated for data-target)
// ==========================================
function initializeScrollSpy() {
    // Select both desktop AND mobile navigation links that have custom target attributes
    const navLinks = document.querySelectorAll("#desktop-nav .nav-link, #mobile-menu .mobile-nav-link");
    
    const sections = [];
    navLinks.forEach(link => {
        const targetId = link.getAttribute("data-target");
        if (targetId) {
            const element = document.getElementById(targetId);
            // Push unique target elements to scroll monitoring array
            if (element && !sections.includes(element)) {
                sections.push(element);
            }
        }
    });

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

    // Apply baseline styles to desktop links
    document.querySelectorAll("#desktop-nav .nav-link").forEach(link => {
        link.classList.add("border", "transition-all", "duration-300", "ease-in-out");
    });

    function updateActiveSection() {
        if (window.scrollY < 120) {
            setActiveLink("home");
            return;
        }

        let currentSection = null;
        let minDistance = Infinity;
        const viewportCenter = window.innerHeight / 2;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

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
        }
    }

    function setActiveLink(activeId) {
        navLinks.forEach(link => {
            const targetId = link.getAttribute("data-target");

            if (targetId === activeId) {
                // Apply visual state highlights
                link.classList.add(...activeClasses);
                link.classList.remove(...defaultClasses);
                
                // Keep mobile menu highlight styling in sync if matching
                if (link.classList.contains("mobile-nav-link")) {
                    link.classList.add("text-[#D4AF37]");
                }
            } else {
                link.classList.remove(...activeClasses);
                link.classList.add(...defaultClasses);
                
                if (link.classList.contains("mobile-nav-link")) {
                    link.classList.remove("text-[#D4AF37]");
                }
            }
        });
    }

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

// ==========================================
// 7. ACCORDION (Exposed Globally)
// ==========================================
window.toggleAccordion = function(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById(`icon-${id}`);
    
    if (!content || !icon) return;

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.innerText = '—'; 
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.innerText = '+';
        icon.classList.remove('rotate-180');
    }
}

// ==========================================
// 8. GLOBAL EVENT LISTENERS
// ==========================================
document.addEventListener("click", (e) => {
    // Find the closest element with a data-target attribute (in case they click an icon or inner span)
    const navLink = e.target.closest("[data-target]");
    if (!navLink) return;

    const targetId = navLink.getAttribute("data-target");
    
    // 1. If we are on an independent sub-page (like bio or blog.html) and click "Home", 
    // let the default anchor link redirect us back to the landing index page.
    if (targetId === "home" && (window.location.pathname.includes("/bio") || window.location.pathname.includes("/blog"))) {
        return; 
    }

    // 2. Look for the target container on the current page
    const element = document.getElementById(targetId);
    if (element) {
        e.preventDefault();

        // 3. Smoothly scroll to the clicked section, offsetting for a sticky header if you have one
        const headerOffset = 80; // Adjust this value to match your header's actual height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // 4. Instant Feedback: Force-apply active highlights immediately without waiting for scrollspy to catch up
        const navLinks = document.querySelectorAll("#desktop-nav .nav-link, #mobile-menu .mobile-nav-link");
        const activeClasses = ["bg-white/10", "text-[#E14D4D]", "border-white/10", "backdrop-blur-md", "shadow-sm"];
        const defaultClasses = ["text-gray-400", "border-transparent"];

        navLinks.forEach(link => {
            const linkTarget = link.getAttribute("data-target");
            if (linkTarget === targetId) {
                link.classList.add(...activeClasses);
                link.classList.remove(...defaultClasses);
                if (link.classList.contains("mobile-nav-link")) {
                    link.classList.add("text-[#D4AF37]");
                }
            } else {
                link.classList.remove(...activeClasses);
                link.classList.add(...defaultClasses);
                if (link.classList.contains("mobile-nav-link")) {
                    link.classList.remove("text-[#D4AF37]");
                }
            }
        });
    }
});
