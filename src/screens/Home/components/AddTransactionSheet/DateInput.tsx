import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import { PickerMode } from './types';

import AppText from '@/components/AppText';
import { theme } from '@/theme';

type DateInputProps = {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
};

const DateInput = ({ selectedDate, setSelectedDate }: DateInputProps) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PickerMode>(PickerMode.DATE);

  const openPicker = (m: PickerMode) => {
    setMode(m);
    setOpen(true);
  };

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.chip}
        onPress={() => openPicker(PickerMode.DATE)}
        activeOpacity={0.85}
      >
        <Icon name="calendar-outline" size={16} color={theme.colors.primary} />
        <AppText style={styles.text}>
          {selectedDate.toLocaleDateString('ar-EG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.chip}
        onPress={() => openPicker(PickerMode.TIME)}
        activeOpacity={0.85}
      >
        <Icon name="time-outline" size={16} color={theme.colors.primary} />
        <AppText style={styles.text}>
          {selectedDate.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </AppText>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={selectedDate}
        mode={mode}
        title={mode === 'date' ? 'اختر التاريخ' : 'اختر الوقت'}
        confirmText="تأكيد"
        cancelText="إلغاء"
        onConfirm={d => {
          setOpen(false);
          setSelectedDate(d);
        }}
        onCancel={() => setOpen(false)}
        theme="light"
      />
    </View>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  chip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.full,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  text: { ...theme.typography.small, color: theme.colors.text.primary },
});
