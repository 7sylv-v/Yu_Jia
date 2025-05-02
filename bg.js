// 返回顶部按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // 平滑滚动到顶部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 导航栏激活状态控制
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面完整路径
    const fullPath = window.location.pathname;
    
    // 定义栏目映射关系（根据实际项目结构调整）
    const navMap = [
        {
            name: '首页',
            path: '/index.html',
            subPaths: []
        },
        {
            name: '茶泡技艺',
            path: '/culture/JiYi.html',
            subPaths: [
                './culture/picture/',
                './culture/'
            ]
        },
        {
            name: '关于产品',
            path: '/craft/craft.html',
            subPaths: [
                './craft/product/',
                './craft/product/文创/',
                './craft/product/普通款/',
                './craft/product/老炮儿/',
                './craft/product/茶嫁家/'
            ]
        },
        {
            name: '雅集共赏',
            path: '/event/event.html',
            subPaths: [
                './event/img/'
            ]
        },
        {
            name: '加入我们',
            path: '/about_us/us.html',
            subPaths: [
                './about_us/'
            ]
        }
    ];

    // 判断当前所属栏目
    function getCurrentNav() {
        // 1. 精确匹配主路径
        const exactMatch = navMap.find(item => 
            fullPath === item.path
        );
        if (exactMatch) return exactMatch.name;

        // 2. 检查子目录路径
        const partialMatch = navMap.find(item => 
            item.subPaths.some(subPath => 
                fullPath.startsWith(subPath) || 
                fullPath.includes(subPath.replace(/\//g, ''))
            )
        );
        if (partialMatch) return partialMatch.name;

        // 3. 默认返回首页
        return '首页';
    }

    // 设置active状态
    const currentNav = getCurrentNav();
    document.querySelectorAll('.nav-item').forEach(item => {
        const linkText = item.querySelector('a').textContent.trim();
        if (linkText === currentNav) {
            item.classList.add('active');
        }
    });
});
