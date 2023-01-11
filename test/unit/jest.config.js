module.exports = {
  rootDir: '../..',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '.*/e2e/.*',
  ],
  transform: {
    '.(ts|tsx)': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
        diagnostics: {
          warnOnly: true,
        },
      },
    ],
  },
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
  ],
  moduleDirectories: [
    'node_modules',
    'src',
    'types',
  ],
}