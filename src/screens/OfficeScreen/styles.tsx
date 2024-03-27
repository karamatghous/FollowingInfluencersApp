import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: '8%',
  },

  headingText: {
    color: '#171717',
    fontSize: 18,
    fontFamily: 'Manrope-Medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  text1: {
    color: '#171717',
    fontSize: 11,
    fontFamily: 'Manrope-SemiBold',
    textAlign: 'center',
  },
  cardStyle: {width: '100%', height: '30%', marginBottom: 10},
  itemContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginTop: 10,
    width: '47%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  iconStyle: {width: 19, height: 14, alignSelf: 'center'},
  invitationContainer: {
    backgroundColor: '#E9E9E9',
    borderRadius: 8,
    marginTop: -10,
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
});
