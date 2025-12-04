// Основной JavaScript файл для сайта

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт "Про Кристину" загружен!');
    
    // ========== ПЛАВНАЯ ПРОКРУТКА ДЛЯ НАВИГАЦИИ ==========
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Плавная прокрутка к элементу
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // ========== АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ ==========
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSectionId = '';
        
        // Находим текущую секцию
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = '#' + section.id;
            }
        });
        
        // Устанавливаем активный класс
        navLinks.forEach(link => {
            link.classList.remove('text-green-600', 'font-bold');
            link.classList.add('text-gray-700');
            
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-green-600', 'font-bold');
            }
        });
    }
    
    // Вызываем при загрузке и прокрутке
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
    
    // ========== АНИМАЦИЯ ПРИ ПРОКРУТКЕ ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ========== ГАЛЕРЕЯ С ЛЁГКИМ ZOOM ==========
    const galleryImages = document.querySelectorAll('#gallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Создаем модальное окно для просмотра изображения
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Закрытие модального окна
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Закрытие по Escape
            document.addEventListener('keydown', function closeOnEscape(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeOnEscape);
                }
            });
        });
    });
    
    // ========== ИЗМЕНЕНИЕ ШАПКИ ПРИ ПРОКРУТКЕ ==========
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md', 'bg-white', 'sticky', 'top-0');
            header.style.transition = 'all 0.3s ease';
        } else {
            header.classList.remove('shadow-md', 'bg-white', 'sticky', 'top-0');
        }
    });
    
    // ========== КНОПКА "НАВЕРХ" ==========
    // Создаем кнопку
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #71bc20;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 100;
        box-shadow: 0 4px 12px rgba(113, 188, 32, 0.3);
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#5a9c19';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#71bc20';
        this.style.transform = 'scale(1)';
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Показываем/скрываем кнопку
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.alignItems = 'center';
            scrollTopBtn.style.justifyContent = 'center';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // ========== ПОДСВЕТКА ИКОНОК В ФУТЕРЕ ==========
    const socialIcons = document.querySelectorAll('footer a');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ========== АВТОМАТИЧЕСКАЯ ЗАГРУЗКА ГОДА В ФУТЕРЕ ==========
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    yearSpan.classList.add('font-bold');
    
    // Находим элемент с копирайтом и заменяем год
    const copyrightText = document.querySelector('footer p.text-gray-500');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2023', yearSpan.outerHTML);
    }
});