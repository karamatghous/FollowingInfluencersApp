import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
// import Icon from 'react-native-remix-icon';

export default function Button(props) {
  const {
    title,
    wrapperStyle,
    onPress,
    showArrow,
    shareIcon,
    loading,
    textwrapperStyle,
    disable,
  } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[styles.Buttoncontainer, wrapperStyle]}>
      {loading == true ? (
        <ActivityIndicator color={'#000'} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[styles.buttonText, textwrapperStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Buttoncontainer: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#D4FF02',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#171717',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
});
