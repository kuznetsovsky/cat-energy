"use strict";
jQuery(function(){

  $('.no-js').removeClass('no-js');

  var checkMenuFocus = false,
      $navigation = $('.navigation'),
      $menuButton = $('.burger'),
      $navigationList = $('.navigation__list');

  function showToggleMenu() {
    $navigationList.slideToggle(500);
    $navigation.toggleClass('show');
  }

  $menuButton.on('click', function(event) {
    event.preventDefault();
    showToggleMenu();
  });

  $menuButton.on('keydown', function(event) {
    if(event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();
      showToggleMenu();
      checkMenuFocus = (checkMenuFocus) ? false : true;
      focusManager.capture($navigationList.get(0));
    }
  });

  $(window).on("keydown", function(event) {
    if(event.keyCode === 27 && checkMenuFocus) {
      event.preventDefault();
      showToggleMenu();
      checkMenuFocus = false;
      focusManager.release($navigationList.get(0));
    }
  });

  var slyder = {
    element: $('.slyder__scale'),
    point: $('.slyder__point'),
    wrapper: $('.slyder__wrapper'),
    moves: false,
    shiftX: 0,
    elementCoord: null,
    button: {
      before: $('.slyder__button--before'),
      after: $('.slyder__button--after')
    }
  };

  // console.log(slyder);

  slyder.point.on('mousedown', function(event) {
    var slyderPointCoords = getCoords(slyder.point.get(0));

    slyder.shiftX = event.pageX - slyderPointCoords.left;
    slyder.elementCoord = getCoords(slyder.element.get(0));

    slyder.moves = true;
  });

  $(document).on('mousemove', function(event) {
    if (slyder.moves) {
      var newLeftCoord = event.pageX - slyder.shiftX - slyder.elementCoord.left;

      if (newLeftCoord < -14) {
        newLeftCoord = -14;
      }

      if (newLeftCoord > 410) {
        newLeftCoord = 410;
      }

      var sliderImagesWidth = newLeftCoord * 100 / 410;
      slyder.wrapper.width(sliderImagesWidth + '%');

      slyder.point.css('left', newLeftCoord + 'px');
    }
  });

  $(document).on('mouseup', function(event) {
    if (slyder.moves) {
      slyder.moves = false;
    }
  });

  slyder.point.on('dragstart', function(event) {
    event.preventDefault();
  });


  slyder.button.before.on('click', function(event) {
    var screenWidth = $(window).width();
    slyder.wrapper.width(0 + '%');

    if(screenWidth >= 768) {
      slyder.point.css('left', -14 + 'px');
    }

  });

  slyder.button.after.on('click', function(event) {
    var screenWidth = $(window).width();
    slyder.wrapper.width(100 + '%');

    if(screenWidth >= 768) {
      slyder.point.css('left', 410 + 'px');
    }

  });

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

});
