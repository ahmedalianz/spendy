import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type AppContainerProps = ViewProps & PropsWithChildren;

const AppContainer = ({ children, style, ...props }: AppContainerProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AppContainer;
