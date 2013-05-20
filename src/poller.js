(function () {
  var ajax = tddjs.namespace("ajax");

  function start() {
    if (!this.url) {
      throw new TypeError("Must specify URL to poll");
    }
  }

  ajax.poller = {
    start: start
  };
}());
