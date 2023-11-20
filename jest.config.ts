module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src'],
  silent: false,
  verbose: true,
  collectCoverageFrom: ['./task4/src/**'],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
