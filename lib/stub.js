/*jslint indent: 2*/
function stubFn(returnValue) {
  var fn = function () {
    fn.called = true;
    fn.args = arguments;
    return returnValue;
  };

  fn.called = false;

  return fn;
}

(function (global) {
  global.stubDateConstructor = function (fakeDate) {
    var dateImpl = global.Date;
    global.Date = function () {
      global.Date = dateImpl;
      return fakeDate;
    }
  };
}(this));
