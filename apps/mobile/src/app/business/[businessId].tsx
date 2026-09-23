import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { BUSINESSES, SERVICES } from '@/lib/placeholder-data';

// Placeholder only — shows one business and the services it offers.
// Phase 2 replaces BUSINESSES/SERVICES with real Supabase queries
// (see docs/02-mvp-scope.md).
export default function BusinessDetailsScreen() {
  const { businessId } = useLocalSearchParams<{ businessId: string }>();
  const business = BUSINESSES.find((item) => item.id === businessId);
  const services = SERVICES.filter((service) => service.businessId === businessId);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()}>
          <ThemedText type="linkPrimary">‹ Back</ThemedText>
        </Pressable>

        <ThemedText type="title" style={styles.title}>
          {business?.name ?? 'Business'}
        </ThemedText>
        {business ? (
          <ThemedText type="small" themeColor="textSecondary">
            ★ {business.rating.toFixed(1)} · {business.distanceKm} km away
          </ThemedText>
        ) : null}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Services
        </ThemedText>

        {services.length === 0 ? (
          <ThemedText themeColor="textSecondary">No services listed yet.</ThemedText>
        ) : (
          <View style={styles.list}>
            {services.map((service) => (
              <Card key={service.id} onPress={() => router.push(`/booking/${service.id}`)}>
                <ThemedText type="smallBold">{service.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  ₹{service.priceRupees} · {service.durationMinutes} min
                </ThemedText>
              </Card>
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
    gap: Spacing.three,
  },
  title: { fontSize: 26, lineHeight: 32 },
  sectionTitle: { fontSize: 20, lineHeight: 26, marginTop: Spacing.three },
  list: { gap: Spacing.three },
});
