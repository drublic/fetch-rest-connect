module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  automock: false,
  setupFiles: ["./jestSetup.js"],
  testURL: "http://localhost",
  testPathIgnorePatterns: ["/build/", "/node_modules/"],
};
