import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

type KeypadProps = {
  amount: string;
  onKeyPress: (key: string) => void;
};

const Keypad = ({ onKeyPress }: KeypadProps) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'];

  return (
    <View style={styles.wrap}>
      {keys.map(k => (
        <TouchableOpacity
          key={k}
          style={styles.key}
          onPress={() => onKeyPress(k)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel={k === 'DEL' ? 'مسح' : `رقم ${k}`}
        >
          <AppText weight="bold" style={styles.text}>
            {k === 'DEL' ? 'مسح' : k}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Keypad;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  key: {
    width: '31%',
    height: 56,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  text: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
});
