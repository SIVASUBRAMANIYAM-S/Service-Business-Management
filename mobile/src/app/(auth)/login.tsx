import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Placeholder only — Phase 2 wires this up to supabase.auth.signInWithPassword.
    // For now it just lets you preview the rest of the app on your phone.
    router.replace('/(tabs)/home');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Welcome back
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Log in to book home & healthcare services
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.form}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <ThemedText type="default" style={styles.buttonText}>
              Log In
            </ThemedText>
          </Pressable>
        </ThemedView>

        <Link href="/(auth)/register" style={styles.link}>
          <ThemedText type="linkPrimary">Don&apos;t have an account? Register</ThemedText>
        </Link>
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
  title: { marginBottom: Spacing.one },
  form: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Spacing.three,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 4,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff' },
  link: { alignSelf: 'center', marginTop: Spacing.two },
});
