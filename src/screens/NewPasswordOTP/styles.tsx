import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },
  titletext: {
    color: '#171717',
    fontSize: 23,
    fontFamily: 'Manrope-Bold',
    marginTop: '10%',
    textAlign: 'center',
    marginBottom: '10%',
  },
  graytext: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    color: '#848484',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  OTPInput: {
    height: 60,
    width: 45,
    fontSize: 36,
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    color: '#171717',
    marginRight: 7,
    borderBottomColor: '#171717',
    borderBottomWidth: 2,
    borderWidth: 0,
    borderColor: '#000',
  },
});
