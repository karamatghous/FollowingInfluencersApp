import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from 'react-native';
// import Icon from 'react-native-remix-icon';

export default function ButtonPlus(props) {
  const {
    title,
    wrapperStyle,
    onPress,
    showArrow,
    shareIcon,
    loading,
    textwrapperStyle,
  } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        resizeMode="stretch"
        style={[styles.gradientButton, wrapperStyle]}
        source={require('../assets/icons/gradient_button2.png')}>
        <View style={styles.row}>
          <Text style={styles.buttonText}>Upgrade to</Text>
          <Image
            style={{
              width: '37%',
              height: Platform.OS == 'ios' ? 24 : 20,
              resizeMode: 'contain',
            }}
            source={require('../assets/images/followingplus_logo.png')}></Image>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gradientButton: {
    height: Platform.OS == 'ios' ? 62 : 51.7,
    justifyContent: 'center',
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    marginRight: 7,
    marginTop: -5,
  },
});
