(function () {
  var ajax = tddjs.ajax;

  TestCase("DateTest", {
    setUp: function () {
      this.date = Date;
    },

    tearDown: function () {
      Date = this.date;
    },

    "test should define stubDateConstructor": function () {
      assertFunction(stubDateConstructor);
    },

    "test should make Date constructor return same object twice": function () {
      var date1 = new Date();
      stubDateConstructor(date1);
      var date2 = new Date();

      assertSame(date1, date2);
    },

    "test should return new Date every other time": function () {
      var date1 = new Date();
      stubDateConstructor(date1);
      var date2 = new Date();
      var date3 = new Date();

      assertNotSame(date1, date3);
    },
  });
}());
