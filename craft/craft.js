document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    const productLinks = document.querySelectorAll('.product-list a');
    const productDisplay = document.querySelector('.product-display');
    const fieldsets = document.querySelectorAll('.product-list fieldset');
    
    // 移除所有产品的高亮效果
    function removeAllHighlights() {
        productItems.forEach(item => {
            item.classList.remove('highlight');
        });
    }

    // 添加高亮效果
    function highlightProduct(targetId) {
        removeAllHighlights();
        const targetProduct = document.getElementById(targetId);
        if (targetProduct) {
            targetProduct.classList.add('highlight');
            // 3秒后自动移除高亮效果
            setTimeout(() => {
                targetProduct.classList.remove('highlight');
            }, 3000);
        }
    }

    // Tab切换功能
    function switchTab(fieldset) {
        // 移除所有fieldset和legend的active类
        fieldsets.forEach(fs => {
            fs.classList.remove('active');
            const legend = fs.querySelector('legend');
            if (legend) {
                legend.classList.remove('active');
            }
        });
        
        // 添加active类到当前fieldset及其legend
        fieldset.classList.add('active');
        const currentLegend = fieldset.querySelector('legend');
        if (currentLegend) {
            currentLegend.classList.add('active');
        }
        
        // 默认显示第一个产品
        const firstProduct = fieldset.querySelector('ul li a'); // 确保选中列表中的第一个链接
        if (firstProduct) {
            updateActiveNav(firstProduct);
            const targetId = firstProduct.getAttribute('data-target');
            highlightProduct(targetId);
        }
    }
    
    // 点击左侧导航滚动到对应产品
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetProduct = document.getElementById(targetId);
            
            // 更新左侧导航活动状态
            updateActiveNav(this);
            
            // 滚动到对应产品
            targetProduct.scrollIntoView({ behavior: 'smooth' });
            
            // 添加高亮效果
            highlightProduct(targetId);
            
            // 楼梯效果
            animateStairEffect(targetProduct);
        });
    });

    // Tab点击事件
    fieldsets.forEach(fieldset => {
        const legend = fieldset.querySelector('legend');
        legend.addEventListener('click', () => switchTab(fieldset));
    });
    
    // 滚动时更新左侧导航活动状态
    productDisplay.addEventListener('scroll', function() {
        const scrollPosition = productDisplay.scrollLeft;
        const windowWidth = window.innerWidth;
        
        productItems.forEach((item, index) => {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            
            if (scrollPosition >= itemLeft - windowWidth * 0.3 && 
                scrollPosition < itemLeft + itemWidth - windowWidth * 0.3) {
                const correspondingLink = document.querySelector(`.product-list a[data-target="${item.id}"]`);
                if (correspondingLink) {
                    updateActiveNav(correspondingLink);
                    // 当滚动到对应位置时也添加高亮效果
                    highlightProduct(item.id);
                }
            }
        });
    });
    
    // 更新活动导航状态
    function updateActiveNav(activeLink) {
        productLinks.forEach(link => {
            const listItem = link.parentElement;
            
            if (link === activeLink) {
                listItem.classList.add('active');
            } else {
                listItem.classList.remove('active');
            }
        });
    }
    
    // 楼梯效果动画
    function animateStairEffect(targetProduct) {
        const index = Array.from(productItems).indexOf(targetProduct);
        
        productItems.forEach((item, i) => {
            if (i < index) {
                item.style.transform = 'translateX(-50px)';
            } else if (i > index) {
                item.style.transform = 'translateX(50px)';
            } else {
                item.style.transform = 'translateX(0)';
            }
            
            // 重置动画
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
            }, 500);
        });
    }
    
    // 初始化：默认显示包装产品
    const defaultFieldset = document.querySelector('.product-list fieldset');
    if (defaultFieldset) {
        switchTab(defaultFieldset);
    }
});