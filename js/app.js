var app = angular.module('website', ['ngAnimate', 'socialLogin']);

// Config social login

app.config(function (socialProvider) {
    socialProvider.setGoogleKey("288706136662-mbi2ed13cbltmjtd9inskuodq0mtl9tc.apps.googleusercontent.com");
    socialProvider.setFbKey({
        appId: "2161991830693858",
        apiVersion: "v2.8"
    });
});

app.controller('MainCtrl', function ($scope, $timeout, socialLoginService) {

    // Settings slider background

    var setTime = 5000,
        slides = [
            {
                id: "image00",
                src: "./images/image-1.jpg"
            },
            {
                id: "image01",
                src: "./images/image-2.jpg"
            },
            {
                id: "image02",
                src: "./images/image-3.jpg"
            },
            {
                id: "image03",
                src: "./images/image-4.jpg"
            },
        ];

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, setTime);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    $timeout(nextSlide, setTime);

    $scope.slides = slides;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'slide-left-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    // settings social media login

    $scope.statuslog = true;

    $scope.signout = function () {
        socialLoginService.logout();
        $scope.statuslog = true;
    }
    $scope.$on('event:social-sign-in-success', function (event, userDetails) {
        $scope.statuslog = false;
        $scope.result = userDetails;
        $scope.$apply();
    })
    $scope.$on('event:social-sign-out-success', function (event, userDetails) {
        $scope.result = userDetails;
    })

});

// Animate Slider

app.animation('.slide-animation', function ($window) {
    return {
        enter: function (element, done) {
            var startPoint = $window.innerWidth * 0.5,
                tl = new TimelineLite();
            tl.fromTo(element.find('.bg'), 1, {
                alpha: 0
            }, {
                alpha: 1
            })
        },
        leave: function (element, done) {
            var tl = new TimelineLite();
            tl.to(element, 1, {
                alpha: 0,
                onComplete: done
            });
        }
    };
});

// Resize Images by window

app.directive('bgImage', function ($window) {
    return function (scope, element, attrs) {
        var resizeBG = function () {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    width: winwidth + 'px',
                    height: heightdiff + 'px'
                });
            } else {
                element.css({
                    width: widthdiff + 'px',
                    height: winheight + 'px'
                });
            }
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function () {
            resizeBG();
        });
    }
});

/* Resize height left block */

app.directive('heightLeft', function ($window) {
    return function (scope, element, attrs) {
        var resizeLeft = function () {
            var blokheight = element.height();
            var winheight = $window.innerHeight;
            element.css({
                height: winheight + 'px'
            });
        };

        var windowElement = angular.element($window);
        windowElement.resize(resizeLeft);
        resizeLeft();
    }
});