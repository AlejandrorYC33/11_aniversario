// Efectos de scroll suave y animaciones
document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a elementos
    const animatedElements = document.querySelectorAll('.moment-card, .timeline-item, .reason-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto parallax en el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Efecto de partículas flotantes en toda la página
createFloatingHearts();
createGlobalFloatingHearts();

    // Efecto de escritura en el título principal
    typeWriter();

    // Efecto de hover en las tarjetas de momentos
    addHoverEffects();

    // Contador animado para los meses
    animateCounter();

    // Efecto de click en los corazones
    addHeartClickEffect();
});

// Función para crear corazones flotantes en el hero
function createFloatingHearts() {
    const hero = document.querySelector('.hero');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const heart = document.createElement('div');
            heart.innerHTML = '💜';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = `floatUp ${Math.random() * 3 + 2}s linear forwards`;
            
            hero.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }, 2000);
}

// Función para crear corazones flotantes en toda la página
function createGlobalFloatingHearts() {
    const heartTypes = ['💜', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
    
    setInterval(() => {
        if (Math.random() > 0.1) { // Mucho más frecuente
            const heart = document.createElement('div');
            heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.opacity = Math.random() * 0.8 + 0.3;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = `globalFloatUp ${Math.random() * 4 + 3}s linear forwards`;
            heart.style.color = `hsl(${Math.random() * 60 + 270}, 70%, 60%)`; // Tonos morados
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 7000);
        }
    }, 300); // Cada 300ms - mucho más frecuente
    
    // Crear corazones adicionales más frecuentemente
    setInterval(() => {
        if (Math.random() > 0.2) { // Mucho más frecuente
            const heart = document.createElement('div');
            heart.innerHTML = '💜';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = Math.random() * 15 + 10 + 'px';
            heart.style.opacity = Math.random() * 0.6 + 0.2;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = `globalFloatUp ${Math.random() * 3 + 2}s linear forwards`;
            heart.style.color = '#6B46C1';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }, 200); // Cada 200ms - mucho más frecuente
}

// CSS para la animación de corazones flotantes
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes globalFloatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
            opacity: 0.8;
        }
        25% {
            transform: translateY(-25vh) translateX(20px) rotate(90deg) scale(1);
            opacity: 1;
        }
        50% {
            transform: translateY(-50vh) translateX(-15px) rotate(180deg) scale(1.2);
            opacity: 0.9;
        }
        75% {
            transform: translateY(-75vh) translateX(30px) rotate(270deg) scale(0.8);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) translateX(-10px) rotate(360deg) scale(0.3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto de escritura en el título
function typeWriter() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid white';
    
    let i = 0;
    const timer = setInterval(() => {
        title.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(timer);
            title.style.borderRight = 'none';
        }
    }, 100);
}

// Efectos de hover mejorados
function addHoverEffects() {
    const cards = document.querySelectorAll('.moment-card, .reason-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contador animado
function animateCounter() {
    const counterElements = document.querySelectorAll('.timeline-date');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.match(/\d+/));
                
                if (number) {
                    animateNumber(element, 0, number, 1000);
                }
            }
        });
    });
    
    counterElements.forEach(el => observer.observe(el));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = element.textContent.replace(/\d+/, current);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Efecto de click en corazones
function addHeartClickEffect() {
    const hearts = document.querySelectorAll('.heart, .footer-hearts span');
    
    hearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear explosión de corazones
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const explosionHeart = document.createElement('div');
                    explosionHeart.innerHTML = '💜';
                    explosionHeart.style.position = 'fixed';
                    explosionHeart.style.left = e.clientX + 'px';
                    explosionHeart.style.top = e.clientY + 'px';
                    explosionHeart.style.fontSize = '20px';
                    explosionHeart.style.pointerEvents = 'none';
                    explosionHeart.style.zIndex = '9999';
                    explosionHeart.style.animation = `explode 1s ease-out forwards`;
                    
                    document.body.appendChild(explosionHeart);
                    
                    setTimeout(() => {
                        if (explosionHeart.parentNode) {
                            explosionHeart.parentNode.removeChild(explosionHeart);
                        }
                    }, 1000);
                }, i * 100);
            }
        });
    });
}

// CSS para la animación de explosión
const explosionStyle = document.createElement('style');
explosionStyle.textContent = `
    @keyframes explode {
        0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(3) rotate(360deg) translateY(-100px);
            opacity: 0;
        }
    }
    
    @keyframes videoHeartFloat {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.3);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg) scale(0.8);
            opacity: 0.9;
        }
        50% {
            transform: translateY(-40px) translateX(-15px) rotate(180deg) scale(1.1);
            opacity: 1;
        }
        75% {
            transform: translateY(-60px) translateX(25px) rotate(270deg) scale(0.9);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100px) translateX(-30px) rotate(360deg) scale(0.2);
            opacity: 0;
        }
    }
    
    @keyframes loveMessageFloat {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
            opacity: 0.4;
        }
        20% {
            transform: translateY(-15px) translateX(5px) rotate(5deg) scale(0.8);
            opacity: 0.8;
        }
        40% {
            transform: translateY(-30px) translateX(-10px) rotate(-3deg) scale(1.0);
            opacity: 1;
        }
        60% {
            transform: translateY(-50px) translateX(15px) rotate(2deg) scale(1.1);
            opacity: 0.9;
        }
        80% {
            transform: translateY(-70px) translateX(-5px) rotate(-1deg) scale(0.9);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-120px) translateX(20px) rotate(0deg) scale(0.3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(explosionStyle);

// Efecto de scroll suave para el indicador
document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
    document.querySelector('.video-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Efecto de parallax en las secciones
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.memories-section, .reasons-section');
    
    parallaxElements.forEach((element, index) => {
        const rate = scrolled * 0.1 * (index % 2 === 0 ? 1 : -1);
        element.style.transform = `translateY(${rate}px)`;
    });
});

// Efecto de resplandor en el video al hacer hover
document.querySelector('.video-container')?.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 25px 50px rgba(107, 70, 193, 0.4)';
});

document.querySelector('.video-container')?.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 20px 40px rgba(107, 70, 193, 0.3)';
});

// Efecto de corazones flotantes constantes en la sección del video
function addVideoHeartEffect() {
    let heartInterval;
    let isActive = true;
    
    // Iniciar corazones automáticamente cuando la página se carga
    function startVideoHearts() {
        if (heartInterval) return; // Evitar múltiples intervalos
        
        heartInterval = setInterval(() => {
            createVideoHeart();
            // Agregar mensaje "Te amo" mucho más frecuentemente
            if (Math.random() > 0.3) {
                createLoveMessage();
            }
        }, 300); // Corazón cada 300ms - más frecuente
    }
    
    function stopVideoHearts() {
        if (heartInterval) {
            clearInterval(heartInterval);
            heartInterval = null;
        }
    }
    
    // Iniciar corazones inmediatamente
    startVideoHearts();
    
    // También escuchar eventos del video para mantener consistencia
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', function() {
            if (!isActive) {
                isActive = true;
                startVideoHearts();
            }
        });
        
        video.addEventListener('pause', function() {
            // No detener corazones, solo marcar como pausado
            isActive = false;
        });
    }
    
    function createVideoHeart() {
        const videoContainer = document.querySelector('.video-container');
        const containerRect = videoContainer.getBoundingClientRect();
        
        // Crear corazón a la izquierda o derecha del video
        const isLeft = Math.random() > 0.5;
        const heart = document.createElement('div');
        heart.innerHTML = '💜';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 25 + 'px';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10';
        heart.style.animation = `videoHeartFloat ${Math.random() * 2 + 4}s ease-out forwards`;
        
        // Posición aleatoria a los lados del video
        if (isLeft) {
            heart.style.left = (containerRect.left - 80 + Math.random() * 30) + 'px';
        } else {
            heart.style.left = (containerRect.right + 20 + Math.random() * 30) + 'px';
        }
        
        // Altura aleatoria dentro del área del video
        heart.style.top = (containerRect.top + Math.random() * containerRect.height - 20) + 'px';
        
        // Rotación inicial aleatoria
        heart.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 6000);
    }
    
    function createLoveMessage() {
        const videoContainer = document.querySelector('.video-container');
        const containerRect = videoContainer.getBoundingClientRect();
        
        // Array de mensajes románticos
        const loveMessages = [
            'Te amo 💜',
            'Mi amor 💕',
            'Eres mi vida 💖',
            'Para siempre 💜',
            'Mi corazón 💗',
            'Siempre juntos 💜',
            'Mi todo 💕',
            'Eres perfecta 💖',
            'Mi princesa 💜',
            'Te adoro 💗'
        ];
        
        // Crear mensaje romántico a los lados del video
        const isLeft = Math.random() > 0.5;
        const message = document.createElement('div');
        message.innerHTML = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        message.style.position = 'fixed';
        message.style.fontSize = Math.random() * 8 + 16 + 'px';
        message.style.fontWeight = '600';
        message.style.color = '#6B46C1';
        message.style.opacity = Math.random() * 0.8 + 0.2;
        message.style.pointerEvents = 'none';
        message.style.zIndex = '10';
        message.style.animation = `loveMessageFloat ${Math.random() * 2 + 5}s ease-out forwards`;
        message.style.textShadow = '2px 2px 4px rgba(107, 70, 193, 0.3)';
        message.style.fontFamily = 'Dancing Script, cursive';
        
        // Posición aleatoria a los lados del video
        if (isLeft) {
            message.style.left = (containerRect.left - 120 + Math.random() * 50) + 'px';
        } else {
            message.style.left = (containerRect.right + 30 + Math.random() * 50) + 'px';
        }
        
        // Altura aleatoria dentro del área del video
        message.style.top = (containerRect.top + Math.random() * containerRect.height - 30) + 'px';
        
        // Rotación inicial aleatoria
        message.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 7000);
    }
}

// Llamar a la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    addVideoHeartEffect();
});

// Mensaje especial al cargar la página
window.addEventListener('load', function() {
    setTimeout(() => {
        const message = document.createElement('div');
        message.innerHTML = '💜 ¡Feliz 11 meses de amor! 💜';
        message.style.position = 'fixed';
        message.style.top = '20px';
        message.style.right = '20px';
        message.style.background = 'linear-gradient(135deg, #6B46C1, #C084FC)';
        message.style.color = 'white';
        message.style.padding = '15px 25px';
        message.style.borderRadius = '25px';
        message.style.fontSize = '16px';
        message.style.fontWeight = '600';
        message.style.zIndex = '10000';
        message.style.animation = 'slideInRight 0.5s ease-out';
        message.style.boxShadow = '0 10px 25px rgba(107, 70, 193, 0.3)';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 500);
        }, 3000);
    }, 1000);
});

// CSS para las animaciones de mensaje
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyle);

// Función para ajustar espaciado automáticamente en móviles
function adjustMobileSpacing() {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    
    const reasonsSection = document.querySelector('.reasons-section');
    const finalMessage = document.querySelector('.final-message');
    
    if (!reasonsSection || !finalMessage) return;
    
    // Calcular la altura del contenido de las razones
    const reasonsHeight = reasonsSection.offsetHeight;
    const reasonsTop = reasonsSection.offsetTop;
    
    // Calcular la posición donde debe empezar el mensaje final (separación mínima)
    const messageStartPosition = reasonsTop + reasonsHeight + 20; // Solo 20px de separación
    
    // Aplicar el espaciado dinámico
    finalMessage.style.marginTop = `${messageStartPosition}px`;
    finalMessage.style.position = 'relative';
    finalMessage.style.zIndex = '10';
    
    // Padding mínimo del mensaje final
    finalMessage.style.paddingBottom = '50px'; // Padding mínimo fijo
    
    console.log(`Móvil detectado: ${window.innerWidth}px`);
    console.log(`Altura razones: ${reasonsHeight}px`);
    console.log(`Posición mensaje: ${messageStartPosition}px`);
}

// Aplicar ajustes cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que se carguen todos los elementos
    setTimeout(() => {
        adjustMobileSpacing();
    }, 500);
});

// Aplicar ajustes cuando se redimensiona la ventana
window.addEventListener('resize', function() {
    setTimeout(() => {
        adjustMobileSpacing();
    }, 100);
});

// Aplicar ajustes cuando se hace scroll (por si hay lazy loading)
window.addEventListener('scroll', function() {
    setTimeout(() => {
        adjustMobileSpacing();
    }, 100);
});
