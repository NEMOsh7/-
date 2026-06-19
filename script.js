
document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const burgerToggle = document.getElementById('burgerToggle');
    const headerNav = document.getElementById('headerNav');
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const header = document.querySelector('.header');

    // Мобильное меню
    if (burgerToggle && headerNav) {
        burgerToggle.addEventListener('click', () => {
            burgerToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
            
            const isExpanded = burgerToggle.getAttribute('aria-expanded') === 'true';
            burgerToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Блокировка прокрутки при открытом меню
            document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        const menuLinks = headerNav.querySelectorAll('.header__menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerToggle.classList.remove('active');
                headerNav.classList.remove('active');
                burgerToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && headerNav.classList.contains('active')) {
                burgerToggle.classList.remove('active');
                headerNav.classList.remove('active');
                burgerToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Версия для слабовидящих
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', () => {
            document.body.classList.toggle('accessibility-mode');
            
            // Здесь можно добавить логику переключения версии
            // Например, увеличение шрифта, изменение контраста и т.д.
            const isAccessibilityMode = document.body.classList.contains('accessibility-mode');
            
            // Сохранение в localStorage
            localStorage.setItem('accessibilityMode', isAccessibilityMode);
            
            // Уведомление (можно заменить на модалку)
            showAccessibilityNotification(isAccessibilityMode);
        });

        // Проверка сохраненной настройки
        const savedMode = localStorage.getItem('accessibilityMode') === 'true';
        if (savedMode) {
            document.body.classList.add('accessibility-mode');
        }
    }

    // Эффект шапки при скролле
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Уведомление о режиме для слабовидящих
    function showAccessibilityNotification(isEnabled) {
        const message = isEnabled 
            ? 'Включена версия для слабовидящих' 
            : 'Выключена версия для слабовидящих';
        
        // Создание toast-уведомления
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Добавление анимаций
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        /* Режим для слабовидящих */
        body.accessibility-mode {
            font-size: 120%;
            line-height: 1.8;
        }
        
        body.accessibility-mode .header__logo-text,
        body.accessibility-mode .header__menu-link,
        body.accessibility-mode .header__btn {
            font-size: 1.2em;
        }
        
        body.accessibility-mode .header {
            background: #000;
            border-bottom-color: #fff;
        }
        
        body.accessibility-mode .header__logo-text,
        body.accessibility-mode .header__menu-link,
        body.accessibility-mode .header__accessibility,
        body.accessibility-mode .header__btn--register {
            color: #fff !important;
        }
        
        body.accessibility-mode .header__btn--login {
            background: #fff;
            color: #000 !important;
            border-color: #fff;
        }
        
        .header--scrolled {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
});

// Обработка кнопок входа и регистрации
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__btn--login')) {
        handleLogin();
    }
    
    if (e.target.classList.contains('header__btn--register')) {
        handleRegister();
    }
});

function handleLogin() {
    console.log('Login clicked');
    // Здесь будет логика открытия модального окна входа
    // или редирект на страницу входа
}

function handleRegister() {
    console.log('Register clicked');
    // Здесь будет логика открытия модального окна регистрации
    // или редирект на страницу регистрации
}