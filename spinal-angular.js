angular.module('spinal-angular', [])

.provider("FileSystem", function () {

  // private
  var _fs = null;

  // function to store filestystem from config
  this.set = function (fs) {
    _fs = fs;
  };

  this.$get = function () {

    // TODO: check if not null and do something
    return _fs;

  }

})

.factory("spinalCore", ['FileSystem', '$q', '$rootScope', function (FileSystem, $q, $rootScope) {

  spinalFactory = angular.copy(spinalCore);

  spinalFactory.init = function (params) {
    var deferred = $q.defer();

    if (params.process == null) {
    
      spinalCore.load(FileSystem, params.path,
        function (data) {
          // if success, resolve promise
          params.process = new AngularProcess(data, $rootScope);
          deferred.resolve(data);
        },
        function () {
          // if an error happens, reject promise
          deferred.reject();
        });

      } else {
        // if gym member list already inititated, resolve promise
        deferred.resolve();
      }
      
      return deferred.promise;
  }

  return spinalFactory;
}]);

function AngularProcess(model, rootScope) {
  AngularProcess.super(this, model);

  var subscribed_attributes = {};

  this.model = model;
  var _rootScope = rootScope;

  this.updateAngularScope = function () {
    _rootScope.$digest();
  }

  this.subscribe = function (attribute, handler) {
    // TODO: check that attribute exists in the model
    // create array if not already
    if (!(subscribed_attributes[attribute] instanceof Array))
      subscribed_attributes[attribute] = [];
    // execute handler the 1st time
    handler(this.model[attribute]);
    // push handler and return index
    return subscribed_attributes[attribute].push(handler) - 1;
  }

  this.unsubscribe = function (attribute, index) {
    subscribed_attributes[attribute].splice(index, 1, null);
    if (subscribed_attributes[attribute].length == 0)
      subscribed_attributes.splice(subscribed_attributes.indexOf(attribute), 1, null);
  }

  this.onchange = function () {
    var doDigest = false;

    for (var attribute in subscribed_attributes) {
      if (subscribed_attributes.hasOwnProperty(attribute)) {
        if (this.model[attribute].has_been_modified()) {
          // get all handlers for the attribute and execute them
          var handlers = subscribed_attributes[attribute];
          for (var i in handlers) {
            if (typeof handlers[i] == "function")
              handlers[i](this.model[attribute]);
          }
          doDigest = true;
        }
      }
    }

    if (doDigest)
      this.updateAngularScope();
  }

}

spinalCore.extend(AngularProcess, Process);
