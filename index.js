$(document).ready(function(){
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        var blurValue = Math.min(scrollTop / 10, 20);
        $('#bg').css('filter', 'blur(' + blurValue + 'px)');
        var imagePosition = +scrollTop * 0.5;
        var opacity = Math.max(1 - scrollTop / 500, 0.25);
        $('#home .logo').css({
            'transform': 'translateY(' + imagePosition + 'px)',
            'opacity': opacity
        });
    });
});
