var Bluebird = require('bluebird');
var launcher = require('@lambdatest/node-tunnel');

var launcherAsync = Bluebird.promisify(launcher);

module.exports = function (config) {
  if (!config.tunnel) {
    return Bluebird.resolve();
  }

  return launcherAsync(config.launcherOptions()).then(function (lambdatestConnectProcess) {
    console.log("# Started lambdatest tunnel");
    return lambdatestConnectProcess;
  }).disposer(function(lambdatestConnectProcess) {
    var closeAsync = Bluebird.promisify(lambdatestConnectProcess.close);
    return closeAsync().tap(function () {
      console.log("# Closed lambdatest tunnel");
    });
  });
};
