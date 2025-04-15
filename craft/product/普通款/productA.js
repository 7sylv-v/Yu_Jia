document.addEventListener('DOMContentLoaded', function() {
    // 卡片点击效果
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 特殊处理包装卡片
            if(tabId === '5') {
                // 显示包装详情模态框
                showPackagingModal();
            } else {
                // 普通产品跳转逻辑
                window.location.href = `product-detail.html?id=${tabId}`;
            }
        });
    });
    
    // 包装详情模态框
    function showPackagingModal() {
        const modal = document.createElement('div');
        modal.className = 'packaging-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>包装设计详情</h2>
                <div class="modal-gallery">
                    <img src="../craft/product/普通款/茶泡A.袋装样机.png" alt="包装正面">
                    <img src="../craft/product/普通款/手提袋2.png" alt="包装侧面">
                </div>
                <div class="modal-desc">
                    <p>标准礼盒采用环保牛皮纸材质，内衬防潮棉纸，可循环利用设计。</p>
                    <ul>
                        <li>尺寸：18×18×8cm</li>
                        <li>材质：FSC认证牛皮纸</li>
                        <li>重量：约300g</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
});

// 包装卡片特殊交互
const packagingCard = document.querySelector('.packaging-card');

if(packagingCard) {
    // 鼠标悬停时显示传统纹样
    packagingCard.addEventListener('mouseenter', () => {
        const decoration = document.createElement('div');
        decoration.className = 'traditional-pattern';
        packagingCard.appendChild(decoration);
    });
    
    // 鼠标离开时移除纹样
    packagingCard.addEventListener('mouseleave', () => {
        const pattern = packagingCard.querySelector('.traditional-pattern');
        if(pattern) {
            packagingCard.removeChild(pattern);
        }
    });
    
    // 点击展开包装详情
    packagingCard.addEventListener('click', (e) => {
        if(!e.target.closest('.packaging-badge')) {
            showPackagingDetail();
        }
    });
}

function showPackagingDetail() {
    // 这里添加显示包装详情的模态框代码
    console.log('显示包装详情');
}
