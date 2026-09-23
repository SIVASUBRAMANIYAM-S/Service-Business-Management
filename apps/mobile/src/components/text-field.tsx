import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { Spacing } from '@/constants/theme';

export type TextFieldProps = TextInputProps;

/**
 * Shared text input style used by Login/Register. Kept as a fixed white
 * "well" regardless of light/dark theme (a common pattern for form fields on
 * a colored card) — but centralized so all screens stay in sync and get a
 * proper placeholder color instead of relying on the OS default.
 */
export function TextField({ style, placeholderTextColor = '#8A8F9C', ...rest }: TextFieldProps) {
  return (
    <TextInput placeholderTextColor={placeholderTextColor} style={[styles.input, style]} {...rest} />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ffffff',
    color: '#14161F',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 4,
    fontSize: 16,
  },
});
