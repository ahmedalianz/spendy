import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

type Category = { id: number; name: string; icon: string };

type CategoriesProps = {
  selectedCategory: number;
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>;
  categories: Category[];
};

const Categories = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}: CategoriesProps) => {
  return (
    <View style={styles.container}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        {categories.map(cat => {
          const active = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.item, active && styles.itemActive]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`تصنيف ${cat.name}`}
              accessibilityState={{ selected: active }}
            >
              <Icon
                name={cat.icon}
                size={18}
                color={
                  active
                    ? theme.colors.text.surface
                    : theme.colors.text.secondary
                }
              />
              <AppText style={[styles.text, active && styles.textActive]}>
                {cat.name}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </BottomSheetScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    height: 240,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingBottom: theme.spacing.lg,
  },
  item: {
    width: '31%',
    height: 72,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  itemActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  text: {
    ...theme.typography.vSmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  textActive: {
    color: theme.colors.text.surface,
  },
});
