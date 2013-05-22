(function () {
  var ajax = tddjs.namespace("ajax");

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }

    var poller = this;
    if (typeof poller.interval !== "number") {
      poller.interval = 1000;
    }

    ajax.request(this.url, {
      complete: function () {
        setTimeout(function () {
          poller.start();
        }, poller.interval);

        if (typeof poller.complete == "function") {
          poller.complete();
        }
      },

      headers: poller.headers,
      success: poller.success,
      failure: poller.failure
    });
  }

  ajax.poller = {
    start: start
  };
}());
