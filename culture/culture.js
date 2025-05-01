document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".culture-section").forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%", // 当元素顶部进入视口85%时触发
                toggleActions: "play none none none", // 仅触发一次
            }
        });
    });
});
