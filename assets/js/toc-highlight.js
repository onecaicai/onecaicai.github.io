// 目录动态高亮和滚动跟随功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('TOC highlight script loaded');
    
    // 等待一小段时间确保DOM完全加载
    setTimeout(() => {
        // 获取所有标题元素
        const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
        const tocLinks = document.querySelectorAll('.floating-toc a[href^="#"]');
        
        console.log(`Found ${headings.length} headings and ${tocLinks.length} TOC links`);
        
        if (headings.length === 0 || tocLinks.length === 0) {
            console.log('No headings or TOC links found');
            return;
        }

        // 为每个标题添加ID（如果没有的话）
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }
        });

        // 创建标题ID到目录链接的映射
        const headingToLinkMap = new Map();
        
        // 更新目录链接的href并创建映射
        tocLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = decodeURIComponent(href.substring(1));
                // 查找匹配的标题元素
                let targetHeading = document.getElementById(targetId);
                if (!targetHeading) {
                    // 如果直接匹配失败，尝试查找包含该文本的标题
                    headings.forEach(heading => {
                        if (heading.textContent.trim() === targetId) {
                            targetHeading = heading;
                        }
                    });
                }
                if (targetHeading) {
                    link.setAttribute('href', `#${targetHeading.id}`);
                    headingToLinkMap.set(targetHeading.id, link);
                    console.log(`Mapped heading "${targetHeading.textContent.trim()}" to TOC link`);
                } else {
                    console.log(`Could not find heading for: ${targetId}`);
                }
            }
        });

        // 滚动监听函数
        function updateActiveTocLink() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            
            let activeHeading = null;
            const offset = 100; // 检测偏移量

            // 方法1：找到当前在视口顶部附近的标题
            for (let i = 0; i < headings.length; i++) {
                const heading = headings[i];
                const rect = heading.getBoundingClientRect();
                
                // 如果标题在视口顶部附近（考虑偏移量）
                if (rect.top <= offset && rect.bottom > 0) {
                    activeHeading = heading;
                    break;
                }
            }

            // 方法2：如果没有找到，找到第一个在视口内的标题
            if (!activeHeading) {
                for (let i = 0; i < headings.length; i++) {
                    const heading = headings[i];
                    const rect = heading.getBoundingClientRect();
                    
                    // 如果标题在视口内
                    if (rect.top > 0 && rect.top < windowHeight) {
                        activeHeading = heading;
                        break;
                    }
                }
            }

            // 方法3：如果还是没有找到，找到最后一个已经离开视口顶部的标题
            if (!activeHeading) {
                for (let i = headings.length - 1; i >= 0; i--) {
                    const heading = headings[i];
                    const rect = heading.getBoundingClientRect();
                    
                    // 如果标题已经离开视口顶部
                    if (rect.top <= 0) {
                        activeHeading = heading;
                        break;
                    }
                }
            }

            // 方法4：最后的备用方案，使用第一个标题
            if (!activeHeading && headings.length > 0) {
                activeHeading = headings[0];
            }

            // 更新目录链接的激活状态
            tocLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            if (activeHeading && headingToLinkMap.has(activeHeading.id)) {
                const activeLink = headingToLinkMap.get(activeHeading.id);
                activeLink.classList.add('active');
                console.log(`Activated TOC link for heading: "${activeHeading.textContent.trim()}" (ID: ${activeHeading.id}) at scroll position: ${scrollTop}`);
                
                // 滚动目录到活动项
                const tocContainer = document.querySelector('.floating-toc');
                if (tocContainer) {
                    const linkRect = activeLink.getBoundingClientRect();
                    const containerRect = tocContainer.getBoundingClientRect();
                    
                    // 检查链接是否在容器可视区域内
                    if (linkRect.top < containerRect.top || linkRect.bottom > containerRect.bottom) {
                        // 使用更平滑的滚动
                        tocContainer.scrollTo({
                            top: tocContainer.scrollTop + (linkRect.top - containerRect.top) - 20,
                            behavior: 'smooth'
                        });
                    }
                }
            } else if (activeHeading) {
                console.log(`Found active heading: "${activeHeading.textContent.trim()}" but no TOC link mapped`);
            } else {
                console.log('No active heading found');
            }
        }

        // 添加滚动事件监听
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveTocLink();
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
        
        // 初始调用
        updateActiveTocLink();

        // 点击目录链接时的平滑滚动
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 100; // 留出一些顶部空间
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }, 100); // 等待100ms确保DOM完全加载
});
