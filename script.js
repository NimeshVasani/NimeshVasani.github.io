// Dynamic Project loading system from projects.json
let localProjectsData = []; // Stores json data locally once fetched

function initializeProjectFilters() {
    const grid = document.getElementById("dynamic-project-grid");
    if (!grid) return;

    // Fetch details from the central JSON file
    fetch("./projects.json")
        .then(response => {
            if (!response.ok) throw new Error("Could not load projects.json");
            return response.json();
        })
        .then(data => {
            localProjectsData = data;
            renderProjectCards(data); // Render initial state (All)
            setupFilterEventListeners();
        })
        .catch(err => console.error("Error loading project dynamic data:", err));
}

// Builds physical cards in the grid dynamically
function renderProjectCards(projects) {
    const grid = document.getElementById("dynamic-project-grid");
    grid.innerHTML = ""; // Clear existing grid space

    projects.forEach(project => {
        const cardHtml = `
            <div onclick="openProjectDetails('${project.id}')" class="project-card bg-[#161D30] rounded-xl border border-gray-800 hover:border-[#E14D4D]/50 transition duration-300 overflow-hidden group cursor-pointer" data-tags="${project.tags}">
                <div class="h-48 bg-gray-800 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <img src="${project.mediaUrl}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
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
                renderProjectCards(localProjectsData);
            } else {
                const filtered = localProjectsData.filter(p => p.tags.split(' ').includes(selectedCategory));
                renderProjectCards(filtered);
            }
        });
    });
}

// Open modal helper - Populates details dynamically
window.openProjectDetails = function(projectId) {
    const project = localProjectsData.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-subtitle").innerText = project.subtitle;
    document.getElementById("modal-long-desc").innerText = project.longDescription;
    document.getElementById("modal-image").src = project.mediaUrl;

    // Map features list dynamically
    const listContainer = document.getElementById("modal-features-list");
    listContainer.innerHTML = "";
    project.keyFeatures.forEach(feature => {
        const item = document.createElement("li");
        item.classList.add("flex", "items-start");
        
        // Match the star emblem layout
        item.innerHTML = `
            <span class="text-yellow-400 mr-3 mt-0.5">✦</span>
            <span>${feature}</span>
        `;
        listContainer.appendChild(item);
    });

    // Fade and show Modal smoothly
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
