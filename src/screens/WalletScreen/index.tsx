import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/button';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import Header from '../../components/header';
import Icon from 'react-native-remix-icon';

export default function WalletScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [walletCampaigns, setWalletCampaigns] = useState([
    {
      title: 'The Plant Shop',
      amount: '500',
      description: 'Available in wallet',
      logo: require('../../assets/images/item2.png'),
    },
    {
      title: 'Urban Clothing',
      amount: '2,500',
      description: 'Available in wallet',
      logo: require('../../assets/images/item4.png'),
    },
    {
      title: 'Star Football Pitch',
      amount: '3,000',
      description: 'Available in wallet',
      logo: require('../../assets/images/item3.png'),
    },
    {
      title: 'Dubai Airport Lounge',
      amount: '1,500',
      description: 'Available in wallet',
      logo: require('../../assets/images/item5.png'),
    },
    {
      title: 'The Guitar Store',
      amount: '750',
      description: 'Available in wallet',
      logo: require('../../assets/images/item6.png'),
    },
  ]);
  useEffect(() => {
    getWalletCampaigns();
  }, []);
  const getWalletCampaigns = async () => {
    setLoading(true);
    // var token = null;
    // await AsyncStorage.getItem('token').then(res => {
    //   token = res;
    // });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/payment/influencer/walletwithCampaigns/:influencerId=286',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // token: token,
          },
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ': walletwithCampaigns api response');
          //   setWalletCampaigns(json.addresses);
          setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };

  const renderListItem = ({item, index}) => {
    return (
      <View
        style={
          index == 0
            ? [
                styles.whiteContainer,
                {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              ]
            : index == walletCampaigns.length - 1
            ? [
                styles.whiteContainer,
                {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomWidth: 0.7,
                },
              ]
            : styles.whiteContainer
        }>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.row}>
            <View style={styles.logoContainer}>
              <Image
                resizeMode="contain"
                style={{width: 25, height: 25}}
                source={item.logo}></Image>
            </View>
            <View>
              <Text style={styles.text1}>{item.title}</Text>
              <Text style={styles.text2}>{item.description}</Text>
            </View>
          </View>
          <Text style={styles.text1}>AED {item.amount}</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Header
        title="Wallet"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <View style={styles.containerstyle}>
        <Image
          resizeMode="cover"
          style={{width: '100%', height: 115, marginBottom: 10}}
          source={require('../../assets/images/wallet_banner.png')}></Image>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('WithdrawFundsScreen')}>
            <View>
              <View>
                <Image
                  style={styles.iconStyle}
                  tintColor={'#171717'}
                  source={require('../../assets/icons/wallet_withdraw.png')}
                />
                <Text style={styles.text1}>Withdraw</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('WithdrawalHistoryScreen')}>
            <View>
              <View>
                <Image
                  style={styles.iconStyle}
                  tintColor={'#171717'}
                  source={require('../../assets/icons/wallet_history.png')}
                />
                <Text style={styles.text1}>Withdrawal History</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList data={walletCampaigns} renderItem={renderListItem} />
      </View>
    </>
  );
}
