$(document).ready(function() {
    // Interactive Ripple Effect
    try {
        $('#home').ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });
    } catch (e) {
        console.error("Ripple effect failed to load", e);
    }

    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });
});
