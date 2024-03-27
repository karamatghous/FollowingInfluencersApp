import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },
  titletext: {
    color: '#171717',
    fontSize: 32,
    fontFamily: 'Manrope-Bold',
    marginTop: '10%',
    textAlign: 'left',
    marginBottom: '5%',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    backgroundColor: '#FFADA2',
  },
  text1: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  text2: {
    color: '#171717',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
  logoStyle: {
    width: '85%',
    height: '40%',
    alignSelf: 'center',
  },
  supportButton: {
    backgroundColor: '#D4FF02',
    alignSelf: 'flex-end',
    marginTop: Platform.OS == 'ios' ? '15%' : '10%',
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: '20%',
  },
});
