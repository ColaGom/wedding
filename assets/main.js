$.isMobile = function(type) {
    var reg = [];
    var any = {
        blackberry: 'BlackBerry',
        android: 'Android',
        windows: 'IEMobile',
        opera: 'Opera Mini',
        ios: 'iPhone|iPad|iPod'
    };
    type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
    if ('*' == type) reg = $.map(any, function(v) {
        return v;
    });
    else if (type in any) reg.push(any[type]);
    return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
};

$(function() {
    $.fn.outerFind = function(selector) {
        return this.find(selector).addBack(selector);
    };
    // .mbr-parallax-background
    function initParallax(card) {
        setTimeout(function() {
            $(card).outerFind('.mbr-parallax-background')
                .jarallax({
                    speed: 0.6,
                    imgPosition: '50% 10%'
                });
        }, 0);
    }

    function destroyParallax(card) {
        $(card).jarallax('destroy').css('position', '');
    }

    if ($.fn.jarallax && !$.isMobile()) {
        $(window).on('update.parallax', function(event) {
            setTimeout(function() {
                var $jarallax = $('.mbr-parallax-background');

                $jarallax.jarallax('coverImage');
                $jarallax.jarallax('clipContainer');
                $jarallax.jarallax('onScroll');
            }, 0);
        });

        initParallax(document.body);
    }

});