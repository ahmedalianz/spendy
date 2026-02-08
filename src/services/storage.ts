import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'expense-tracker-storage',
});
