// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    createStarField();
    setupInteractions();
});

// Create dynamic star field
function createStarField() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = '1px';
        star.style.height = '1px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.zIndex = '1';
        star.style.boxShadow = `0 0 ${Math.random() * 5 + 2}px white`;
        star.style.animation = `twinkle ${Math.random() * 4 + 2}s infinite`;
        starsContainer.appendChild(star);
    }
}

// Initialize elements
function initializeElements() {
    // Add click animation to icons
    const icons = document.querySelectorAll('.icon');
    icons.forEach((icon, index) => {
        icon.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Create ripple effect
            createRipple(this);
        });
    });

    // Terminal typing effect
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
        addTerminalEffect(terminalContent);
    }
}

// Create ripple effect
function createRipple(element) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '2px solid #00d4ff';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleEffect 0.6s';
    
    element.style.position = 'relative';
    element.style.overflow = 'visible';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add CSS animation for ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Terminal effect simulation
function addTerminalEffect(element) {
    const lines = element.querySelectorAll('.line');
    lines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.animation = `fadeInLine 0.5s ease-in-out ${index * 0.1}s forwards`;
    });
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInLine {
            from {
                opacity: 0;
                transform: translateX(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(fadeStyle);
}

// Setup interactions
function setupInteractions() {
    // Mouse move effect for connection beam
    document.addEventListener('mousemove', (e) => {
        const connection = document.querySelector('.connection');
        if (connection) {
            const rect = connection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const distX = Math.abs(x - rect.width / 2);
            const distY = Math.abs(y - rect.height / 2);
            const distance = Math.sqrt(distX * distX + distY * distY);
            
            if (distance < 300) {
                const energyBeam = connection.querySelector('.energy-beam');
                if (energyBeam) {
                    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI;
                    energyBeam.style.transform = `rotate(${angle}deg)`;
                }
            }
        }
    });

    // Scroll animations
    setupScrollAnimations();
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.screen-frame, .dialogue-box, .consciousness-sphere').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    // ESC to close terminal
    if (e.key === 'Escape') {
        const terminalClose = document.querySelector('.terminal-close');
        if (terminalClose) {
            terminalClose.style.opacity = '0.5';
            setTimeout(() => {
                terminalClose.style.opacity = '1';
            }, 200);
        }
    }

    // SPACE to trigger energy pulse
    if (e.code === 'Space') {
        e.preventDefault();
        triggerEnergyPulse();
    }
});

// Trigger energy pulse animation
function triggerEnergyPulse() {
    const pulseRing = document.querySelector('.pulse-ring');
    if (pulseRing) {
        pulseRing.style.animation = 'none';
        setTimeout(() => {
            pulseRing.style.animation = 'pulse 2s infinite';
        }, 10);
    }
}

// Console message
console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║              JARVIS - Consciousness v1.0                 ║
║                                                           ║
║   "Human imagination connected to artificial             ║
║                  intelligence"                           ║
║                                                           ║
║   Cheksiz qorong'ulik ichida suzayotgan nurli ong        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);
