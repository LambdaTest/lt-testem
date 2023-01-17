var commander = require('commander');

var defaults = require('./default-options');

module.exports = function(argv) {
  var result = new commander.Command()
    .description('a JS test runner using LambdaTest. Supports Mocha, Qunit and Jasmine tests. Please make sure you have a file named testem.yml in the folder.')
    .option('-U, --username <username>', 'Define the LambdaTest user name [$LT_USERNAME]')
    .option('-k, --accesskey <key>', 'Define the LambdaTest access key [$LT_ACCESS_KEY]')
    .option('-b, --browser <name>', `Define the browser, e.g.: 'internet explorer', 'firefox', 'chrome' [${defaults.browser}]`, defaults.browser)
    .option('-v, --version <version>', 'Define the browser version', defaults.version)
    .option('-p, --platform <platform>', "Define the platform to run the tests, e.g: 'Linux', 'Windows', 'iOS'", defaults.platform)
    .option('--platform-version <version>', "Define the platform version to run the tests, e.g: 'XP', '9.3'", defaults.platformVersion)
    .option('--device-name <name>', "Define which device name to use. It's used only for mobile platform, e.g: 'iPhone Simulator', 'Motorola Atrix HD Emulator', 'LG Optimus 3D Emulator', 'Google Nexus 7C Emulator'")
    .option('--device-orientation <orientation>', "Define the device orientation. It's used only for mobile platform, e.g: 'portrait', 'landscape'")
    .option('-tunnel, --tunnel <bool>', 'Define a tunnel name [$TRAVIS_JOB_NUMBER]', defaults.tunnel)
    .option('-t, --tunnel-identifier <name>', 'Define a tunnel name [$TRAVIS_JOB_NUMBER]', defaults.tunnelIdentifier)
    .option('--build <name>', 'Define the build name/number [$TRAVIS_BUILD_NUMBER]', defaults.build)
    .option('--tag <tag>', `Attach a tag [${defaults.tags}]`, (tag, tags) => {
      tags.push(tag);
      return tags;
    }, [])
    .option('-n, --session-name <name>', `Define the session name on LambdaTest [${defaults.sessionName}]`, defaults.sessionName)
    .option('-u, --url <url>', `Define the url to access tests through LambdaTest [${defaults.url}]`, defaults.url)
    .option('--visibility <visibility>', `Visibilty of the session on LambdaTest [${defaults.visibility}]`, defaults.visibility)
    .option('--no-connect', 'Connect to LambdaTest, creating a simple wrapper around the lambdatestConnect')
    .option('-r, --connect-retries <n>', 'Try establishing the tunnel x times after a failure has occured.', n => parseInt(n, 10), defaults.connectRetries)
    .option('--attach', 'Attach to the launched browser')
    .option('--timeout <timeout>', 'Timeout in seconds until tests need to finish')
    .option('--max-duration <duration>', "Maximum duration for the LambdaTest session in seconds (LambdaTest's default is 1800; hard limit is 10800)")
    .option('--vmVersion <version>', 'Choose dev-varnish to enable websocket support')
    .option('--tunnelDomains <domains>', 'A comma separated list of domains to send through the tunnel')
    .option('--deviceName <deviceName>', "Define the device Name to run the tests mobile browser, e.g: 'Pixel 6'", defaults.deviceName)
    .option('--platformName <platformName>', "Define the platformName to run the tests mobile browser, e.g: 'Android','iOS'", defaults.platformName)
    .option('--platformVersion <platformVersion>', "Define the platformVersion to run the tests mobile browser, e.g: '11','12'", defaults.platformVersion)
    .option('--isRealMobile <isRealMobile>', "Define the isRealMobile to run the tests mobile browser, e.g: 'true'", defaults.platformVersion)
    .option('--devicelog <devicelog>', "Define the devicelog to run the tests mobile browser, e.g: 'true'", defaults.devicelog)
    .option('--network <network>', "Define the network logs to run the tests mobile browser, e.g: 'true'", defaults.network)
    .option('--video <video>', "Define the video genertion to run the tests mobile browser, e.g: 'true'", defaults.video)
    .option('--console <console>', "Define the console logs to run the tests mobile browser, e.g: 'true'", defaults.console)
    .option('--name <name>', "Define the name of test to run the tests mobile browser, e.g: 'true'", defaults.name)
    .option('--project <project>', "Define the name of project to run the tests mobile browser, e.g: 'Login feature'", defaults.project)
    .option('--queueTimeout <queueTimeout>', "Define the queueTimeout after which your test cases will aborted, e.g: '300'", defaults.queueTimeout)
    .option('--idleTimeout <idleTimeout>', "Define the idleTimeout after which your test cases will aborted, e.g: '300'", defaults.idleTimeout)
    .option('--deviceOrientation <deviceOrientation>', "Define the deviceOrientation of your device, e.g: 'portrait' or 'landscape'", defaults.deviceOrientation)
    .option('--timezone <timezone>', "Define the timezone of your device, e.g: 'UTC-0400' or 'UTC+13:00'", defaults.timezone)
    .option('--region <region>', "Define the region of your device, e.g: 'EU or 'US'", defaults.region)
    .option('--language <language>', "Define the language of your device, e.g: 'fr or 'en'", defaults.language)
    .option('--locale <locale>', "Define the locale of your device, e.g: 'fr_CA or 'CA'", defaults.locale)
    .option('--geoLocation <geoLocation>', "Define the geoLocation of your device, e.g: 'US or 'FR'", defaults.geoLocation)
    .option('--autoGrantPermissions <autoGrantPermissions>', "Define the autoGrantPermissions of your device, e.g: 'TRUE or 'FALSE'", defaults.autoGrantPermissions)
    .option('--autoAcceptAlerts <autoAcceptAlerts>', "Define the autoAcceptAlerts of your device, e.g: 'TRUE or 'FALSE'", defaults.autoAcceptAlerts)
    .option('--proxyUrl <proxyUrl>', "Define the proxyUrl of your device, e.g: '192.168.1.1:8080'", defaults.proxyUrl)
    .option('--tunnelName <tunnelName>', "Define the tunnelName of your device, e.g: 'RabbitHole'", defaults.tunnelName)
    .option('--dedicatedProxy <dedicatedProxy>', "Define the dedicatedProxy of your device, e.g: 'TRUE'", defaults.dedicatedProxy)
    .option('--enableCustomTranslation <enableCustomTranslation>', "Define the dedicatedProxy of your device, e.g: 'TRUE'", defaults.enableCustomTranslation)
    .parse(argv);

  result.tags = result.tag;
  if (result.tags.length === 0) {
    result.tags = defaults.tags;
  }

  return result;
};
