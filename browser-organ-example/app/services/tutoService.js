angular.module("services")
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

  }]);
