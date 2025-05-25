document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
    });

    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').classList.add('hide');
    }, 1000);

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 커스텀 커서 효과 제거됨

    // Stats Counter Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');

        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let count = 0;
            const duration = 2000; // ms
            const increment = target / (duration / 30);

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(count);
                }
            }, 30);
        });
    }

    // Run stats animation when elements are in view
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }

    // Future Plan Navigation
    const futureNavBtns = document.querySelectorAll('.future-nav-btn');
    const futureSections = document.querySelectorAll('.future-section');

    if (futureNavBtns.length && futureSections.length) {
        futureNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-future-section');

                // Toggle active class on buttons
                futureNavBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Toggle active class on sections
                futureSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    // Goal Card Toggle
    const goalToggles = document.querySelectorAll('.goal-toggle');

    if (goalToggles.length) {
        goalToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const card = this.closest('.goal-card');
                const content = card.querySelector('.goal-content');
                const icon = this.querySelector('i');

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.setAttribute('data-feather', 'chevron-down');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.setAttribute('data-feather', 'chevron-up');
                }

                // Re-initialize feather icons
                feather.replace();
            });
        });
    }

    // 3D Card Effect
    const cards = document.querySelectorAll('.goal-card-3d');

    if (cards.length) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardWrapper = this.querySelector('.card-3d-wrapper');
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;

                cardWrapper.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            });

            card.addEventListener('mouseleave', function() {
                const cardWrapper = this.querySelector('.card-3d-wrapper');
                cardWrapper.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        });
    }

    // Initialize Swiper carousels if they exist
    if (typeof Swiper !== 'undefined') {
        // Timeline Swiper
        const timelineSwiper = document.querySelector('.timeline-swiper');
        if (timelineSwiper) {
            new Swiper('.timeline-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }

        // Mockup Swiper
        const mockupSwiper = document.querySelector('.mockup-swiper');
        if (mockupSwiper) {
            new Swiper('.mockup-swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }

    // 빠른 네비게이션 버튼
    const quickNavBtns = document.querySelectorAll('.quick-nav-btn');
    if (quickNavBtns.length > 0) {
        quickNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 현재 활성화된 버튼 비활성화
                document.querySelectorAll('.quick-nav-btn').forEach(b => {
                    b.classList.remove('active');
                });

                // 클릭한 버튼 활성화
                this.classList.add('active');

                // 해당 섹션으로 스크롤
                const targetId = '#' + this.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 일반 앵커 링크
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Interactive Timeline
    const timelineNavBtns = document.querySelectorAll('.timeline-nav-btn');
    const timelineItems = document.querySelectorAll('.timeline-item[data-period]');

    if (timelineNavBtns.length && timelineItems.length) {
        timelineNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const period = this.getAttribute('data-period');

                // Toggle active class on buttons
                timelineNavBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Toggle active class on timeline items
                timelineItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-period') === period) {
                        item.classList.add('active');
                    }
                });
            });
        });
    }

    // Timeline toggle buttons
    const timelineToggleBtns = document.querySelectorAll('.timeline-toggle-btn');

    if (timelineToggleBtns.length) {
        timelineToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const timelineItem = this.closest('.timeline-item');
                const contentWrapper = this.parentElement;
                const content = contentWrapper.querySelector('.timeline-content');
                const icon = this.querySelector('i');

                timelineItem.classList.toggle('expanded');

                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    icon.setAttribute('data-feather', 'chevron-down');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.setAttribute('data-feather', 'chevron-up');
                }

                // Re-initialize feather icons
                feather.replace();
            });
        });
    }

    // Tech Sections Navigation
    const techNavBtns = document.querySelectorAll('.tech-nav-btn');
    const techSections = document.querySelectorAll('.tech-section');

    if (techNavBtns.length && techSections.length) {
        techNavBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetSection = this.getAttribute('data-section');

                // Toggle active class on buttons
                techNavBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Toggle active class on sections
                techSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSection) {
                        section.classList.add('active');
                    }
                });
            });
        });
    }

    // Tech item expanders
    const expandBtns = document.querySelectorAll('.expand-btn');

    if (expandBtns.length) {
        expandBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const techItem = this.closest('.tech-item');
                const details = techItem.querySelector('.tech-details');
                const icon = this.querySelector('i');

                techItem.classList.toggle('expanded');

                if (details.style.maxHeight) {
                    details.style.maxHeight = null;
                    icon.setAttribute('data-feather', 'chevron-down');
                } else {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    icon.setAttribute('data-feather', 'chevron-up');
                }

                // Re-initialize feather icons
                feather.replace();
            });
        });
    }

    // Initialize typed text animation if the library exists
    if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector('.typed-text');
        if (typedElement) {
            new Typed('.typed-text', {
                strings: [
                    '문제 해결을 좋아합니다',
                    '새로운 기술 습득을 즐깁니다',
                    '끊임없이 성장하는 개발자입니다',
                    '팀워크를 중요시합니다',
                    '백엔드 개발에 집중하고 있습니다'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        }
    }

    // 아코디언 기능 추가
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentElement;
                const accordionContent = this.nextElementSibling;
                const accordionIcon = this.querySelector('i');

                // 아코디언 토글
                accordionItem.classList.toggle('active');

                if (accordionItem.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    if (accordionIcon) {
                        accordionIcon.setAttribute('data-feather', 'chevron-up');
                    }
                } else {
                    accordionContent.style.maxHeight = null;
                    if (accordionIcon) {
                        accordionIcon.setAttribute('data-feather', 'chevron-down');
                    }
                }

                // 아이콘 다시 초기화
                feather.replace();
            });
        });
    }
});