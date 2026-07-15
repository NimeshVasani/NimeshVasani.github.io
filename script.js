// script.js

// 1. ALL PROJECT DATA (Stored locally to bypass local browser fetch/CORS blocks)
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

// Global dynamic loader (called once projects.html finishes rendering)
function initializeProjectFilters() {
    renderProjectCards(projectsData); // Bypasses network fetch and draws instantly
    setupFilterEventListeners();
}

// Renders the cards into the grid
function renderProjectCards(projects) {
    const grid = document.getElementById("dynamic-project-grid");
    if (!grid) return;
    
    grid.innerHTML = ""; // Clear existing grid layout

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

// Configures navigation filter clicks
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

// Open modal helper
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

// Close Modal Helper
window.closeProjectDetails = function() {
    const modal = document.getElementById("project-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}
