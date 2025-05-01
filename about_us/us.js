document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.join-images');
    const images = document.querySelectorAll('.join-image');
    
    // 计算总宽度（包含gap）
    const itemWidth = 300; // 单个元素宽度
    const gap = 40; // 与CSS中的gap保持一致
    const totalWidth = (itemWidth + gap) * images.length;
    
    // 克隆所有元素并保持原始顺序
    images.forEach(img => {
        const clone = img.cloneNode(true);
        clone.classList.add('clone');
        container.appendChild(clone);
    });
    
    // 设置容器宽度（原始+克隆）
    container.style.width = `${totalWidth * 2}px`;
    
    // 鼠标悬停控制
    container.addEventListener('mouseenter', () => {
        container.style.animationPlayState = 'paused';
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.animationPlayState = 'running';
    });
});
