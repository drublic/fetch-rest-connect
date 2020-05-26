module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testURL: "http://localhost",
  testMatch: ["**/__tests__/{**/,}*.ts"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["/build/", "/node_modules/"],
};
