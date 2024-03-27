import React from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';

export function WithSplashScreen({children, isAppReady}) {
  return (
    <>{isAppReady ? children : <SplashScreen isAppReady={isAppReady} />}</>
  );
}

export default function SplashScreen() {
  return (
    <>
      <View style={styles.containerstyle}>
        <Image
          style={styles.logoStyle}
          source={require('../../assets/images/following_logo.png')}></Image>
      </View>
    </>
  );
}
