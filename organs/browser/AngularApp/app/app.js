angular.module("controllers", []);
angular.module("services", []);
angular.module("directives", []);
angular.module("settings", []);

// TODO: clean config from mean-skel

angular.module("spinalApp", ["ngMessages", "ngAnimate", "ui.bootstrap", "app.routes", "controllers", "services", "directives", "settings", "spinal-angular"])

	.config(function (FileSystemProvider, config) {
	
	  // TODO: the values of the url should be retrieved from the config file of angularjs
	  var fs = spinalCore.connect("http://" + config.spinalhub_user + ":" + config.spinalhub_pass + "@" + config.spinalhub_url + ":" + config.spinalhub_port + "/");
	  FileSystemProvider.set(fs);
  
	});
