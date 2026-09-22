import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { CATEGORIES } from '@/lib/placeholder-data';
import type { CategoryGroup } from '@/types';

function CategorySection({ title, group }: { title: string; group: CategoryGroup }) {
  const categories = CATEGORIES.filter((category) => category.group === group);

  return (
    <View style={styles.section}>
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
      <View style={styles.grid}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={styles.card}
            onPress={() => router.push(`/services/${category.id}`)}
          >
            <ThemedText style={styles.cardIcon}>{category.icon}</ThemedText>
            <ThemedText type="smallBold">{category.name}</ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title" style={styles.title}>
          What do you need today?
        </ThemedText>
        <CategorySection title="Home Services" group="home_services" />
        <CategorySection title="Healthcare" group="healthcare" />
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
    gap: Spacing.five,
  },
  title: { fontSize: 28, lineHeight: 34 },
  section: { gap: Spacing.three },
  sectionTitle: { fontSize: 20, lineHeight: 26 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F3',
    borderRadius: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  cardIcon: { fontSize: 28 },
});
