import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    // alignItems: 'center',
  },
  headingText: {
    color: '#171717',
    fontSize: 38,
    fontFamily: 'Manrope-Bold',
    marginTop: 20,
    letterSpacing: 20,
    marginBottom: 50,
    textAlign: 'center',
  },
  text1: {
    color: '#171717',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
  },
  text2: {color: '#171717', fontSize: 12, fontFamily: 'Manrope-SemiBold'},

  supportButton: {
    backgroundColor: '#D4FF02',
    alignSelf: 'flex-end',
    marginTop: '5%',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: '45%',
  },
});
