import "@testing-library/jest-dom";
// src/setupTests.js
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0]?.toString().includes("React Router Future Flag Warning")
  ) {
    return; // ignore these warnings
  }
  originalWarn(...args);
};
