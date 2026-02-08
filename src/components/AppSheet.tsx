import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetSpringConfigs,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import { theme } from '@/theme';

type AppSheetProps = {
  children: React.ReactNode;
  snapPoints?: Array<string | number>;
  onClose?: () => void;
};

const AppSheet = forwardRef<BottomSheet, AppSheetProps>(
  ({ children, snapPoints: snapPointsProp, onClose }, ref) => {
    const snapPoints = useMemo<(string | number)[]>(
      () => snapPointsProp ?? ['80%'],
      [snapPointsProp],
    );

    const animationConfigs = useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      stiffness: 500,
    });

    const renderBackdrop = (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...p}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1} // closed by default
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handle}
        backgroundStyle={styles.background}
        enablePanDownToClose={false}
        enableHandlePanningGesture={false}
        enableContentPanningGesture={false}
        enableOverDrag={false}
        onClose={onClose}
      >
        <BottomSheetView style={styles.content}>{children}</BottomSheetView>
      </BottomSheet>
    );
  },
);

export default AppSheet;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: theme.colors.border.medium,
  },
  background: {
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xl,
  },
});
