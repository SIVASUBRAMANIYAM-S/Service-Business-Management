import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { BOOKINGS } from '@/lib/placeholder-data';

// Placeholder only — BOOKINGS is empty until Phase 2 wires this up to a real
// `bookings` table scoped to the signed-in customer (see docs/02-mvp-scope.md).
export default function BookingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          Your bookings
        </ThemedText>

        {BOOKINGS.length === 0 ? (
          <ThemedText themeColor="textSecondary">
            No bookings yet — book a service from Home to see it here.
          </ThemedText>
        ) : (
          <View style={styles.list}>
            {BOOKINGS.map((booking) => (
              <View key={booking.id} style={styles.card}>
                <ThemedText type="smallBold">{booking.serviceName}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {booking.businessName} · {booking.scheduledAt}
                </ThemedText>
                <ThemedText type="small">{booking.status}</ThemedText>
              </View>
            ))}
          </View>
        )}
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
  list: { gap: Spacing.three },
  card: {
    backgroundColor: '#F0F0F3',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.half,
  },
});
