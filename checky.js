(function ($) {
 
    $.fn.checky = function(options) {
 
        var _this_ = this;
        var settings = {};

        var $label;
        var $options;

        // if it's a string, it's a method call
        if (typeof(options) == 'string') {
            switch (options) {
                default:
                    break;
            }
        } 
        // otherwise it's a set of options
        else {
            settings = $.extend({
                showCounter: true,
                counterPosition: 'before' // 'after'
            }, options);

            init();
        }
 
        function init() {
            $label      = _this_.find('.checky-label');
            $options    = _this_.find('.checky-options');

            $label.on('click', onLabelClick);
            $label.on('mousedown', onLabelMouseDown);
            _this_.on('click', 'label', onItemClick);
        };

        function onLabelClick(evt) {
            evt.stopPropagation();
            _this_.toggleClass('active');

            // if it's active, add a window click listener
            if (_this_.hasClass('active')) {
                $label.addClass('pressed');
                $(window).on('click', onWindowClick);
                _this_.on('click', onCheckyClick);
            }
            // or else remove the listener
            else {
                $label.removeClass('pressed');
                $(window).off('click', onWindowClick);
                _this_.off('click', onCheckyClick);
            }
        }

        function onLabelMouseDown(evt) {
            $label.addClass('pressed');
            $label.on('mouseup', onLabelMouseUp);
            $(window).on('mouseup', onLabelMouseUp);
        }

        function onLabelMouseUp(evt) {
            $label.removeClass('pressed');
            $label.off('mouseup', onLabelMouseUp);
            $(window).off('mouseup', onLabelMouseUp);
        }

        // If the checkbox/label is clicked
        function onItemClick(evt) {
            // Update the display counter
            if (settings.showCounter) {
                var count = $options.find('input[type=checkbox]:checked').size();
                var $counter = $label.find('.counter');

                if (count == 0) {
                    $counter.remove();
                    _this_.removeClass('has-selected');
                }
                else {
                    _this_.addClass('has-selected')
                    if ($counter.size() == 0) {
                        $counter = $('<span>').addClass('counter');
                        if (settings.counterPosition == 'before') $label.prepend($counter);
                        if (settings.counterPosition == 'after') $label.append($counter);
                    }
                    $counter.html(count);
                }
            }

            // Broadcast a change event
            if (settings.change) settings.change({
                originalEvent: evt,
                selectedItems: $options.find('input[type=checkbox]:checked')
            });
        }

        // This function is mainly to catch dropdown item clicks
        // without propagating to onWindowClick()
        function onCheckyClick(evt) {
            evt.stopPropagation();
        }

        function onWindowClick(evt) {
            $label.click();
        }

        return this;
    };
 
}(jQuery));