let currentStep = 1;
        const totalSteps = 6;
        const completedSteps = new Set();
        function initSteps() {
            // 默认激活第一个按钮
            const firstBtn = document.querySelector('.step-btn');
            if (firstBtn) {
                firstBtn.classList.add('active');
                showStep(1); // 显示第一步内容
            }
        }
        function showStep(stepNum) {
            // 移除所有按钮的active状态
            document.querySelectorAll('.step-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 为当前按钮添加active状态
            const currentBtn = document.querySelector(`.step-btn[onclick="showStep(${stepNum})"]`);
            if (currentBtn) {
                currentBtn.classList.add('active');
            }
            // 切换步骤显示
            document.querySelectorAll('.step-content').forEach(el => {
                el.classList.remove('active');
                if(el.id === `step-${stepNum}`) el.classList.add('active');
            });

            // 更新按钮状态
            document.querySelectorAll('.step-btn').forEach((btn, index) => {
                btn.classList.toggle('active', index+1 === stepNum);
            });
        }

        function completeStep(step) {
            completedSteps.add(step);
            if(completedSteps.size === totalSteps) {
                document.getElementById('complete-section').style.display = 'block';
                document.querySelector('.tea-bubble').style.opacity = '1';
            }
            if(step < totalSteps) showStep(step+1);
        }

        // 初始化视频控制
        document.querySelectorAll('iframe').forEach(video => {
            video.addEventListener('play', () => {
                video.parentElement.classList.add('playing');
            });
        });
// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initSteps);
