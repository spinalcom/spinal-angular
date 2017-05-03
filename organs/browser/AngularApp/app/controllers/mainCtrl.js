angular.module("controllers")
  .controller('TutoCtrl', ['TutoService', function (TutoService) {

    $ctrl = this;

    TutoService.subscribe('pressed', function (myNumber) {
      $ctrl.myNumber = myNumber;
      console.log("New value: " + $ctrl.myNumber.get());
    });

    $ctrl.update = function (newNumber) {
      if ($ctrl.myNumber)
        $ctrl.myNumber.set(newNumber);
    }

  }]);
