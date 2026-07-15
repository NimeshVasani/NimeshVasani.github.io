// script.js

// ==========================================
// 1. CORE ENGINE: FETCH & LOAD PAGE SECTIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Fetch Header
    fetch("./header.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load header.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            initializeMobileMenu();
            initializeScrollSpy();
        })
        .catch(err => console.error(err));

    // Fetch Home Content
    fetch("./home.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load home.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("home-placeholder").innerHTML = data;
            initializeScrollToNext(); 
            initParticles(); // Initializes particles.js on home screen
        })
        .catch(err => console.error(err));

    // Fetch Projects
    fetch("./projects.html")
        .then(response => {
            if (!response.ok) throw new Error("Could not load projects.html");
            return response.text();
        })
        .then(data => {
            document.getElementById("projects-placeholder").innerHTML = data;
            initializeProjectFilters(); // Populates dynamic grid & sets up modal
        })
        .catch(err => console.error(err));
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
    "mediaType": "image",
    "mediaUrl": "gita_mockup.png",
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
    "mediaType": "image",
    "mediaUrl": "ai_assistant_mockup.png",
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
    "mediaType": "image",
    "mediaUrl": "transit_mockup.png",
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
    "mediaType": "image",
    "mediaUrl": "tictactoe_mockup.png",
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
    "mediaType": "image",
    "mediaUrl": "rbc_mockup.png",
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
    "projectLink": "https://github.com/"
  }
];


// ==========================================
// 3. SKILLS & PORTFOLIO LOGIC IMPLEMENTATION
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
        const cardHtml = `
            <div onclick="openProjectDetails('${project.id}')" class="project-card bg-[#161D30] rounded-xl border border-gray-800 hover:border-[#E14D4D]/50 transition duration-300 overflow-hidden group cursor-pointer" data-tags="${project.tags}">
                <div class="h-48 bg-gray-800 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img src="${project.mediaUrl}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" onerror="this.src='https://via.placeholder.com/400x250'">
                </div>
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

// Modal open/close logic
window.openProjectDetails = function(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-subtitle").innerText = project.subtitle;
    document.getElementById("modal-long-desc").innerText = project.longDescription;
    
    const modalImg = document.getElementById("modal-image");
    modalImg.src = project.mediaUrl;
    modalImg.onerror = function() {
        this.src = 'https://via.placeholder.com/600x400';
    };

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
}

window.closeProjectDetails = function() {
    const modal = document.getElementById("project-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}


// ==========================================
// 4. PARTICLES & GENERAL UTILITIES
// ==========================================

function initParticles() {
    if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 130, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
                "opacity": { "value": 0.3, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.25, "width": 1 },
                "move": { "enable": true, "speed": 4, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
}

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

function initializeScrollSpy() {
    const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
    const sections = document.querySelectorAll("section");

    const activeClasses = ["bg-white/10", "text-[#E14D4D]", "border", "border-white/10", "backdrop-blur-md", "shadow-sm"];
    const defaultClasses = ["text-gray-400"];

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                
                navLinks.forEach(link => {
                    const href = link.getAttribute("href").substring(1);
                    if (href === id) {
                        link.classList.add(...activeClasses);
                        link.classList.remove(...defaultClasses);
                    } else {
                        link.classList.remove(...activeClasses);
                        link.classList.add(...defaultClasses);
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}
