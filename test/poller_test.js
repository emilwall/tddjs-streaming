(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    "test should be object": function () {
      assertObject(ajax.poller);
    }
  });
}());