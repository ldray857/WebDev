export async function loadAndRenderMemories() {
    try {
        const response = await fetch('./data/memories.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const memories = await response.json();
        
        const galleryContainer = document.getElementById('gallery-container');
        const pantoneContainer = document.getElementById('color-cards-container');

        memories.forEach(memory => {
            // 渲染画廊
            const itemHTML = `
                <div class="gallery-item fade-in-up">
                    <img src="${memory.imageUrl}" alt="Memory of ${memory.year}">
                    <div class="caption">
                        <span class="year">${memory.year}</span>
                        <p>${memory.caption}</p>
                    </div>
                </div>
            `;
            galleryContainer.insertAdjacentHTML('beforeend', itemHTML);

            // 渲染色卡
            const cardHTML = `
        <div class="pantone-card fade-in-up" data-color="${memory.pantoneColor}">
            <div class="color-block" style="background-color: ${memory.pantoneColor};">
                <div class="color-image-wrapper">
                    <img src="images/p${memory.id}.jpg" alt="${memory.pantoneName}" class="p-image">
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
        console.error("加载数据失败, 请确保使用了 Live Server:", error);
    }
}

function bindColorCardEvents() {
    const cards = document.querySelectorAll('.pantone-card');
    const section = document.getElementById('pantone-section');

    cards.forEach(card => {
        // 鼠标悬停时，整个区域背景色丝滑变更为色卡的主题色
        card.addEventListener('mouseenter', function() {
            section.style.backgroundColor = this.getAttribute('data-color'); 
        });
        card.addEventListener('mouseleave', function() {
            section.style.backgroundColor = '#faf9f6'; // 恢复原色
        });
    });
}