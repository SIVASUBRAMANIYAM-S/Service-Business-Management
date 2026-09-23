import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { BUSINESSES, CATEGORIES } from '@/lib/placeholder-data';

// Placeholder only — lists businesses that offer the selected category.
// Phase 2 replaces BUSINESSES with a real Supabase query filtered by
// category + customer location (see docs/02-mvp-scope.md).
export default function ServicesScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const category = CATEGORIES.find((item) => item.id === categoryId);
  const businesses = BUSINESSES.filter((business) => business.categoryId === categoryId);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable onPress={() => router.back()}>
          <ThemedText type="linkPrimary">‹ Back</ThemedText>
        </Pressable>

        <ThemedText type="title" style={styles.title}>
          {category?.icon} {category?.name ?? 'Services'}
        </ThemedText>

        {businesses.length === 0 ? (
          <ThemedText themeColor="textSecondary">
            No businesses in this category yet — check back soon.
          </ThemedText>
        ) : (
          <View style={styles.list}>
            {businesses.map((business) => (
              <Card key={business.id} onPress={() => router.push(`/business/${business.id}`)}>
                <ThemedText type="smallBold">{business.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  ★ {business.rating.toFixed(1)} · {business.distanceKm} km away
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
  list: { gap: Spacing.three },
});
