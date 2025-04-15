document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let slideInterval;

    // 初始化轮播
    function initSlider() {
        slides[0].classList.add('active');
        startAutoSlide();
    }

    // 切换幻灯片
    function goToSlide(index) {
        // 移除当前活动状态
        slides[currentIndex].classList.remove('active');
        
        // 更新索引
        currentIndex = (index + slides.length) % slides.length;
        
        // 添加新活动状态
        slides[currentIndex].classList.add('active');
        // indicators[currentIndex].classList.add('active');
    }

    // 自动轮播
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
    }

    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startAutoSlide();
        });
    });

    // 初始化
    initSlider();
});



// 全局动效
document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('.section-element'); // 找到所有需要监控的元素

    // 检查元素是否进入视口的50%位置
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        console.log('Element rect:', rect);  // 调试输出位置
        return (
            rect.top <= window.innerHeight && rect.bottom >= 0 // 视口范围内
        );
    }

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        sections.forEach((section) => {
            if (isElementInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                console.log('Element visible:', section);  // 调试输出
            }
        });
    });

    // 在页面加载时，检查一下当前视口中已经出现的元素
    sections.forEach((section) => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });

// 制作方法
    const steps = document.querySelectorAll(".step");

    // 检查元素是否进入视口的函数
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 判断元素的顶部是否进入视口并且底部未超出视口
        return rect.top <= windowHeight && rect.bottom >= 0;
    }

    // 处理每个step元素的显示
    function handleStepVisibility() {
        steps.forEach((step) => {
            if (isElementInViewport(step) && !step.classList.contains('visible')) {
                step.classList.add('visible'); // 添加可见的class
                step.style.opacity = 1; // 触发显示动画
                step.style.transform = "translateY(0)"; // 触发上移动画
            }
        });
    }

    // 初始加载检查
    handleStepVisibility();

    // 滚动监听，优化性能
    window.addEventListener("scroll", () => {
        handleStepVisibility(); // 检查元素是否进入视口
    });

    // 还可以用requestAnimationFrame来优化性能，避免频繁触发滚动事件
    // let ticking = false;
    // window.addEventListener('scroll', () => {
    //     if (!ticking) {
    //         window.requestAnimationFrame(() => {
    //             handleStepVisibility();
    //             ticking = false;
    //         });
    //         ticking = true;
    //     }
    // });
});