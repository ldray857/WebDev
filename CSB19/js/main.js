/**
 * 全局核心交互逻辑 - 增强版
 */
const App = {
    // 1. 视觉反馈：屏幕震动
    shakeScreen(duration = 200) {
        document.body.classList.add('shake-active');
        setTimeout(() => {
            document.body.classList.remove('shake-active');
        }, duration);
    },

    // 2. Boss 战状态管理
    bossConfig: {
        sequence: [91, 78, 66, 19, 13, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        currentIndex: 0,
        maxHp: 9178
    },

    /**
     * 执行攻击逻辑
     * 处理数字切换、进度条步进、震动及跳转
     */
    executeBossHit() {
        const config = this.bossConfig;
        const totalSteps = config.sequence.length - 1;

        if (config.currentIndex >= totalSteps) return;

        // 索引递增
        config.currentIndex++;

        // 获取 DOM 元素
        const bossEl = document.getElementById('boss');
        const hpText = document.getElementById('hp');
        const hpBar = document.getElementById('hp-bar');

        // 更新数字显示
        const nextNum = config.sequence[config.currentIndex];
        if (bossEl) bossEl.innerText = nextNum;

        // 更新进度条 (从 0 增加到 15)
        if (hpBar) hpBar.value = config.currentIndex;

        // 更新百分比文案
        const progressPercent = Math.floor((config.currentIndex / totalSteps) * 100);
        if (hpText) hpText.innerText = progressPercent;

        // 触发震动反馈
        this.shakeScreen(100);

        // 胜利判定
        if (config.currentIndex === totalSteps) {
            this.handleBossDefeated(bossEl);
        }
    },

    /**
     * 击败 Boss 后的表现
     */
    handleBossDefeated(bossEl) {
        setTimeout(() => {
            if (bossEl) bossEl.innerText = "🎂";
            setTimeout(() => {
                window.location.href = 'step5-final.html';
            }, 800);
        }, 500);
    }
};

// 导出供页面使用
window.App = App;