/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  preset: '@shelf/jest-mongodb',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/test/**', '!**/config/**'],
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/test'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@test/(.*)$': '<rootDir>/test/$1',
  },
};
