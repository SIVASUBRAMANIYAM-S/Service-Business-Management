import { Pressable, StyleSheet, type GestureResponderEvent, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CardProps = PressableProps & {
  /** Highlights the card with the primary color — used for the selected time slot, etc. */
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Theme-aware tappable card. Replaces the hardcoded `#F0F0F3` backgrounds that
 * used to be copy-pasted across screens (they read as near-invisible against
 * light text in dark mode). Always pulls its background/border from the
 * current theme, and gives visible press feedback.
 */
export function Card({ selected, style, onPress, disabled, ...rest }: CardProps) {
  const theme = useTheme();

  function handlePress(event: GestureResponderEvent) {
    onPress?.(event);
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? theme.primaryMuted : theme.backgroundElement,
          borderColor: selected ? theme.primary : theme.border,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Spacing.three,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.three,
  },
});
