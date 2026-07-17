// =========================================================
// WIX RSS BLOG LOADER (DOM Parser + AllOrigins CORS Bypass)
// =========================================================
const WIX_FREE_URL = 'https://nmvasani.com'; 
const WIX_RSS_URL = `${WIX_FREE_URL}/blog-feed.xml`;
const CORS_PROXY = `https://api.allorigins.win/get?url=${encodeURIComponent(WIX_RSS_URL)}`;

async function loadWixBlogs() {
    const container = document.getElementById("blog-container");
    if (!container) return;

    try {
        const response = await fetch(CORS_PROXY);
        if (!response.ok) throw new Error("Proxy connection failed.");
        
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        
        const items = xmlDoc.getElementsByTagName("item");
        if (items.length === 0) {
            container.innerHTML = `<p class="text-gray-400 col-span-full text-center py-12">No posts found.</p>`;
            return;
        }

        container.innerHTML = ""; // Clear out loading state skeletons

        // Parse and render the posts
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const title = item.getElementsByTagName("title")[0]?.textContent || "Untitled Post";
            const link = item.getElementsByTagName("link")[0]?.textContent || "#";
            
            // Format Date safely
            const rawDate = item.getElementsByTagName("pubDate")[0]?.textContent;
            const formattedDate = rawDate ? new Date(rawDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }) : "Recent Post";

            // Extract the cover image from HTML content safely
            const descriptionHtml = item.getElementsByTagName("description")[0]?.textContent || "";
            const tempElement = document.createElement('div');
            tempElement.innerHTML = descriptionHtml;
            const imgElement = tempElement.querySelector('img');
            const coverImage = imgElement ? imgElement.src : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop';
            
            // Generate standard summary text
            const summaryText = tempElement.textContent.trim().substring(0, 120) + '...';

            const cardMarkup = `
                <article class="bg-[#161D30] rounded-xl border border-gray-800 hover:border-[#E14D4D]/50 transition duration-300 overflow-hidden flex flex-col justify-between group">
                    <div>
                        <!-- Cover Image -->
                        <div class="h-48 w-full overflow-hidden relative bg-gray-900">
                            <img src="${coverImage}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        </div>
                        
                        <!-- Details -->
                        <div class="p-6">
                            <span class="text-xs text-[#E14D4D] font-bold tracking-wider uppercase block mb-2">${formattedDate}</span>
                            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-[#E14D4D] transition duration-200 line-clamp-2">${title}</h3>
                            <p class="text-gray-400 text-sm leading-relaxed line-clamp-3">${summaryText}</p>
                        </div>
                    </div>
                    
                    <!-- Read Post Trigger -->
                    <div class="px-6 pb-6 pt-2">
                        <a href="${link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-sm font-semibold text-[#E14D4D] hover:text-white transition duration-200">
                            Read Post <span class="ml-1 transform group-hover:translate-x-1 transition duration-200">→</span>
                        </a>
                    </div>
                </article>
            `;
            container.insertAdjacentHTML("beforeend", cardMarkup);
        }
    } catch (error) {
        console.error("Failed loading Wix Blog RSS stream:", error);
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-red-400 mb-4">Oops! Failed to load blog feed dynamically.</p>
                <a href="${WIX_FREE_URL}" target="_blank" class="px-5 py-2 bg-[#E14D4D] text-white rounded-lg hover:bg-[#c03939] transition">
                    Go to Blog Directly
                </a>
            </div>`;
    }
}

document.addEventListener("DOMContentLoaded", loadWixBlogs);
