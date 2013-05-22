(function () {
  var ajax = tddjs.ajax;

  var setUp = function () {
    this.ajaxCreate = ajax.create;
    this.xhr = Object.create(fakeXMLHttpRequest);
    ajax.create = stubFn(this.xhr);

    this.poller = Object.create(ajax.poller);
    this.poller.url = "/url";
  };

  var tearDown = function () {
    ajax.create = this.ajaxCreate;
    Clock.reset();
  };

  var resetXhr = function () {
    this.xhr.complete();
    this.xhr.send = stubFn();
  };

  var waitForRequest = function (millis) {
    this.poller.start();
    resetXhr.call(this);
    Clock.tick(millis);
  };

  TestCase("PollerTest", {
    setUp: setUp,

    tearDown: tearDown,

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
      waitForRequest.call(this, 1000);

      assert(this.xhr.send.called);
    },

    "test should delay before sending new request when complete":
    function () {
      waitForRequest.call(this, 1);

      assertFalse(this.xhr.send.called);
    },

    "test should not make new request until 1000ms passed":
    function () {
      waitForRequest.call(this, 999);

      assertFalse(this.xhr.send.called);
    },

    "test should not fire event before interval expiration":
    function () {
      this.poller.interval = 350;
      waitForRequest.call(this, 349);

      assertFalse(this.xhr.send.called);
    },

    "test should not fire event before long interval expiration":
    function () {
      this.poller.interval = 2000;
      waitForRequest.call(this, 1999);

      assertFalse(this.xhr.send.called);
    },

    "test should fire event at interval expiration":
    function () {
      this.poller.interval = 350;
      waitForRequest.call(this, 350);

      assert(this.xhr.send.called);
    },

    "test should set interval to 1000 unless already set to another number":
    function () {
      this.poller.interval = "Whatever";

      this.poller.start();

      assertEquals(1000, this.poller.interval);
    },

    "test should pass headers to request": function () {
      this.poller.headers = {
        "Header-One": "1",
        "Header-Two": "2"
      };

      this.poller.start();

      var actual = this.xhr.headers;
      var expected = this.poller.headers;
      assertEquals(expected["Header-One"], actual["Header-One"]);
      assertEquals(expected["Header-Two"], actual["Header-Two"]);
    },

    "test should pass success callback": function () {
      this.poller.success = stubFn();

      this.poller.start();
      this.xhr.complete();

      assert(this.poller.success.called);
    },

    "test should pass failure callback": function () {
      this.poller.failure = stubFn();

      this.poller.start();
      this.xhr.complete(400);

      assert(this.poller.failure.called);
    },

    "test should pass complete callback": function () {
      this.poller.complete = stubFn();

      this.poller.start();
      this.xhr.complete();

      assert(this.poller.complete.called);
    }
  });

  TestCase("PollerTimeoutTest", {
    setUp: setUp,

    tearDown: tearDown,

    "test should define stop method": function () {
      assertFunction(this.poller.stop);
    }
  });
}());
