// Right-click functionality handler
document.addEventListener("DOMContentLoaded", function () {
  // Make sure our utility functions are available
  if (typeof window.safeEventHandler !== "function") {
    window.safeEventHandler = function (fn) {
      return function (event) {
        return fn.call(this, event);
      };
    };
  }

  if (typeof window.handleCancelBubble !== "function") {
    window.handleCancelBubble = function (event, value) {
      if (value) {
        event.stopPropagation();
      }
      return event.defaultPrevented;
    };
  }

  // Function to handle right-click events
  function handleRightClick(event) {
    // Your custom right-click behavior here
    // For example, showing a custom context menu
    // If you want to prevent the default context menu
    // event.preventDefault();
  }

  // Function to bring back default behavior
  function bringBackDefault(event) {
    if (event && typeof event.stopPropagation === "function") {
      // Use the safe way to cancel event bubbling
      event.stopPropagation();
    } else if (event) {
      // Fallback for older browsers
      event.cancelBubble = true;
    }
    // Return true to allow default behavior
    return true;
  }

  // Safely attach event listeners
  try {
    // Use a direct function reference instead of safeEventHandler
    document.addEventListener("contextmenu", handleRightClick);

    // If you need to restore default behavior in certain cases
    const elementsWithDefaultBehavior = document.querySelectorAll(
      ".allow-default-context"
    );
    elementsWithDefaultBehavior.forEach(function (element) {
      element.addEventListener("contextmenu", bringBackDefault);
    });
  } catch (error) {
    console.error("Error setting up right-click handlers:", error);
  }
});
