import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';

export default function Header(props: Props) {
  const navigation = useNavigation();
  const {onPress, storeID, title, type, wrapperStyle, deleteOnPress} = props;

  return (
    <View style={[styles.headercontainer, wrapperStyle]}>
      {type == 'Details' ? (
        <>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="ri-arrow-left-s-line" size="26" color="#000" />
            </TouchableOpacity>
            <Text style={[styles.headerText, {fontSize: 16}]}>{title}</Text>

            {title == 'Address' ? (
              <TouchableOpacity onPress={() => deleteOnPress()}>
                <View style={{flexDirection: 'row', marginLeft: -20}}>
                  <Image
                    style={styles.deleteIcon}
                    source={require('../assets/icons/delete.png')}></Image>
                  <Text style={styles.text1}>Delete</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <Icon name="ri-arrow-down-s-line" size="26" color="transparent" />
            )}
          </View>
        </>
      ) : (
        <>
          <Text style={styles.headerText}>My Location</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text
                style={[styles.headerText, {fontSize: 14, maxWidth: '100%'}]}>
                {title}
              </Text>
              <TouchableOpacity onPress={onPress}>
                <View style={styles.iconStyle}>
                  <Icon name="ri-arrow-down-s-line" size="18" color="#171717" />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Image
                style={{width: 20, height: 22}}
                source={require('../assets/icons/notification.png')}></Image>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headercontainer: {
    paddingTop: Platform.OS == 'ios' ? 60 : 35,
    height: Platform.OS == 'ios' ? 110 : 80,
    backgroundColor: '#D4FF02',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  headerText: {
    color: '#171717',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  text1: {
    color: '#171717',
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
  },
  iconStyle: {
    marginLeft: 5,
    paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    marginRight: 3,
  },
});
