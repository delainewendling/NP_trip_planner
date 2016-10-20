'use strict';

app.controller("LandingPageCtrl", function($scope){
  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var currIndex = 0;
  var slides = [
    {image: 'landingPhotos/Arches.jpg', text: 'Arches National Park'},
    {image: 'landingPhotos/Everglades.jpg', text: 'Everglades National Park'},
    {image: 'landingPhotos/Glacier.jpg', text: 'Glacier National Park'},
    {image: 'landingPhotos/GrandCanyon.jpg', text: 'Grand Canyon National Park'},
    {image: 'landingPhotos/SmokyMountains.jpg', text: 'Smoky Mountains National Park'},
    {image: 'landingPhotos/Yosemite.jpg', text: 'Yosemite National Park'}
  ];
  $scope.slides = [];

  $scope.addSlide = function(image, text) {
    $scope.slides.push({
      image: image,
      text: text,
      id: currIndex++
    });
  };

  slides.forEach((slide)=>{
    $scope.addSlide(slide.image, slide.text);
  });

});