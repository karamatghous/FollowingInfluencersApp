import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: Platform.OS == 'ios' ? '25%' : '15%',
  },
  logoStyle: {
    width: '62%',
    height: Platform.OS == 'ios' ? 41 : 34,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  titletext: {
    color: '#FFF',
    fontSize: 26,
    fontFamily: 'Manrope-Bold',
    marginTop: '10%',
    textAlign: 'center',
    marginBottom: '5%',
  },
  graytext: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    color: '#848484',
  },
  text1: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },
  grayContainer: {
    width: '90%',
    marginVertical: 5,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#171717',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '20%',
  },
  gradientContainer: {
    width: '100%',
    marginVertical: 20,
    height: '100%',
    flex: 1,
    marginBottom: 30,
  },
  iconStyle: {width: 20, height: 27, marginRight: 10},
  footer: {
    marginTop: 30,
    backgroundColor: '#FAFAFA',
  },
  gradientButton: {
    height: 45,
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    marginBottom: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#171717',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
});
