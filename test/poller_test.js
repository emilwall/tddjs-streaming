(function () {
  var ajax = tddjs.ajax;

  TestCase("PollerTest", {
    setUp: function () {
      this.ajaxCreate = ajax.create;
      this.xhr = Object.create(fakeXMLHttpRequest);
      ajax.create = stubFn(this.xhr);

      this.poller = Object.create(ajax.poller);
      this.poller.url = "/url";
    },

    tearDown: function () {
      ajax.create = this.ajaxCreate;
      Clock.reset();
    },

    resetXhr: function () {
      this.xhr.complete();
      this.xhr.send = stubFn();
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
      this.poller.start();

      assert(this.xhr.open.called);
      assertEquals(this.poller.url, this.xhr.open.args[1]);
    },

    "test start should call send XHR request": function () {
      this.poller.start();

      assert(this.xhr.send.called);
    },

    "test start should make async GET request": function () {
      this.poller.start();

      var actualArgs = [].slice.call(this.xhr.open.args);
      assertEquals("GET", actualArgs[0]);
      assertTrue(actualArgs[2]);
    },

    "test should schedule new request when complete":
    function () {
      this.poller.start();
      this.resetXhr();
      Clock.tick(1000);

      assert(this.xhr.send.called);
    },

    "test should delay before sending new request when complete":
    function () {
      this.poller.start();
      this.resetXhr();
      Clock.tick(1);

      assertFalse(this.xhr.send.called);
    },

    "test should not make new request until 1000ms passed":
    function () {
      this.poller.start();
      this.resetXhr();
      Clock.tick(999);

      assertFalse(this.xhr.send.called);
    }
  });
}());
