module.exports = {
  testEnvironment: 'node',

  roots: ['<rootDir>/tests'],

  moduleFileExtensions: ['js', 'json', 'node'],

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/coverage/',
    '/lib/',
  ],

  testPathIgnorePatterns: ['/node_modules/'],

  collectCoverage: true,

  collectCoverageFrom: ['src/**/*.js'],

  coverageDirectory: 'coverage',

  verbose: true,
};