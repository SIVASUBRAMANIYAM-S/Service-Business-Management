/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#14161F',
    background: '#ffffff',
    backgroundElement: '#F3F4F8',
    backgroundSelected: '#E7E9F5',
    textSecondary: '#5B5F72',
    border: '#E7E8EF',
    primary: '#3654F0',
    primaryMuted: '#EBEEFE',
    onPrimary: '#ffffff',
    accent: '#FF7A50',
    accentMuted: '#FFEDE5',
    onAccent: '#ffffff',
  },
  dark: {
    text: '#F4F5FA',
    background: '#0B0D14',
    backgroundElement: '#181B26',
    backgroundSelected: '#232738',
    textSecondary: '#9CA0B4',
    border: '#262B3A',
    primary: '#6E86FF',
    primaryMuted: '#1B2142',
    onPrimary: '#0B0D14',
    accent: '#FF9270',
    accentMuted: '#3A2318',
    onAccent: '#0B0D14',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
