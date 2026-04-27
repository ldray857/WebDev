/**
 * 按钮瞬移与挑战逻辑 - 修复版（解决跑出屏幕问题）
 */
document.addEventListener('DOMContentLoaded', () => {
    const fixBtn = document.getElementById('fixBtn');
    let hoverCount = 0;
    const MAX_HOVER = 5; // 闪躲次数

    if (!fixBtn) return;

    const moveButton = (e) => {
        // 达到上限，停止闪躲
        if (hoverCount >= MAX_HOVER) {
            fixBtn.innerText = "算你厉害，点吧！";
            // 恢复到文档流中，取消固定定位
            fixBtn.style.position = 'static';
            fixBtn.style.transform = 'none';
            fixBtn.classList.remove('fixed', 'absolute');
            fixBtn.classList.add('relative', 'bg-green-500', 'text-white');
            
            fixBtn.onclick = () => {
                if (typeof window.onSuccessfulClick === 'function') {
                    window.onSuccessfulClick();
                }
            };
            return;
        }

        // 核心修复：强制使用固定定位，相对于浏览器视口
        fixBtn.style.position = 'fixed';
        fixBtn.style.zIndex = '999'; // 确保在最上层

        // 获取按钮自身的宽高
        const btnWidth = fixBtn.offsetWidth;
        const btnHeight = fixBtn.offsetHeight;

        // 安全边距，防止贴边
        const padding = 20;

        // 计算可移动的最大范围（屏幕宽/高 - 按钮宽/高 - 边距）
        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;

        // 生成随机坐标，最小值不低于 padding
        const randomX = Math.max(padding, Math.random() * maxX);
        const randomY = Math.max(padding, Math.random() * maxY);

        // 应用坐标
        fixBtn.style.left = `${randomX}px`;
        fixBtn.style.top = `${randomY}px`;
        // 清除 margin，防止干扰定位
        fixBtn.style.margin = '0';
        
        hoverCount++;
    };

    // 鼠标悬停触发
    fixBtn.addEventListener('mouseenter', moveButton);

    // 移动端触摸触发
    fixBtn.addEventListener('touchstart', (e) => {
        if (hoverCount < MAX_HOVER) {
            e.preventDefault(); // 阻止点击事件触发
            moveButton();
        }
    }, { passive: false });
});