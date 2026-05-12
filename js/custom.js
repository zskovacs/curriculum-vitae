
(function($) { 
	"use strict";
	
	(function($) {
$(function() {
jQuery('#loopedSlider').prepend("<a href='#' class='previous'>&lt;</a><a href='#' class='next'>&gt;</a>");
	jQuery('#loopedSlider').loopedSlider({
		autoHeight: 500
	});
});
});



// for banner height js
var windowWidth = $(window).width();
    var windowHeight =$(window).height();
    $('.banner').css({'width':windowWidth ,'height':windowHeight -"60" });
	
	


// for portfoli filter jquary
$(window).load(function(){
    var $container = $('.portfolioContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
});




// for portfoli lightbox jquary
jQuery(function($) {
	var $chosenSheet,
	$stylesheets = $( "a[id^=theme-]" );
	
	// run rlightbox
	$( ".lb" ).rlightbox();
	$( ".lb_title-overwritten" ).rlightbox({overwriteTitle: true});
});





// for skill chart jQuery
$(document).ready(function(e) {
var skillsStarted = false;
var skillChartsDone = 0;

function startVibeCodingChart() {
	$('.technical').addClass('vibe-active');
	$('.vibeChart').easyPieChart({
		barColor: '#24c75a',
		trackColor: '#dbeedd',
		scaleColor: '#dbeedd',
		easing: 'easeOutBounce',
		animate: 1200,
		onStep: function(from, to, percent) {
			$(this.el).find('.percent').text(Math.round(percent));
		},
		onStop: function() {
			setTimeout(function() {
				$('.technical').addClass('vibe-settled');
			}, 4200);
		}
	});
}

function startSkillCharts() {
	if (skillsStarted) {
		return;
	}

	var technicalTop = $('.technical').offset().top;
	var triggerPoint = $(window).scrollTop() + $(window).height();
	if (triggerPoint < technicalTop + 220) {
		return;
	}

	skillsStarted = true;
	$('.skillChart').easyPieChart({
		easing: 'easeOutBounce',
		onStep: function(from, to, percent) {
			$(this.el).find('.percent').text(Math.round(percent));
		},
		onStop: function() {
			skillChartsDone++;
			if (skillChartsDone === $('.skillChart').length) {
				setTimeout(startVibeCodingChart, 2300);
			}
		}
	});
}

$(window).on('scroll resize load', startSkillCharts);
startSkillCharts();
});




// Somth page scroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -60
        }, 1000);
        return false;
      }
    }
  });
});




// chart loding
$(window).load(function() {
	
	var chart = window.chart = $('.skillChart').data('easyPieChart');
	$('.js_update').on('click', function() {
		chart.update(Math.random()*100);
	});
});





//jQuery
$(window).load(function() {    

        var theWindow        = $(window),
            $bg              = $(".bannerImg");
            //aspectRatio      = $bg.width() / $bg.height();

        function resizeBg() {
                if ( theWindow.width() < theWindow.height() ) {
                    $bg
                        .removeClass()
                        .addClass('bgheight');
                } else {
                    $bg
                        .removeClass()
                        .addClass('bgwidth');
                }
        }

        theWindow.resize(resizeBg).trigger("resize");

});
}(jQuery));
