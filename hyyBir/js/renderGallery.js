export async function loadAndRenderMemories() {
    try {
        const response = await fetch('./data/memories.json');
        const memories = await response.json();
        
        const galleryContainer = document.getElementById('gallery-container');
        const pantoneContainer = document.getElementById('color-cards-container');

        // 1. 渲染画廊：保留所有照片（不限制数量）
        memories.forEach(memory => {
            const itemHTML = `
                <div class="gallery-item fade-in-up">
                    <img src="${memory.imageUrl}" alt="Gallery Image">
                    <div class="caption">
                        <span class="year">${memory.year}</span>
                        <p>${memory.caption}</p>
                    </div>
                </div>
            `;
            galleryContainer.insertAdjacentHTML('beforeend', itemHTML);
        });

        // 2. 渲染色卡：【精准限制只显示前 3 个】
        const pantoneMemories = memories.slice(0, 3); 
        pantoneMemories.forEach(memory => {
            const cardHTML = `
                <div class="pantone-card fade-in-up" data-color="${memory.pantoneColor}">
                    <div class="color-block" style="background-color: ${memory.pantoneColor};">
                        <div class="color-image-wrapper">
                            <img src="images/p${memory.id}.png" alt="${memory.pantoneName}" class="p-image">
                        </div>
                    </div>
                    <div class="color-info">
                        <div class="color-hex">${memory.pantoneColor}</div>
                        <div class="color-name">${memory.pantoneName}</div>
                        <div class="color-year">${memory.year}</div>
                    </div>
                </div>
            `;
            pantoneContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        bindColorCardEvents();

    } catch (error) {
        console.error("Data loading error:", error);
    }
}

function bindColorCardEvents() {
    const cards = document.querySelectorAll('.pantone-card');
    const section = document.getElementById('pantone-section');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            section.style.backgroundColor = this.getAttribute('data-color'); 
        });
        card.addEventListener('mouseleave', function() {
            section.style.backgroundColor = '#faf9f6'; 
        });
    });
}