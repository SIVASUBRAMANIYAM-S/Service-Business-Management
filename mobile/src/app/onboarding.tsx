import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

// Placeholder only — a single intro screen for now. Phase 2+ can turn this
// into a swipeable multi-slide intro if needed (see docs/02-mvp-scope.md).
export default function OnboardingScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.emoji}>🛠️🏥</ThemedText>
        <ThemedText type="title" style={styles.title}>
          Book trusted home &amp; healthcare services
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
          AC repair, plumbing, cleaning, clinics, dentists and more — pick a
          business, choose a time, and pay online in a few taps.
        </ThemedText>

        <Pressable style={styles.button} onPress={() => router.replace('/(auth)/login')}>
          <ThemedText type="default" style={styles.buttonText}>
            Get Started
          </ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  emoji: { fontSize: 48, textAlign: 'center', marginBottom: Spacing.three },
  title: { fontSize: 30, lineHeight: 36, textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  button: {
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  buttonText: { color: '#ffffff' },
});
