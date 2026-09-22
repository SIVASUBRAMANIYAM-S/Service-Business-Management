import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { SERVICES, TIME_SLOTS } from '@/lib/placeholder-data';

// Placeholder only — lets the customer pick a time slot and "confirm" a
// booking. Phase 2 replaces this with a real Supabase insert into
// `bookings` plus the pay-at-booking checkout step (see docs/02-mvp-scope.md).
export default function BookingScreen() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const service = SERVICES.find((item) => item.id === serviceId);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  function handleConfirm() {
    // Phase 2: create the booking + payment in Supabase before navigating.
    router.replace('/(tabs)/bookings');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()}>
          <ThemedText type="linkPrimary">‹ Back</ThemedText>
        </Pressable>

        <ThemedText type="title" style={styles.title}>
          {service?.name ?? 'Book service'}
        </ThemedText>
        {service ? (
          <ThemedText type="small" themeColor="textSecondary">
            ₹{service.priceRupees} · {service.durationMinutes} min
          </ThemedText>
        ) : null}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Choose a time
        </ThemedText>
        <View style={styles.slotList}>
          {TIME_SLOTS.map((slot) => (
            <Pressable
              key={slot}
              style={[styles.slot, selectedSlot === slot && styles.slotSelected]}
              onPress={() => setSelectedSlot(slot)}
            >
              <ThemedText type="smallBold">{slot}</ThemedText>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.button, !selectedSlot && styles.buttonDisabled]}
          disabled={!selectedSlot}
          onPress={handleConfirm}
        >
          <ThemedText type="default" style={styles.buttonText}>
            Confirm &amp; Pay
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
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.three,
  },
  title: { fontSize: 26, lineHeight: 32 },
  sectionTitle: { fontSize: 20, lineHeight: 26, marginTop: Spacing.three },
  slotList: { gap: Spacing.two },
  slot: {
    backgroundColor: '#F0F0F3',
    borderRadius: Spacing.two,
    padding: Spacing.three,
  },
  slotSelected: { backgroundColor: '#D6E6FF' },
  button: {
    backgroundColor: '#3c87f7',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    marginTop: Spacing.four,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#ffffff' },
});
