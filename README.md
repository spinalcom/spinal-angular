# spinal-angular

Angular module to integrate spinalcore to an Angular app.

## Dependencies

This module requires AngularJS 1.4.x or higher, but it was tested with 1.5.8.
Also, the latest SpinalCore browser version is needed. You can download it from https://raw.githubusercontent.com/spinalcom/SpinalCoreJS/master/lib/spinalcore.browser.js.

## Usage

### Installation

You need to declare the dependency in your app:
```
angular.module('myModule', ['spinal-angular']);
```

### Configuration

The first step is to connect with the SpinalHub.
```
.config(function (FileSystemProvider) {
  var fs = spinalCore.connect("http://168:JHGgcz45JKilmzknzelf65ddDadggftIO98P@127.0.0.1:8888/");
  FileSystemProvider.set(fs);
})
```

### Creating a service

A good practice would be to access the module through an Angular service. Below there is an example of a basic service. It contains an internal `init()` function which loads a model from SpinalHub and creates a Process that is stored in `params.process`. It has also a public function `subscribe(attribute, handler)` which executes the `handler` whenever the `attribute` changes.
```
.service('TutoService', ['spinalCore', function (spinalCore) {

  var params = {
    process: null,
    path: "tuto"  // path of the file to load in the remote File System
  };

  var tutoFactory = {};

  var init = function () {

    if (params.process) {
      return true;
    }

    return spinalCore.init(params)
      .catch(function (err) {
        alert('Error');
      });

  }

  tutoFactory.subscribe = function (attribute, handler) {

    return init().then(function() {
        params.process.subscribe(attribute, handler);
      });

  }

  return tutoFactory;

}])
```

### Creating a controller
Finally, we can use our new service from a controller. In this basic example, the controller prints in the console everytime a new value is detected for an attribute `myNumber` of the model loaded in the service.
Also, it has a public function to update the model by calling `update(newNumber)`.
```
.controller('TutoCtrl', ['TutoService', function (TutoService) {

  $ctrl = this;

  TutoService.subscribe('myNumber', function (myNumber) {
    $ctrl.myNumber = myNumber;
    console.log("New value: " + $ctrl.myNumber.get());
  });

  $ctrl.update = function (newNumber) {
    if ($ctrl.myNumber)
      $ctrl.myNumber.set(newNumber);
  }

}])
```
