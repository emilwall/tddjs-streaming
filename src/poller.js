(function () {
  var ajax = tddjs.namespace("ajax");

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }

    ajax.request(this.url);
  }

  ajax.poller = {
    start: start
  };
}());
