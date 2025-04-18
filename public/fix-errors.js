// Fix for event.cancelBubble error
(function () {
  // Define the utility functions immediately without waiting for DOMContentLoaded

  // Handle cancelBubble in a safer way
  window.handleCancelBubble = function (event, value) {
    if (value) {
      event.stopPropagation();
    }
    return event.defaultPrevented;
  };

  // Fix for the Illegal invocation error
  // This is likely happening because 'this' is being lost in a callback
  window.safeEventHandler = function (fn) {
    if (typeof fn !== "function") {
      console.warn("safeEventHandler: Expected a function but got", typeof fn);
      return function () {}; // Return a no-op function
    }
    return function (event) {
      return fn.call(this, event);
    };
  };
})();
