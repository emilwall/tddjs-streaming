(function () {
  var ajax = tddjs.ajax;

  TestCase("DateTest", {
    "test should define stubDateConstructor": function () {
      assertFunction(stubDateConstructor);
    }
  });
}());
