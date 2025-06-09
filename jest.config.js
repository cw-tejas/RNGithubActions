module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: [
    '<rootDir>/tests/**/*.(test|spec).(js|jsx|ts|tsx)',
    '<rootDir>/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/__tests__/**',
    '!**/coverage/**',
    '!babel.config.js',
    '!metro.config.js',
    '!jest.config.js',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  testEnvironment: 'node',
};
