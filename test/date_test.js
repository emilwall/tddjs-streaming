(function () {
  var ajax = tddjs.ajax;

  TestCase("DateTest", {
    "test should define stubDateConstructor": function () {
      assertFunction(stubDateConstructor);
    },

    "test should make Date constructor return same object twice": function () {
      var date1 = new Date();
      stubDateConstructor(date1);
      var date2 = new Date();

      assertSame(date1, date2);
    }
  });
}());
