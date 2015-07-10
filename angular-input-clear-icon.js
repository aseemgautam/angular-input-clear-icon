angular.module('controls', [])
    .directive('clearText', function () {
        return {
            restrict: "A",
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$render = function () {
                    element.val(ctrl.$viewValue);
                };

                element.bind('input', function (event) {
                    ctrl.$setViewValue(element.val());
                    tog(!ctrl.$isEmpty(ctrl.$viewValue), 'x');
                });

                element.bind('click', function (event) {
                    if ((event.target.offsetWidth - 24) < (event.clientX - event.target.getBoundingClientRect().left)
                        && !ctrl.$isEmpty(ctrl.$viewValue)) {
                        reset();
                    }
                });

                element.bind('mousemove', function (event) {
                    tog((event.target.offsetWidth - 24) < (event.clientX - event.target.getBoundingClientRect().left)
                         && !ctrl.$isEmpty(ctrl.$viewValue), 'onX');
                });

                function tog(cond, cls) {                    
                    cond ? angular.element(element).addClass(cls) : angular.element(element).removeClass(cls);
                }

                function reset() {
                    element.removeClass('x');
                    ctrl.$setViewValue(null);
                    ctrl.$render();                    
                }
            }
        };
    });
