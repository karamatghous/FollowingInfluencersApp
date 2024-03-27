import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown(props) {
  const {
    open,
    setOpen,
    value,
    setValue,
    items,
    setItems,
    onSelectItem,
    placeholder,
    wrapperStyle,
    onOpen,
  } = props;
  return (
    <View style={[styles.Container, wrapperStyle]}>
      <DropDownPicker
        onOpen={onOpen}
        theme="DARK"
        listMode="FLATLIST"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        placeholderStyle={styles.placeholderStyle}
        listItemLabelStyle={styles.listItemLabelStyle}
        labelStyle={styles.labelStyle}
        showArrowIcon={true}
        showTickIcon={false}
        style={styles.dropDownStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        dropDownDirection="BOTTOM"
        closeIconStyle={{
          backfaceVisibility: 'hidden',
        }}
        modalProps={{
          animationType: 'fade',
        }}></DropDownPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    marginVertical: 5,
    padding: 10,
    height: Platform.OS == 'ios' ? 45 : 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9EDF4',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Platform.OS == 'android' ? '#fff' : 'transparent',
  },
  placeholderStyle: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  listItemLabelStyle: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
    backgroundColor: '#fff',
  },
  labelStyle: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Manrope-SemiBold',
  },
  dropDownStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    marginLeft: -10,
    // width: '100%',
  },
  dropDownContainerStyle: {
    backgroundColor: '#fff',
    borderColor: '#E9EDF4',
    // width: 263,
    width: Platform.OS == 'android' ? '111%' : '112%',
    left: -16,
    marginTop: -10,
    paddingLeft: 7,
    maxHeight: 160,
  },
});
