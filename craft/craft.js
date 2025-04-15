document.addEventListener('DOMContentLoaded', function() {
    const productItems = document.querySelectorAll('.product-item');
    const productLinks = document.querySelectorAll('.product-list a');
    const productDisplay = document.querySelector('.product-display');
    
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
        
        // 楼梯效果
        animateStairEffect(targetProduct);
      });
    });
    
    // 滚动时更新左侧导航活动状态
    productDisplay.addEventListener('scroll', function() {
      const scrollPosition = productDisplay.scrollTop;
      const windowHeight = window.innerHeight;
      
      productItems.forEach((item, index) => {
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        
        if (scrollPosition >= itemTop - windowHeight * 0.3 && 
            scrollPosition < itemTop + itemHeight - windowHeight * 0.3) {
          const correspondingLink = document.querySelector(`.product-list a[data-target="${item.id}"]`);
          updateActiveNav(correspondingLink);
        }
      });
    });
    
    // 更新活动导航状态
    function updateActiveNav(activeLink) {
      productLinks.forEach(link => {
        const listItem = link.parentElement;
        const underline = link.querySelector('::after');
        
        if (link === activeLink) {
          listItem.classList.add('active');
        } else {
          // 添加下划线消失动画
          if (listItem.classList.contains('active')) {
            const pseudoElement = window.getComputedStyle(link, '::after');
            const underline = document.createElement('span');
            underline.className = 'underline-out';
            underline.style.position = 'absolute';
            underline.style.bottom = '0';
            underline.style.left = '0';
            underline.style.height = '2px';
            underline.style.background = '#a47d1c';
            underline.style.width = '100%';
            underline.style.animation = 'underlineOut 0.3s forwards';
            link.appendChild(underline);
            
            underline.addEventListener('animationend', function() {
              underline.remove();
            });
          }
          
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
    
    // 初始化第一个产品为活动状态
    updateActiveNav(document.querySelector('.product-list a[data-target="product1"]'));
  });