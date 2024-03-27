import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: '7%',
  },

  text1: {
    color: '#060606',
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
  },
  headerText: {
    color: '#171717',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    textAlign: 'center',
    // marginBottom: 20,
  },
  card: {
    width: '100%',
    height: 170,
    backgroundColor: '#060606',
    borderRadius: 20,
    marginVertical: 20,
  },
  innerContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#D4FF02',
    alignSelf: 'baseline',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -5,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoStyle: {width: 25, height: 25, marginRight: 7},
  whiteButton: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
});
