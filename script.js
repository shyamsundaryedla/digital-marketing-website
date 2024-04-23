// Flag to track whether the specialty counter animation has already been triggered
let specialtyCounterAnimated = false;

function animateCounter(element, start, end, duration) {
    let startTime = null;

    // The animation function, which is called recursively
    const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        element.textContent = value + "+";

        if (value < end) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end + "+"; // Ensure it ends at the correct value
        }
    };

    window.requestAnimationFrame(step);
}

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', (event) => {
    // Query all counters
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target'); // Get the target count from the data attribute
        animateCounter(counter, 0, target, 2000); // Animate from 0 to target in 2000 milliseconds
    });

    // Create an Intersection Observer for Why Choose Us cards
    const whyChooseUsObserver = new IntersectionObserver(handleWhyChooseUsIntersection, { threshold: 0.5 });

    // Select all the Why Choose Us cards
    const whyChooseUsItems = document.querySelectorAll('.why-choose-us-item');

    // Observe each Why Choose Us card
    whyChooseUsItems.forEach(item => {
        whyChooseUsObserver.observe(item);
    });
});

function handleWhyChooseUsIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Check if the intersecting element is the specialty section
            if (entry.target.classList.contains('specialty-section') && !specialtyCounterAnimated) {
                const counterElement = entry.target.querySelector('.your-counter-element');

                if (counterElement) {
                    const startValue = 0; // Replace with your actual starting value
                    const endValue = 100; // Replace with your actual ending value
                    const animationDuration = 2000; // Replace with your desired duration in milliseconds

                    animateCounter(counterElement, startValue, endValue, animationDuration);

                    // Set the flag to true, so the animation won't be triggered again
                    specialtyCounterAnimated = true;
                }
            }

            observer.unobserve(entry.target);
        }
    });
}

// Function to animate cards when they come into view
function animateWhyChooseUsCards() {
    whyChooseUsItems.forEach(function (card) {
        if (isInViewport(card)) {
            card.classList.add('fade-up');
        }
    });
}

// Initial check in case some cards are already in the viewport on page load
animateWhyChooseUsCards();

// Listen for scroll events and check if Why Choose Us cards are in the viewport
window.addEventListener('scroll', animateWhyChooseUsCards);

// Reset the flag when the page is reloaded
window.addEventListener('beforeunload', function () {
    specialtyCounterAnimated = false;
});
