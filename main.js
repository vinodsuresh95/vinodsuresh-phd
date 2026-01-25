/**
 * AI Safety Portfolio Logic
 * Calibrated Particle System for "Safe Data Flows"
 */

// Sync with light theme (defensive)
try {
    if (typeof pc !== 'undefined' && pc.uniforms && pc.uniforms.uColor) {
        pc.uniforms.uColor.value.set(0x003a8c);
    }
} catch (err) {
    console.warn('Particle color sync skipped', err);
}

// Click pulse (defensive)
document.body.addEventListener('click', (e) => {
    try {
        if (e.target.tagName !== 'A' && typeof pc !== 'undefined' && pc.uniforms && pc.uniforms.uPointSize) {
            const originalSize = pc.uniforms.uPointSize.value;
            pc.uniforms.uPointSize.value = 5;
            setTimeout(() => {
                pc.uniforms.uPointSize.value = originalSize;
            }, 150);
        }
    } catch (err) { /* ignore */ }
});

// --- Scroll Spy Logic ---
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));

// --- Carousel Logic & Accessible Dots ---
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    let indicatorsContainer = document.querySelector('.carousel-indicators');

    if (carouselContainer && carouselItems.length > 0) {
        // Ensure the indicators container exists
        if (!indicatorsContainer) {
            indicatorsContainer = document.createElement('div');
            indicatorsContainer.className = 'carousel-indicators';
            carouselContainer.insertAdjacentElement('afterend', indicatorsContainer);
        }
        indicatorsContainer.style.display = 'flex';
        indicatorsContainer.setAttribute('role', 'tablist');

        // Generate dots as buttons (keyboard-accessible)
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('indicator-dot');
            dot.type = 'button';
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.setAttribute('role', 'tab');
            dot.tabIndex = 0;
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                carouselItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                dot.focus();
            });

            dot.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    const prev = Math.max(0, index - 1);
                    carouselItems[prev].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else if (e.key === 'ArrowRight') {
                    const next = Math.min(carouselItems.length - 1, index + 1);
                    carouselItems[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });

            indicatorsContainer.appendChild(dot);
        });

        // Update active dot when slides intersect
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const index = Array.from(carouselItems).indexOf(entry.target);
                    document.querySelectorAll('.indicator-dot').forEach(d => d.classList.remove('active'));
                    const activeDot = indicatorsContainer.children[index];
                    if (activeDot) activeDot.classList.add('active');
                }
            });
        }, { root: carouselContainer, threshold: 0.5 });

        carouselItems.forEach(item => carouselObserver.observe(item));
    }
});

// -------------------- Particle toggle --------------------
(function setupParticleToggle(){
    function initToggle() {
        document.body.classList.add('no-particles'); // hidden by default

        const btn = document.createElement('button');
        btn.id = 'particles-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-pressed', 'false');
        btn.textContent = 'Particles: Off';
        btn.style.cssText = [
            'position:fixed',
            'bottom:16px',
            'right:16px',
            'z-index:9999',
            'padding:8px 10px',
            'border-radius:6px',
            'border:1px solid rgba(0,0,0,0.08)',
            'background:#fff',
            'color:#111',
            'font-size:13px',
            'box-shadow:0 6px 18px rgba(0,0,0,0.08)',
            'cursor:pointer',
            'backdrop-filter: blur(6px)'
        ].join(';');

        btn.addEventListener('click', () => {
            const nowOn = !document.body.classList.toggle('no-particles');
            btn.textContent = nowOn ? 'Particles: On' : 'Particles: Off';
            btn.setAttribute('aria-pressed', nowOn.toString());
        });

        document.addEventListener('keydown', (e) => {
            const active = document.activeElement;
            const inInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
            if (inInput) return;
            if (e.key === 'p' || e.key === 'P') btn.click();
        });

        document.body.appendChild(btn);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initToggle);
    else initToggle();
})();
