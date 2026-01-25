/**
 * AI Safety Portfolio Logic
 * Calibrated Particle System for "Safe Data Flows"
 */
import { particlesCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'

const pc = particlesCursor({
    el: document.getElementById('app'),
    gpgpuSize: 512,
    colors: [0x003a8c, 0x006d75], // Research Blue and Safety Teal
    color: 0x003a8c,
    coordScale: 0.6,
    noiseIntensity: 0.0005, // Very subtle, stable noise
    noiseTimeCoef: 0.0001,
    pointSize: 2, // Fine, precise data points
    pointDecay: 0.004, // Quick decay for a clean, non-distracting look
    sleepRadiusX: 250,
    sleepRadiusY: 250,
    sleepTimeCoefX: 0.001,
    sleepTimeCoefY: 0.001
});

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
            carouselItems[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
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
