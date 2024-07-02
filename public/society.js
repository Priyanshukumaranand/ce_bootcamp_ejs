/* full-screen-jquery-content-slider
 * <https://github.com/jacobxperez/full-screen-jquery-content-slider>
 * Copyright (C) 2020 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
$(function() {

	// Slider
	$(".slider").each(function() {
		var slider = $(this),
			slides = slider.find(".slide"),
			totalSlides = slides.length,
			currIndex = 0,
			imgCache = [],
			intervalTime = 5000,
			sliderInterval;

		// fades in and out slides
		function cycleItems() {
			var currSlide = slides.eq(currIndex);

			slides.fadeOut(500).css("z-index", 1);
			currSlide.fadeIn(500).css("z-index", 5);
		} // end cycleItem

		// Changes slides
		function changeSlide() {
			currIndex += 1;

			if (currIndex > totalSlides - 1) {
				currIndex = 0;
			}

			cycleItems();
		} // end changeSlide

		// Timer for changeSlide
		function startSlider() {
			clearInterval(sliderInterval);

			sliderInterval = setInterval(function() {
				changeSlide();
			}, intervalTime);
		} // end startSlider

		// preload the img before starting the Slider
		(function preloader() {
			if (currIndex < totalSlides) {
				// load img
				imgCache[currIndex] = new Image();
				imgCache[currIndex].src = slides.eq(currIndex).find("img").attr("src");
				imgCache[currIndex].onload = function() {
					currIndex += 1;
					preloader();
				};
			} else {
				currIndex = 0;
				cycleItems();
				startSlider();
			}
		}()); // end preloader

		// click on next
		$(".next-slide").on("click", function() {
			currIndex += 1;

			if (currIndex > totalSlides - 1) {
				currIndex = 0;
			}

			cycleItems();
			startSlider(intervalTime = 10000);
		}); // end click of next

		// click on prev
		$(".prev-slide").on("click", function() {
			currIndex -= 1;

			if (currIndex < 0) {
				currIndex = totalSlides - 1;
			}

			cycleItems();
			startSlider(intervalTime = 10000);
		}); // end click on prev
	}); // end Slider

});




function flipCard(card) {
    card.classList.toggle('flipped');

    // Optional: Add .snap or .blip class for additional transformation
    if (card.classList.contains('flipped')) {
        card.classList.remove('blip');
        card.classList.add('snap');
    } else {
        card.classList.remove('snap');
        card.classList.add('blip');
    }
	setTimeout(() => {
		card.classList.remove('flipped', 'snap', 'blip');
	}, 3000);
}



// function([string1, string2],target id,[color1,color2])    
consoleText(['Welcome to IIIT Bhubaneswar Societies!', 'Explore your passions and innovate with us.', 'Join a vibrant, creative community!','Develop new skills and make lifelong friends.','Dive into tech, arts, and entrepreneurship.'], 'text',['lightgreen','tomato','yellow','lightblue']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}


$(document).ready(function () {
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
        $('.dropdown-content').removeClass('onscreen');
    });
     $('.dropdown').click(function () {
        $('.dropdown-content').toggleClass('onscreen');
    });
});
let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}




/** code by webdevtrick ( https://webdevtrick.com ) **/
(function($) { 
  $(function() { 
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); 
})(jQuery);