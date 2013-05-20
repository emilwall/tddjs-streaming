(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    "test should be object": function () {
      assertObject(ajax.poller);
    },

    "test should define a start method":
    function () {
      assertFunction(ajax.poller.start);
    }
  });
}());
