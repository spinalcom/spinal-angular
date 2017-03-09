angular.module('directives')
  .directive("grid", [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'app/views/shared/grid.html',
        scope: { gridData: '=' }
      };
    }
  ]);
