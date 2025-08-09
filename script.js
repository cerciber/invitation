// Página web estática - JavaScript con efectos de transición y aparición
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuración de animaciones
    const animationConfig = {
        duration: 800,
        easing: 'ease-out',
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Clases para animaciones
    const animationClasses = {
        fadeIn: 'fade-in',
        slideInLeft: 'slide-in-left',
        slideInRight: 'slide-in-right',
        slideInUp: 'slide-in-up',
        slideInDown: 'slide-in-down',
        scaleIn: 'scale-in',
        rotateIn: 'rotate-in'
    };

    // Función para agregar clases de animación
    function addAnimationClass(element, className) {
        if (element && !element.classList.contains(className)) {
            element.classList.add(className);
        }
    }

    // Función para remover clases de animación
    function removeAnimationClass(element, className) {
        if (element && element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    // Animación inicial de carga de la página
    function initializePageAnimations() {
        // Animar elementos del hero
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDate = document.querySelector('.hero-date');
        const heroLocation = document.querySelector('.hero-location');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroTitle) {
            setTimeout(() => addAnimationClass(heroTitle, animationClasses.fadeIn), 300);
        }
        if (heroSubtitle) {
            setTimeout(() => addAnimationClass(heroSubtitle, animationClasses.slideInUp), 600);
        }
        if (heroDate) {
            setTimeout(() => addAnimationClass(heroDate, animationClasses.scaleIn), 900);
        }
        if (heroLocation) {
            setTimeout(() => addAnimationClass(heroLocation, animationClasses.slideInUp), 1200);
        }
        if (scrollIndicator) {
            setTimeout(() => addAnimationClass(scrollIndicator, animationClasses.fadeIn), 1500);
        }
    }

    // Intersection Observer para scroll reveal
    const observerOptions = {
        threshold: animationConfig.threshold,
        rootMargin: animationConfig.rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Determinar tipo de animación basado en la clase del elemento
                if (element.classList.contains('story-card')) {
                    if (element.querySelector('.story-image')) {
                        addAnimationClass(element, animationClasses.slideInLeft);
                    } else {
                        addAnimationClass(element, animationClasses.slideInRight);
                    }
                } else if (element.classList.contains('detail-card')) {
                    addAnimationClass(element, animationClasses.scaleIn);
                } else if (element.classList.contains('reception-card')) {
                    addAnimationClass(element, animationClasses.slideInUp);
                } else if (element.classList.contains('photo-content')) {
                    addAnimationClass(element, animationClasses.fadeIn);
                } else if (element.classList.contains('section-title')) {
                    addAnimationClass(element, animationClasses.slideInDown);
                } else if (element.classList.contains('form-group')) {
                    addAnimationClass(element, animationClasses.slideInUp);
                } else {
                    // Animación por defecto
                    addAnimationClass(element, animationClasses.fadeIn);
                }
                
                // Una vez que se anima, dejar de observar
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Función para inicializar scroll reveal
    function initializeScrollReveal() {
        const elementsToAnimate = document.querySelectorAll(`
            .story-card,
            .detail-card,
            .reception-card,
            .photo-content,
            .section-title,
            .form-group,
            .menu-preview,
            .ceremony-description
        `);

        elementsToAnimate.forEach(element => {
            // Asegurar que los elementos tengan el estado inicial correcto
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
    }

    // Efectos de parallax mejorados
    function initializeParallax() {
        const photoBackgrounds = document.querySelectorAll('.photo-background');
        
        if (window.innerWidth > 768) { // Solo en dispositivos no móviles
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                photoBackgrounds.forEach((background, index) => {
                    const speed = 0.3 + (index * 0.1);
                    const yPos = -(scrolled * speed);
                    background.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }

    // Efectos de hover mejorados
    function initializeHoverEffects() {
        // Efectos en tarjetas
        const cards = document.querySelectorAll('.story-card, .detail-card, .reception-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });

        // Efectos en secciones de fotos
        const photoSections = document.querySelectorAll('.photo-section');
        
        photoSections.forEach(section => {
            const photoContent = section.querySelector('.photo-content');
            
            if (photoContent) {
                section.addEventListener('mouseenter', function() {
                    photoContent.style.transform = 'scale(1.05)';
                    photoContent.style.transition = 'transform 0.5s ease';
                });
                
                section.addEventListener('mouseleave', function() {
                    photoContent.style.transform = 'scale(1)';
                });
            }
        });

        // Efectos en enlaces de navegación
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.color = 'var(--color-green)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.color = '';
            });
        });
    }

    // Animación del scroll indicator
    function initializeScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            // Animación de rebote
            setInterval(() => {
                scrollIndicator.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    scrollIndicator.style.transform = 'translateY(0)';
                }, 300);
            }, 2000);
        }
    }

    // Efectos de transición para el formulario
    function initializeFormEffects() {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    // Navegación móvil básica
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animación para el menú móvil
            if (navMenu.classList.contains('active')) {
                const navLinks = navMenu.querySelectorAll('.nav-link');
                navLinks.forEach((link, index) => {
                    setTimeout(() => {
                        addAnimationClass(link, animationClasses.slideInDown);
                    }, index * 100);
                });
            }
        });
    }
    
    // Navegación suave para enlaces internos
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Animación de transición antes del scroll
                document.body.style.opacity = '0.8';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                    }, 500);
                }, 300);
                
                // Cerrar menú móvil si está abierto
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Formulario RSVP estático
    const rsvpForm = document.querySelector('.rsvp-form form');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animación de envío
            const submitBtn = this.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = 'Enviando...';
                submitBtn.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    alert('¡Gracias por tu RSVP! Te confirmaremos pronto.');
                    this.reset();
                    submitBtn.textContent = 'Enviar RSVP';
                    submitBtn.style.transform = 'scale(1)';
                }, 1500);
            }
        });
    }
    
    // Scroll suave para el botón de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#fotos-1');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Optimización para dispositivos móviles
    function handleMobileOptimizations() {
        const photoBackgrounds = document.querySelectorAll('.photo-background');
        const isMobile = window.innerWidth <= 768;
        
        photoBackgrounds.forEach(background => {
            if (isMobile) {
                background.style.backgroundAttachment = 'scroll';
            } else {
                background.style.backgroundAttachment = 'fixed';
            }
        });
    }
    
    // Inicializar todas las funcionalidades
    function initializeAll() {
        // Pequeño delay para asegurar que el DOM esté completamente cargado
        setTimeout(() => {
            initializePageAnimations();
            initializeScrollReveal();
            initializeParallax();
            initializeHoverEffects();
            initializeScrollIndicator();
            initializeFormEffects();
            handleMobileOptimizations();
        }, 100);
    }

    // Ejecutar inicialización
    initializeAll();
    
    // Re-ejecutar optimizaciones móviles al cambiar tamaño de ventana
    window.addEventListener('resize', handleMobileOptimizations);
    
    console.log('Página web con efectos de transición y aparición cargada exitosamente! 🎉✨');
}); 