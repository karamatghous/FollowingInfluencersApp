import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 20,
  },
  slidercontainer: {
    backgroundColor: '#fff',
    height: '80%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  titletext: {
    color: '#0A1221',
    fontSize: 30,
    fontFamily: 'Manrope-Bold',
    marginTop: Platform.OS == 'ios' ? '30%' : '20%',
  },
  text: {
    color: '#0A1221',
    fontSize: Platform.OS == 'ios' ? 14 : 12,
    fontFamily: 'Manrope-SemiBold',
    marginTop: Platform.OS == 'ios' ? 15 : 10,
  },
  introImageStyle: {
    height: Platform.OS == 'ios' ? '47%' : '53%',
    maxWidth: 250,
    alignSelf: 'center',
  },
});
