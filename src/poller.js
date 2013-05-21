(function () {
  var ajax = tddjs.namespace("ajax");

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }

    var poller = this;

    ajax.request(this.url, {
      complete: function () {
        setTimeout(function () {
          poller.start();
        }, 1000);
      }
    });
  }

  ajax.poller = {
    start: start
  };
}());
