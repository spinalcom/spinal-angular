var conn, spinalCore, path, fs, vm;

spinalCore = require('spinalcore');
path = require('path');
fs = require('fs');
vm = require('vm');

vm.runInThisContext(fs.readFileSync(path.join(__dirname, './config.js')));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, './myModel.js')));

conn = spinalCore.connect("http://" + CONNECTION.user + ":" + CONNECTION.password + "@" + CONNECTION.host + ":" + CONNECTION.port);

spinalCore.load(conn, "myModel", function (myModel) {
    tmp = myModel.pressed.get()
    myModel.pressed.set(tmp + 1);
    console.log("Model is increment = ", myModel.pressed.get());
}, function () {
 myModel = new myModel();
 spinalCore.store(conn, myModel, "myModel", function () {
     console.log("Model was store");
 });

});
