/**
 * AI Safety Portfolio Logic
 * Calibrated Particle System for "Safe Data Flows"
 */

// Sync with light theme
pc.uniforms.uColor.value.set(0x003a8c);

// Prevent randomization to maintain SME professional authority
// Instead, use a subtle reaction to clicks
document.body.addEventListener('click', (e) => {
    // Only pulse if not clicking a link
    if (e.target.tagName !== 'A') {
        const originalSize = pc.uniforms.uPointSize.value;
        pc.uniforms.uPointSize.value = 5;
        setTimeout(() => {
            pc.uniforms.uPointSize.value = originalSize;
        }, 150);
    }
});
// --- Scroll Spy Logic ---
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section is near top
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active from all
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active to current
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// --- Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (carouselContainer && carouselItems.length > 0) {
        // Generate Dots
        carouselItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                carouselItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });

            indicatorsContainer.appendChild(dot);
        });

        // Update Dots on Scroll
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
