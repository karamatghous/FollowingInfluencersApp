import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },

  text1: {
    color: '#171717',
    fontSize: 13,
    fontFamily: 'Manrope-SemiBold',
  },
  text2: {
    color: '#848484',
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: '#fff',
    height: 60,
    borderColor: '#E8E8E8',
    borderWidth: 0.7,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginVertical: 10,
    width: '47%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {width: 22, height: 18, alignSelf: 'center', marginBottom: 5},
  logoContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
});
