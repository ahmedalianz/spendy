const gradients = {
  surfaceContainer: ['#f6f6f8', '#E6EDF2'],
  background: ['#f6f6f8', '#f6f6f8'],
  chart: ['rgba(25, 93, 230, 0.15)', 'rgba(25, 93, 230, 0)'],
};

const colors = {
  primary: '#195de6',
  primaryLight: '#e3e9fd',
  green: '#0d9488',
  orange: '#fb923c',

  // Backgrounds
  background: '#F9FAFB',
  backgroundLight: '#f6f6f8',
  backgroundDark: '#111621',
  surface: '#FFFFFF',
  // Text
  text: {
    primary: '#1F2937',
    secondary: '#636f88',
    tertiary: '#64748b',
    surface: '#FFFFFF',
  },

  // Borders
  border: {
    subtle: '#f3f4f6',
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
  semantic: {
    success: '#0d9488',
    warning: '#fb923c',
    danger: '#ef4444',
  },
};

// Typography
const typography = {
  big: { fontSize: 48, lineHeight: 56 },
  h1: { fontSize: 32, lineHeight: 40 },
  h2: { fontSize: 24, lineHeight: 32 },
  h3: { fontSize: 20, lineHeight: 28 },
  h4: { fontSize: 18, lineHeight: 26 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 20 },
  small: { fontSize: 12, lineHeight: 16 },
  vSmall: { fontSize: 10, lineHeight: 14 },
};

// Spacing
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// Border Radius
const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

// Shadows
const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
};

// Animations
const animations = {
  spring: {
    tension: 100,
    friction: 8,
  },
  timing: {
    short: 150,
    medium: 300,
    long: 500,
  },
};
export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animations,
  gradients,
};
