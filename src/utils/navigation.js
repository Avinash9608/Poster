// Helper function to ensure navigation works properly
export const navigateTo = (navigate, path) => {
  // Use simple navigation without causing infinite loops
  navigate(path);
};
