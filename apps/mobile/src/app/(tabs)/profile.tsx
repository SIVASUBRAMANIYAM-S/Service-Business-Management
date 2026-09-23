import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useAuthStore } from '@/store/auth-store';

// Placeholder only — useAuthStore has no real session until Phase 2 wires it
// up to Supabase Auth (see docs/02-mvp-scope.md), so email will be blank.
export default function ProfileScreen() {
  const { email, signOut } = useAuthStore();

  function handleLogOut() {
    signOut();
    router.replace('/(auth)/login');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Profile
        </ThemedText>
        <ThemedText themeColor="textSecondary">{email ?? 'Not signed in yet'}</ThemedText>

        <PrimaryButton label="Log out" onPress={handleLogOut} variant="muted" style={styles.button} />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset,
    gap: Spacing.three,
  },
  title: { fontSize: 28, lineHeight: 34 },
  button: {
    marginTop: Spacing.four,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.four,
  },
});
