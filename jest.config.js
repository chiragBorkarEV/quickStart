module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  rootDir: './',
  coverageDirectory: '<rootDir>/target/test-results/',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'ts', 'tsx'],
  reporters: [
    'default',
    ['jest-junit', { output: './target/test-results/jest/TESTS-results.xml' }]
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  coveragePathIgnorePatterns: ['.style.js', "/node_modules/", '/Jss/']
};
