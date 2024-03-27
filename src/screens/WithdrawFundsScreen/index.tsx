import React, {useEffect, useRef, useState} from 'react';
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
import MyTextInput from '../../components/mytextInput';
import Toast, {DURATION} from 'react-native-easy-toast';

export default function WithdrawFundsScreen({navigation}) {
  const toasts = useRef();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const [accountNo, setAccountNo] = useState();
  const [bankName, setBankName] = useState();
  const [accountHolder, setAccountHolder] = useState();

  const handleWithdrawAmount = async () => {
    if (!amount) {
      toasts.current.show('Please enter amount', 2000);
      return;
    }
    if (!accountNo) {
      toasts.current.show('Please enter account number', 2000);
      return;
    }
    if (!bankName) {
      toasts.current.show('Please enter bank name', 2000);
      return;
    }
    if (!accountHolder) {
      toasts.current.show('Please enter coount holder name', 2000);
      return;
    }
    setLoading(true);
    // var token = null;
    // await AsyncStorage.getItem('token').then(res => {
    //   token = res;
    // });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/payment/influencer/withdrawal',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            influencerId: 286,
            amount: 100,
            accountNo: 423232323,
            bank: 'abc',
            accountHolderName: 'test',
          }),
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ': withdrawal api response');
          toasts.current.show(json.message, 2000);
          navigation.navigate('WithdrawFundsSuccess');
          setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toasts} style={{flex: 1}} />
      <Header
        title="Withdraw Funds"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <View style={styles.containerstyle}>
        <Image
          resizeMode="center"
          style={{width: '100%', height: 70, marginBottom: 10}}
          source={require('../../assets/images/wallet_banner2.png')}></Image>
        <Text style={styles.placeholdertext}>AMOUNT</Text>
        <MyTextInput value={amount} setValue={val => setAmount(val)} />
        <Text style={styles.placeholdertext}>ACCOUNT NO.</Text>
        <MyTextInput value={accountNo} setValue={val => setAccountNo(val)} />
        <Text style={styles.placeholdertext}>BANK NAME (UAE BANKS ONLY)</Text>
        <MyTextInput value={bankName} setValue={val => setBankName(val)} />
        <Text style={styles.placeholdertext}>ACCOUNT HOLDER NAME</Text>
        <MyTextInput
          value={accountHolder}
          setValue={val => setAccountHolder(val)}
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="Withdraw Amount"
          onPress={() => handleWithdrawAmount()}
          loading={loading}
        />
      </View>
    </>
  );
}
