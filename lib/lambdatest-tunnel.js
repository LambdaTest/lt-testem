#!/usr/bin/env node

if(process.argv[2]){
    process.kill(process.argv[2], 'SIGINT');
    process.exit(0);
  }
  var lambdaTunnel = require('@lambdatest/node-tunnel');
  
  
  var tunnelInstance = new lambdaTunnel();
  // Replace <lambdatest-user> with your user and <lambdatest-accesskey> with your key.
 var tunnelArguments = {
    user: process.env.LT_USERNAME || '<lambdatest-user>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest-accesskey>',
    pidFile : 'tunnel.pid'
  };
  
  process.on('SIGINT', function() {
    if (tunnelInstance !== null) {
        tunnelInstance.stop(function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log('tunnelInstance Disconnected');
          process.exit();
        }
      });
    }
  });
  
  tunnelInstance.start(tunnelArguments, function(error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Tunnel Started");
    }
  });