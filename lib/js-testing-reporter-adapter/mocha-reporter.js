window.mocha && mocha.setup({ignoreLeaks: true}) && (JSTestingReporterLT = (function(undefined) {

  function hasArray(obj, nameArray) {
    return obj && obj[nameArray] && obj[nameArray].length > 0;
  }

  function hasSuite(obj) {
    return hasArray(obj, "suites");
  }

  function hasSpec(obj){
    return hasArray(obj, "tests");
  }

  function reporterSpec(test) {
    var isPassed = test.state === "passed";
    return {
      description : test.title,
      durationSec : test.duration/1000,
      passed      : isPassed,
      passedCount : isPassed ? 1 : 0,
      failedCount : isPassed ? 0 : 1,
      totalCount  : 1
    };
  }

  function emptyReporter() {
    return {
      description : "",
      durationSec : 0,
      passed      : true,
      totalCount  : 0
    };
  }

  function reporterObjects(objs, fn) {
    var reporter = emptyReporter();
    reporter.result = [];

    for (var i=0; i<objs.length; i++) {
      var obj = fn(objs[i]);
      reporter.durationSec += obj.durationSec ? obj.durationSec : 0;
      reporter.totalCount  += obj.totalCount;
      reporter.passed = reporter.passed && obj.passed;
      reporter.result.push(obj);
    }

    return reporter;
  }

  function reporterSpecs(tests) {
    return reporterObjects(tests, reporterSpec);
  }

  function reporterSuites(suites) {
    return reporterObjects(suites, reporterSuite);
  }

  function reporterSuite(suite) {
    var specs  = hasSpec(suite)  ? reporterSpecs(suite.tests)   : emptyReporter(),
        suites = hasSuite(suite) ? reporterSuites(suite.suites) : emptyReporter();

    return {
      description : suite.title,
      specs       : specs.result || [],
      suites      : suites.result || [],
      durationSec : specs.durationSec + suites.durationSec,
      totalCount  : specs.totalCount + suites.totalCount,
      passed      : specs.passed && suites.passed
    };
  }

  return function() {
    if ('global_test_results' in window) {
      return {
        passed: !!(global_test_results && global_test_results.failures === 0),
        'custom-data': {
          mocha: global_test_results
        }
      };
    }

    return reporterSuite(mocha.suite).suites[0];
  };
})());
