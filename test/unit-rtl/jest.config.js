module.exports = {
  rootDir: '../..',
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testPathIgnorePatterns: ['.*/e2e/.*'],
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true
      },
      tsConfig: "tsconfig.spec.json"
    }
  },
  transform: {
    '.(ts|tsx)': "ts-jest"
  },
  moduleFileExtensions: [
    "json",
    "ts",
    "tsx",
    "js"
  ],
  moduleDirectories: [
    "node_modules",
    "src",
    "types"
  ]
};