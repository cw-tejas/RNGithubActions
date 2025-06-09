// Global test setup for React Native Testing Library
import '@testing-library/jest-native/extend-expect';

// Mock console warnings to keep test output clean
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
