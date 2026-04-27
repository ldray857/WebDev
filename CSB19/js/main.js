/**
 * 全局核心交互逻辑 - 鲁棒增强版
 */
(function() {
    const App = {
        // 视觉反馈：屏幕震动
        shakeScreen(duration = 150) {
            document.body.classList.add('shake-active');
            setTimeout(() => {
                document.body.classList.remove('shake-active');
            }, duration);
        },

        // Boss 战配置
        bossConfig: {
            // 数字序列
            sequence: [91, 78, 66, 19, 13, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
            currentIndex: 0
        },

        /**
         * 执行攻击逻辑
         */
        executeBossHit() {
            const config = this.bossConfig;
            const totalSteps = config.sequence.length - 1;

            if (config.currentIndex >= totalSteps) return;

            config.currentIndex++;

            // 获取 DOM
            const bossEl = document.getElementById('boss');
            const hpText = document.getElementById('hp');
            const hpBar = document.getElementById('hp-bar');

            // 更新 UI
            if (bossEl) {
                bossEl.innerText = config.sequence[config.currentIndex];
            }
            if (hpBar) {
                hpBar.value = config.currentIndex;
            }
            if (hpText) {
                const percent = Math.floor((config.currentIndex / totalSteps) * 100);
                hpText.innerText = percent;
            }

            // 反馈
            this.shakeScreen(100);

            // 胜利判断
            if (config.currentIndex === totalSteps) {
                this.handleBossDefeated(bossEl);
            }
        },

        /**
         * 胜利跳转
         */
        handleBossDefeated(bossEl) {
            if (bossEl) bossEl.innerText = "🎂";
            
            // 延迟跳转，给用户一点反应时间
            setTimeout(() => {
                // 因为 step4 在 pages/ 下，跳转 step5 不需要加 pages/
                window.location.href = 'step5-final.html';
            }, 1000);
        }
    };

    // 挂载到全局
    window.App = App;
})();