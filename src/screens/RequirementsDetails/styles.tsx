import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  logoStyle: {width: 40, height: 40},
  logoContainer: {
    width: 80,
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headingText: {
    color: '#171717',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    marginTop: 10,
    textAlign: 'center',
  },
  text1: {
    color: '#848484',
    fontSize: 10,
    fontFamily: 'Manrope-Regular',
    textAlign: 'center',
  },
  text2: {
    color: '#171717',
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
  },
  text3: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
  },
  text4: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  underlineText: {
    color: '#171717',
    fontSize: 10,
    fontFamily: 'Manrope-Bold',
    textDecorationLine: 'underline',
  },
  numericText: {
    color: '#171717',
    fontSize: 32,
    fontFamily: 'Manrope-Bold',
  },
  tabText: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  copyLogo: {width: 18, height: 20, marginRight: 5},
  socialContainer: {marginTop: 20, flexDirection: 'row', marginBottom: 10},
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#E8E8E8',
    height: 90,
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 10,
  },
  verticleLine: {
    height: '90%',
    width: 1,
    backgroundColor: '#848484',
  },
  greenContainer: {
    backgroundColor: '#F2FFEF',
    borderWidth: 0.7,
    borderColor: '#D4FF02',
    borderRadius: 20,
    marginTop: 50,
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingVertical: 12,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  column: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0.7,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 25,
  },
  copyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  tabButtonsChecked: {
    backgroundColor: '#F2FFEF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#D4FF02',
    borderRadius: 10,
  },
  tabButtonsUnChecked: {
    backgroundColor: '#fff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  tabsContainer: {
    backgroundColor: '#fff',
    // borderWidth: 0.7,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    width: '99.9%',
    // borderBottomColor: 'transparent',
    // borderBottomWidth: 0.7,
  },
  radius1: {borderTopEndRadius: 0, borderBottomEndRadius: 0},
  radius2: {borderTopStartRadius: 0, borderBottomStartRadius: 0},
  socialLogo: {width: 20, height: 20, marginRight: 2},
});
