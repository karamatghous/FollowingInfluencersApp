import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoStyle: {width: 30, height: 30, marginRight: 5},

  headingText: {
    color: '#171717',
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    marginBottom: 10,
    marginTop: 2,
  },
  text1: {
    color: '#848484',
    fontSize: 10,
    fontFamily: 'Manrope-Regular',
  },
  text2: {
    color: '#171717',
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
  },
  text3: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  socialLogo: {width: 25, height: 25, marginRight: 20},
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
    height: 120,
  },
  modalFooter: {
    // backgroundColor: '#fff',
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    flex: 1,
  },
  dateTimeContainer: {
    backgroundColor: '#7676801F',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  modalFooterContainer: {
    padding: 20,
    height: '50%',
    backgroundColor: '#fff',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 10,
  },
});
