import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import App from '../../App';

// Integration tests use minimal mocking to test real component behavior
describe('App Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete App Flow', () => {
    it('renders the complete app with all sections', () => {
      render(<App />);

      // Verify all main sections are present
      expect(screen.getByText('Step One')).toBeTruthy();
      expect(screen.getByText('See Your Changes')).toBeTruthy();
      expect(screen.getByText('Debug')).toBeTruthy();
      expect(screen.getByText('Learn More')).toBeTruthy();
    });

    it('displays instructional content correctly', () => {
      render(<App />);

      // Check specific content that users will see
      expect(screen.getByText(/Edit/)).toBeTruthy();
      expect(screen.getByText('App.tsx')).toBeTruthy();
      expect(screen.getByText(/to change this screen/)).toBeTruthy();
      expect(
        screen.getByText('Read the docs to discover what to do next:'),
      ).toBeTruthy();
    });
  });

  describe('User Interface Integration', () => {
    it('maintains proper component hierarchy', () => {
      const {UNSAFE_getAllByType, UNSAFE_getByType} = render(<App />);

      // Verify essential UI components
      const scrollView = UNSAFE_getByType('RCTScrollView');
      expect(scrollView).toBeTruthy();

      const views = UNSAFE_getAllByType('View');
      expect(views.length).toBeGreaterThan(3);
    });

    it('handles scroll interactions', () => {
      const {UNSAFE_getByType} = render(<App />);

      const scrollView = UNSAFE_getByType('RCTScrollView');

      // Test scroll functionality
      fireEvent.scroll(scrollView, {
        nativeEvent: {
          contentOffset: {y: 100},
        },
      });

      // Verify content is still accessible after scroll
      expect(screen.getByText('Step One')).toBeTruthy();
    });
  });

  describe('Theme Integration', () => {
    it('adapts to light theme', () => {
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockReturnValue('light');

      render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });

    it('adapts to dark theme', () => {
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockReturnValue('dark');

      render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });

    it('handles theme changes gracefully', () => {
      const mockUseColorScheme = jest.fn();
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockImplementation(mockUseColorScheme);

      // Start with light theme
      mockUseColorScheme.mockReturnValue('light');
      const {rerender} = render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();

      // Change to dark theme
      mockUseColorScheme.mockReturnValue('dark');
      rerender(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });
  });

  describe('Performance and Stability', () => {
    it('renders efficiently', () => {
      const startTime = Date.now();
      render(<App />);
      const renderTime = Date.now() - startTime;

      expect(screen.getByText('Step One')).toBeTruthy();
      expect(renderTime).toBeLessThan(500); // Should render quickly
    });

    it('handles multiple re-renders', () => {
      const {rerender} = render(<App />);

      for (let i = 0; i < 3; i++) {
        rerender(<App />);
        expect(screen.getByText('Step One')).toBeTruthy();
      }
    });
  });

  describe('Error Handling', () => {
    it('handles undefined color scheme', () => {
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockReturnValue(undefined);

      render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });
  });
});
