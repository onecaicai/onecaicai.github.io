// 文章目录高亮和阅读进度条功能
(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initTocHighlight();
        initReadingProgress();
    });
    
    // 初始化目录高亮功能
    function initTocHighlight() {
        const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
        const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        
        if (tocLinks.length === 0 || headings.length === 0) {
            return;
        }
        
        // 创建 Intersection Observer 来监听标题的可见性
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -80% 0px', // 考虑导航栏高度和只在顶部20%时触发
            threshold: 0
        };
        
        let activeId = '';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeId = entry.target.id;
                    updateActiveTocLink(activeId);
                }
            });
        }, observerOptions);
        
        // 观察所有标题
        headings.forEach((heading) => {
            observer.observe(heading);
        });
        
        // 处理页面滚动到底部的情况
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            
            // 如果滚动到底部，高亮最后一个标题
            if (scrollTop + clientHeight >= scrollHeight - 100) {
                const lastHeading = headings[headings.length - 1];
                if (lastHeading) {
                    activeId = lastHeading.id;
                    updateActiveTocLink(activeId);
                }
            }
        }, 100));
        
        // 点击目录链接时的平滑滚动
        tocLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100; // 考虑导航栏高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // 立即更新活跃状态
                    activeId = targetId;
                    updateActiveTocLink(activeId);
                }
            });
        });
        
        // 更新活跃的目录链接
        function updateActiveTocLink(id) {
            tocLinks.forEach((link) => {
                const isActive = link.getAttribute('href') === '#' + id;
                
                // 移除或添加活跃状态
                if (isActive) {
                    link.classList.add('active');
                    // 添加额外的视觉提示
                    link.style.fontWeight = '900';
                    link.style.fontSize = '1.05em';
                    link.style.letterSpacing = '0.3px';
                } else {
                    link.classList.remove('active');
                    // 移除内联样式，回到默认状态
                    link.style.fontWeight = '';
                    link.style.fontSize = '';
                    link.style.letterSpacing = '';
                }
            });
        }
    }
    
    // 初始化阅读进度条
    function initReadingProgress() {
        // 创建进度条元素
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
        
        // 更新进度条
        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
            
            progressBar.style.width = Math.min(scrolled, 100) + '%';
        };
        
        // 监听滚动事件
        window.addEventListener('scroll', throttle(updateProgress, 16)); // 60fps
        
        // 初始化进度
        updateProgress();
    }
    
    // 节流函数，用于优化性能
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
})();