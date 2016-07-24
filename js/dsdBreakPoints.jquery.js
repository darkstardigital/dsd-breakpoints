/**
 * dsdBreakPoints
 *
 * Copyright (c) 2016 Darkstar Digital
 * Released under the MIT license
 *
 * When a resize event is triggered, this plugin adds or removes classes on the given element(s) based on predefined
 * breakpoints and widths. Widths are calculated as the width of the container element, not the document.
 *
 * Break points should be specified in the form of {minimum_size: class} and be in order from smallest size to largest.
 *
 * Setting the smallest width to 0 is recommended.
 */
(function($) {
    $.fn.dsdBreakPoints = function(options) {
        if (!this.length) return this;

        options = $.extend({}, $.fn.dsdBreakPoints.default_options, options);

        $(this).each(function() {
            initialize({
                container: $(this),
                options: options
            });
        });

        return this;
    };

    /**
     * Break points should be in the form of {minimum_size: class} and be in order from smallest size to largest
     *
     * @type {{resizeEvent: string, breakPoints: {int: string}}}
     */
    $.fn.dsdBreakPoints.default_options = {
        resizeEvent: 'resize.dsd.breakpoints',
        breakPoints: {}
    };

    /**
     * Bind events
     *
     * @param data
     */
    function initialize(data) {
        $(window).on(data.options.resizeEvent, function() {
            resize(data);
        });

        data.container.on('resize.dsd.breakpoints', function() {
            resize(data);
        });
    }

    /**
     * Runs when the resize event is triggered
     *
     * @param data
     */
    function resize(data) {
        var class_assigned = false;
        var ok_bp = null;
        var last_bp = data.container.data('dsdbreakpoint');
        var new_bp = null;
        var width = data.container.width();

        for (var x in data.options.breakPoints) {
            if (data.options.breakPoints.hasOwnProperty(x)) {
                if (width >= x) {
                    // potentially ok (too small)
                    ok_bp = x;
                    data.container.removeClass(data.options.breakPoints[x]);
                } else {
                    // break point is too big
                    if (!class_assigned && ok_bp != null) {
                        // this is the first one that's too big, so grab the last one
                        data.container.addClass(data.options.breakPoints[ok_bp]);
                        new_bp = ok_bp;
                        class_assigned = true;
                    }

                    // bad class
                    data.container.removeClass(data.options.breakPoints[x]);
                }
            }
        }

        if (!class_assigned && ok_bp != null) {
            // the largest class is the right one - gotta add it
            data.container.addClass(data.options.breakPoints[ok_bp]);
            new_bp = ok_bp;
        }

        if (new_bp != last_bp) {
            data.container.data('dsdbreakpoint', new_bp);
            data.container.trigger('breakpointchanged');
        }
    }
})(jQuery);