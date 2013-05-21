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
      }
    });
  }

  ajax.poller = {
    start: start
  };
}());
