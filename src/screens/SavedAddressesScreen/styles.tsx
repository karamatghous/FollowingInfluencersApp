import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },

  text1: {
    fontSize: 14,
    fontFamily: 'Manrope-Medium',
    color: '#171717',
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  whiteContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 60,
    borderColor: '#E8E8E8',
    borderWidth: 0.7,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});
