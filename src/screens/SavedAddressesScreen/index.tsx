import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import Icon from 'react-native-remix-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedAddressesScreen({route, navigation}) {
  // console.log(route.params?.route, 'route from home');
  const [loading, setLoading] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);

  useEffect(() => {
    getAddresses();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAddresses();
    });
    return unsubscribe;
  }, [navigation]);

  const getAddresses = async () => {
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/address?influencerId=286',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
        },
      ).then(res => {
        res.json().then(json => {
          console.log(
            json,
            ': Get All addresses by influencer id api response',
          );
          setAllAddresses(json.addresses);
          setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };
  const handleOnPress = item => {
    navigation.goBack();
    AsyncStorage.setItem('location', item.addressLabel);
  };
  const renderListItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          route.params?.route == 'home'
            ? handleOnPress(item.item)
            : navigation.navigate('AddAddressScreen', {
                addressDetails: item.item,
              })
        }>
        <View style={styles.whiteContainer}>
          <View style={styles.row}>
            <Text style={styles.text1}>{item.item.addressLabel}</Text>
            {route.params?.route !== 'home' && (
              <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Header
        title="Saved Addresses"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      {loading == true ? (
        <ActivityIndicator
          color={'#000'}
          style={{alignSelf: 'center', flex: 1}}
        />
      ) : (
        <View style={styles.containerstyle}>
          <FlatList data={allAddresses} renderItem={renderListItem} />
        </View>
      )}

      <View style={styles.footer}>
        <Button
          title="Add New Address"
          onPress={() => navigation.navigate('AddAddressScreen', {type: 'new'})}
        />
      </View>
    </>
  );
}
