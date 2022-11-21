var Bluebird = require('bluebird');
var lambdatestConnectLauncher = require('@lambdatest/node-tunnel');
var lambdatestConnectLauncherAsync = Bluebird.promisify(lambdatestConnectLauncher);

module.exports = function connect(opts) {
  opts = Object.assign({}, {
  }, opts);

  return lambdatestConnectLauncherAsync(opts);
};
