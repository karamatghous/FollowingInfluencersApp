import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
  },

  text1: {
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
    color: '#171717',
  },
  bold: {
    marginVertical: 5,
    marginRight: 10,
    fontFamily: 'Manrope-Bold',
  },
  footer: {
    // position: 'absolute',
    // left: 20,
    // right: 20,
    // bottom: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    height: 45,
    borderColor: '#E8E8E8',
    borderWidth: 0.7,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  placeholdertext: {
    color: '#848484',
    fontSize: 10,
    fontFamily: 'Manrope-Regular',
    marginLeft: 10,
    maxWidth: '80%',
  },
  mapContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    // height: 200,
    backgroundColor: '#fff',
    borderColor: '#E8E8E8',
    borderWidth: 0.7,
    marginBottom: 20,
    marginTop: 5,
  },
});
