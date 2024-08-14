// src/config/theme.js
import { configureFonts, MD3LightTheme } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 57,
    fontWeight: '400',
    lineHeight: 64,
  },
  displayMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 45,
    fontWeight: '400',
    lineHeight: 52,
  },
  displaySmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 44,
  },
  headlineLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
    fontWeight: '400',
    lineHeight: 40,
  },
  headlineMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 36,
  },
  headlineSmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  titleLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
  },
  titleMedium: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  titleSmall: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelLarge: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  labelMedium: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  labelSmall: {
    fontFamily: 'Roboto-Medium',
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16,
  },
  bodyLarge: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1E3A8A',        // Deep Blue
    accent: '#3B82F6',         // Light Blue (Accent)
    background: '#FFFFFF',     // White
    surface: '#F3F4F6',        // Soft Gray
    text: '#1E3A8A',           // Deep Blue
    secondary: '#14B8A6',      // Teal
    tertiary: '#F59E0B',       // Amber
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default theme;
