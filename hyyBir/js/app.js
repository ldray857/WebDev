import { loadAndRenderMemories } from './renderGallery.js';
import { initScrollAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. 等待数据拉取和 DOM 生成完毕
    await loadAndRenderMemories();
    
    // 2. 挂载滚动监听动画
    initScrollAnimations();
    
    // 3. 极客式隐藏彩蛋
    console.log("%cAct 20: The Palette", "color: #FFB6C1; font-size: 24px; font-weight: bold;");
    console.log("%c祝佟掌柜20岁生日快乐！", "color: #AEC6CF; font-size: 16px;");
});