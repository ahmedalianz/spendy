import React from 'react';

import AppButton from '@/components/AppButton';
import AppScreen from '@/components/AppScreen';
import { OnboardingScreenProps } from '@/types/navigation';

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <AppScreen>
      <AppButton
        title="Get Started"
        onPress={() => navigation.navigate('MainStack')}
      />
    </AppScreen>
  );
};

export default OnboardingScreen;
