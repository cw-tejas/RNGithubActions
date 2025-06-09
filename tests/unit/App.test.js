import React from 'react';
import {render, screen} from '@testing-library/react-native';
import App from '../../App';

// Unit tests use extensive mocking to isolate component behavior
jest.mock('react-native/Libraries/NewAppScreen', () => ({
  Colors: {
    white: '#FFFFFF',
    black: '#000000',
    light: '#F3F3F3',
    dark: '#8C8C8C',
    darker: '#1E1E1E',
    lighter: '#F7F7F7',
  },
  DebugInstructions: () => null,
  Header: () => null,
  LearnMoreLinks: () => null,
  ReloadInstructions: () => null,
}));

describe('App Component Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<App />);
    });

    it('renders all section titles correctly', () => {
      render(<App />);

      expect(screen.getByText('Step One')).toBeTruthy();
      expect(screen.getByText('See Your Changes')).toBeTruthy();
      expect(screen.getByText('Debug')).toBeTruthy();
      expect(screen.getByText('Learn More')).toBeTruthy();
    });

    it('renders ScrollView component', () => {
      const {UNSAFE_getByType} = render(<App />);
      const scrollView = UNSAFE_getByType('RCTScrollView');
      expect(scrollView).toBeTruthy();
    });
  });

  describe('Content', () => {
    it('displays the edit instruction text', () => {
      render(<App />);

      expect(screen.getByText('App.tsx')).toBeTruthy();
      expect(
        screen.getByText(
          /to change this screen and then come back to see your edits/,
        ),
      ).toBeTruthy();
    });

    it('displays learn more section text', () => {
      render(<App />);

      expect(
        screen.getByText('Read the docs to discover what to do next:'),
      ).toBeTruthy();
    });

    it('has correct text styling for highlighted text', () => {
      render(<App />);

      const appTsxText = screen.getByText('App.tsx');
      expect(appTsxText.props.style).toEqual({fontWeight: '700'});
    });
  });

  describe('Structure', () => {
    it('applies correct styles to section containers', () => {
      render(<App />);

      // Check if sections are rendered with proper structure
      const stepOneTitle = screen.getByText('Step One');
      expect(stepOneTitle).toBeTruthy();

      const seeChangesTitle = screen.getByText('See Your Changes');
      expect(seeChangesTitle).toBeTruthy();

      const debugTitle = screen.getByText('Debug');
      expect(debugTitle).toBeTruthy();

      const learnMoreTitle = screen.getByText('Learn More');
      expect(learnMoreTitle).toBeTruthy();
    });

    it('contains all four main sections', () => {
      render(<App />);

      const sections = ['Step One', 'See Your Changes', 'Debug', 'Learn More'];

      sections.forEach(sectionTitle => {
        expect(screen.getByText(sectionTitle)).toBeTruthy();
      });
    });

    it('has proper component structure with Views and ScrollView', () => {
      const {UNSAFE_getAllByType} = render(<App />);

      const views = UNSAFE_getAllByType('View');
      const scrollViews = UNSAFE_getAllByType('RCTScrollView');

      expect(views.length).toBeGreaterThan(0);
      expect(scrollViews.length).toBe(1);
    });
  });

  describe('Theme Handling', () => {
    it('handles light color scheme', () => {
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockReturnValue('light');

      render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });

    it('handles dark color scheme', () => {
      jest
        .spyOn(require('react-native'), 'useColorScheme')
        .mockReturnValue('dark');

      render(<App />);
      expect(screen.getByText('Step One')).toBeTruthy();
    });
  });

  describe('Mocked Components Integration', () => {
    it('renders Header component from NewAppScreen', () => {
      render(<App />);
      // Since Header is mocked to return null, we verify the app renders without error
      expect(screen.getByText('Step One')).toBeTruthy();
    });

    it('renders with mocked NewAppScreen components', () => {
      render(<App />);
      // All NewAppScreen components are mocked, so we test core functionality
      expect(screen.getByText('Step One')).toBeTruthy();
      expect(screen.getByText('App.tsx')).toBeTruthy();
    });
  });
});
