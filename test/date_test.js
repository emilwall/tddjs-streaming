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

    "test should temporarily stub Date constructor": function () {
      var date = new Date();
      stubDateConstructor(date);
      var dateCopy = new Date();

      assertSame(date, dateCopy);
    },

    "test should restore Date contructor": function () {
      var date = new Date();
      stubDateConstructor(date);
      var dateCopy = new Date();
      var newDate = new Date();

      assertNotSame(date, newDate);
    },
  });
}());
