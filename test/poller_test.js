(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    setUp: function () {
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);
    },

    tearDown: function () {
      ajax.create = this.ajaxCreate;
    },

    "test should be object": function () {
      assertObject(ajax.poller);
    },

    "test should define a start method":
    function () {
      assertFunction(ajax.poller.start);
    },

    "test start should throw exception for missing URL":
    function () {
      var poller = Object.create(ajax.poller);

      assertException(function () {
        poller.start();
      }, "TypeError");
    },

    "test start should make XHR request with URL": function () {
      var poller = Object.create(ajax.poller);
      poller.url = "/url";

      poller.start();

      assert(this.xhr.open.called);
      assertEquals(poller.url, this.xhr.open.args[1]);
    },

    "test start should call send XHR request": function () {
      var poller = Object.create(ajax.poller);
      poller.url = "/url";

      poller.start();

      assert(this.xhr.send.called);
    },

    "test start should make async GET request": function () {
      var poller = Object.create(ajax.poller);
      poller.url = "/url";

      poller.start();

      var actualArgs = [].slice.call(this.xhr.open.args);
      assertEquals("GET", actualArgs[0]);
      assertTrue(actualArgs[2]);
    },
  });
}());
