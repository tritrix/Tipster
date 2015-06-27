 $("input[type=submit]").click(function() {
   $.ajax({
     url: "",
     type: "POST",
     contentType: "application/json;charset=utf-8",
     data: JSON.stringify({
       UserName: $("input[placeholder=Username]").val(),
       Password: $("input[placeholder=Password]").val()
     }),
     success: function(response) {
       alert("success");
     },
     error: function(e) {
       alert("error");
     }
   });
 });


/*script for responsive tabs */

function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
}
$('#accordion').on('hidden.bs.collapse', toggleChevron);
$('#accordion').on('shown.bs.collapse', toggleChevron);
/*script for tabs in user profile*/


window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        console.log(Array.prototype.slice.call(arguments))
    }
};
(function ($, window, document, undefined) {
    "use strict";
    var pluginName = 'responsiveTabs';

    function Plugin(element, options) {
        // Members
        var el = element,
            $el = $(element),
            windowSize;
        options = $.extend({}, $.fn[pluginName].defaults, options);

        function slideTab($tabEl, inOrOut, leftOrRight) {
            var oldStyles = {
                    "margin-left": $tabEl.css('margin-left'),
                    "opacity": $tabEl.css('opacity'),
                    "position": $tabEl.css('position')
                },
                startAnimation = {},
                endAnimation = {};
            if (inOrOut === 'out') {
                $tabEl.css('position', 'absolute');
                endAnimation["opacity"] = 0;
                endAnimation["margin-left"] = $(window).width();
                if (leftOrRight === 'left') {
                    endAnimation["margin-left"] *= -1;
                }
            } else if (inOrOut === 'in') {
                startAnimation["opacity"] = 0;
                startAnimation["margin-left"] = $(window).width();
                if (leftOrRight === 'left') {
                    startAnimation["margin-left"] *= -1;
                }
                $tabEl.css(startAnimation);
                $tabEl.show();
                endAnimation["opacity"] = oldStyles["opacity"];
                endAnimation["margin-left"] = oldStyles["margin-left"];
            }
            // do the animation
            $tabEl.animate(
                endAnimation,
                options.slideTime,
                function () {
                    if (inOrOut === 'out') {
                        $tabEl.hide();
                        $tabEl.css(oldStyles);
                    }
                }
            );
        }

        function setSmallStyle() {
            $(".nav-tabs > li", $el).css("text-align", "center");
            $(".nav-tabs > li:not(.active)", $el).hide();
            $("<a class='right tab-control'>&rsaquo;</a>").appendTo($(".nav-tabs li:not(:last-child)", $el))
                .each(function (i) {
                    var thisLi = $(this).parents("ul").first().children("li:nth-child(" + (i + 1) + ")"),
                        thisTab = $(thisLi).children("a[href]"),
                        nextLi = $(this).parents("ul").first().children("li:nth-child(" + (i + 2) + ")"),
                        nextTab = $(nextLi).children("a[href]");
                    $(this).click(function () {
                        slideTab(thisLi, "out", "left");
                        slideTab(nextLi, "in", "right");
                        $(nextTab).tab('show');
                    });
                });
            $("<a class='left tab-control'>&lsaquo;</a>").prependTo($(".nav-tabs li:not(:first-child)", $el))
                .each(function (i) {
                    var thisLi = $(this).parents("ul").first().children("li:nth-child(" + (i + 2) + ")"),
                        thisTab = $(thisLi).children("a[href]"),
                        prevLi = $(this).parents("ul").first().children("li:nth-child(" + (i + 1) + ")"),
                        prevTab = $(prevLi).children("a[href]");
                    $(this).click(function () {
                        slideTab(thisLi, "out", "right");
                        slideTab(prevLi, "in", "left");
                        $(prevTab).tab('show');
                    });
                });
            $(".nav-tabs li:first-child", $el).prepend("<span class='left tab-control-spacer'> </span>");
            $(".nav-tabs li:last-child", $el).append("<span class='right tab-control-spacer'> </span>");
        }

        function setLargeStyle() {
            $(".nav-tabs > li", $el).css("text-align", "left");
            $(".nav-tabs > li:not(.active)", $el).show();
            $(".tab-control", $el).remove();
            $(".tab-control-spacer", $el).remove();

        }

        function windowResized() {
                var newWidth = $('body').width();
                if ((windowSize > options.maxSmallWidth) &&
                    (newWidth <= options.maxSmallWidth)) {
                    setSmallStyle();
                } else if ((windowSize <= options.maxSmallWidth) &&
                    (newWidth > options.maxSmallWidth)) {
                    setLargeStyle();
                }
                windowSize = newWidth;
            }
            // Initialize plugin.
        function init() {
            windowSize = $('body').width();
            if (windowSize <= options.maxSmallWidth) {
                setSmallStyle();
            }
            $(window).on('resize', windowResized);
            hook('onInit');
        }

        function option(key, val) {
            if (val) {
                options[key] = val;
            } else {
                return options[key];
            }
        }

        function destroy() {
            $(window).off('resize', windowResized);
            setLargeStyle();
            $el.each(function () {
                var el = this,
                    $el = $(this);
                hook('onDestroy');
                $el.removeData('plugin_' + pluginName);
            });
        }

        function hook(hookName) {
            if (options[hookName] !== undefined) {
                options[hookName].call(el);
            }
        }

        init();
        return {
            option: option,
            destroy: destroy
        };
    }
    $.fn[pluginName] = function (options) {
        if (typeof arguments[0] === 'string') {
            var methodName = arguments[0];
            var args = Array.prototype.slice.call(arguments, 1);
            var returnVal;
            this.each(function () {
                if ($.data(this, 'plugin_' + pluginName) &&
                    typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
                    returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });
            if (returnVal !== undefined) {
                return returnVal;
            } else {
                return this;
            }
        } else if (typeof options === "object" || !options) {

            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        }
    };
    $.fn[pluginName].defaults = {
        maxSmallWidth: 767,
        slideTime: 500,
        onInit: function () {},
        onDestroy: function () {}
    };

})(jQuery, window, document);
$(document).ready(function () {
    $(".tabbable.responsive").responsiveTabs();
});

