import { theme } from '@/theme';

export const getBudgetColor = (spent: number, budget: number): string => {
  const usageRatio = spent / budget;
  if (usageRatio <= 0.5) {
    return theme.colors.semantic.success;
  } else if (usageRatio <= 0.8) {
    return theme.colors.semantic.warning;
  }
  return theme.colors.semantic.danger;
};
