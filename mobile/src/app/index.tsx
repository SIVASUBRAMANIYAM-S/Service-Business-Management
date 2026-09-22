import { Redirect } from 'expo-router';

export default function Index() {
  // Phase 2 (see docs/02-mvp-scope.md) will check the Supabase session here
  // and redirect to /(tabs)/home when already signed in.
  return <Redirect href="/(auth)/login" />;
}
