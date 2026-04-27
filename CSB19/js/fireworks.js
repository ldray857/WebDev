/**
 * 最终页撒花特效
 */
function launchCelebration() {
    const duration = 5 * 1000; // 持续 5 秒
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // 自定义生日配色：金、粉、蓝
        const colors = ['#EAB308', '#EC4899', '#3B82F6'];

        // 从屏幕左侧喷射
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors
        }));
        
        // 从屏幕右侧喷射
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors
        }));
    }, 250);
}

// 确保函数挂载在 window 上
window.launchCelebration = launchCelebration;