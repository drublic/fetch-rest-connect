module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testURL: "http://localhost",
  testMatch: ["<rootDir>/src/__tests__/{**/,}*.ts"],
  moduleFileExtensions: ["js", "ts"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
};
