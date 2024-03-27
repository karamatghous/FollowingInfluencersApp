import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoStyle: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginVertical: 50,
    marginLeft: -20,
  },

  headingText: {
    color: '#171717',
    fontSize: 20,
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text1: {
    color: '#171717',
    fontSize: 10,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingBottom: 20,
    // height: 120,
  },
});
