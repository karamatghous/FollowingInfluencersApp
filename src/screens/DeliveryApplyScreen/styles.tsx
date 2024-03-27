import {Platform, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoStyle: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
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
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  graytext: {
    color: '#848484',
    fontSize: 10,
    fontFamily: 'Manrope-SemiBold',
    marginLeft: 10,
  },
  itemContainerStyle: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    // height: 120,
  },
});
