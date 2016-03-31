// From https://github.com/ar-juan/wcag-compliant-carousel

var wcagCarousel = (function() {
    // Partial credits: https://www.w3.org/WAI/tutorials/carousels/

    var carousel, slides, index, slidenav, settings;

  // Helper functions
    function forEachElement(elements, fn) {
        for (var i = 0; i < elements.length; i++)
            fn(elements[i], i);
    }

    var removeClass = function (element, className) {
      return element.className = (" " + element.className + " ").replace(" " + className + " ", " ");
    };

    var addClass = function (element, className) {
      return containsClass(element, className) ? false : (element.className += " " + className);
    };

    var containsClass = function (element, className) {
      return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
    };
  // End of: Helper functions

    var parseHTML = function(str) {
        var el =
        el.innerHTML = str;
        return el;
    };

    function init(set) {
        settings = set;
        carousel = document.getElementById(settings.id);
        slides = carousel.querySelectorAll('.slide');
        
        var ctrls = document.getElementById('wcag-carousel-controls');
        ctrls.querySelector('.btn-prev').addEventListener('click', function(){
            prevSlide();
        });

        ctrls.querySelector('.btn-next').addEventListener('click', function(){
            nextSlide();
        });

        if (settings.slidenav) {
            slidenav = document.getElementById('wcag-carousel-navigation');

            slidenav.addEventListener('click', function(event) {
                if (event.target.localName == 'button') {
                    setSlides(event.target.getAttribute('data-slide'), true);
                }
            }, true);
        }

        index = 0;
        setSlides(index);
    }

    function setSlides(new_current, setFocus) {
        setFocus = typeof setFocusHere !== 'undefined' ? setFocusHere : false;

        new_current = parseFloat(new_current);

        var length = slides.length;
        var new_next = new_current+1;
        var new_prev = new_current-1;

        if(new_next === length) {
            new_next = 0;
        } 
        if(new_prev < 0) {
            new_prev = length-1;
        }

        for (var i = slides.length - 1; i >= 0; i--) {
            slides[i].className = "slide";
        };

        slides[new_next].className = 'next slide';
        slides[new_prev].className = 'prev slide';
        slides[new_current].className = 'current slide';
        
        // lazy load the next
        if (slides[new_next] != undefined) {
            var img = slides[new_next].getElementsByTagName('img')[0];
            if (img.getAttribute('src') == null || img.getAttribute('src') == "") img.setAttribute('src', img.getAttribute('data-src'));
        }
        // lazy load the previous
        if (slides[new_prev] != undefined) {
            var img = slides[new_prev].getElementsByTagName('img')[0];
            if (img.getAttribute('src') == null || img.getAttribute('src') == "") img.setAttribute('src', img.getAttribute('data-src'));
        }
        // lazy load the current (if a thumbnail is clicked)
        if (slides[new_current] != undefined) {
            var img = slides[new_current].getElementsByTagName('img')[0];
            if (img.getAttribute('src') == null || img.getAttribute('src') == "") img.setAttribute('src', img.getAttribute('data-src'));
        }


        if(settings.slidenav) {
          var buttons = carousel.querySelectorAll('#wcag-carousel-navigation button');
            for (var i = buttons.length - 1; i >= 0; i--) {
              removeClass(buttons[i], "current");
            };
            addClass(buttons[new_current], "current");
        }

        if (setFocus) {
            slides[new_current].setAttribute('tabindex', '-1');
            slides[new_current].focus();
        }

        index = new_current;


        // eigen code
        var counterEmt = document.getElementById("wcag-carousel-counter");
        counterEmt.innerHTML = new_current+1 + "/" + length; // 0-based index
    }

    function nextSlide() {
        var length = slides.length,
        new_current = index + 1;

        if(new_current === length) {
            new_current = 0;
        }

        setSlides(new_current);

    }

    function prevSlide() {
        var length = slides.length,
        new_current = index - 1;

        if(new_current < 0) {
            new_current = length-1;
        }

        setSlides(new_current);

    }

    return {
        init:init,
        next:nextSlide,
        prev:prevSlide,
        goto:setSlides
    }
});
