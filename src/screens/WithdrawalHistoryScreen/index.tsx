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

export default function WithdrawalHistoryScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState([
    {
      status: 'Successful',
      amount: '7,500',
      date: '12/1/2023',
      logo: '#D4FF02',
    },
    {
      status: 'In Progress',
      amount: '4,000',
      date: '9/3/2023',
      logo: '#FFD76F',
    },
    {
      status: 'Failed',
      amount: '1,500',
      date: '12/4/2023',
      logo: '#FFA8A8',
    },
  ]);
  useEffect(() => {
    getWithdrawalHistory();
  }, []);
  const getWithdrawalHistory = async () => {
    setLoading(true);
    // var token = null;
    // await AsyncStorage.getItem('token').then(res => {
    //   token = res;
    // });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/payment/influencer/withdrawal?influencerId=286',
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
          console.log(json, ': withdrawal History api response');
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
            : index == withdrawalHistory.length - 1
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
            <View
              style={[
                styles.logoContainer,
                {backgroundColor: item.logo},
              ]}></View>
            <View>
              <Text style={styles.text1}>AED {item.amount}</Text>
              <Text style={styles.text2}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.text1}>{item.status}</Text>
        </View>
      </View>
    );
  };
  return (
    <>
      <Header
        title="Withdrawal History"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <View style={styles.containerstyle}>
        <FlatList data={withdrawalHistory} renderItem={renderListItem} />
      </View>
    </>
  );
}
