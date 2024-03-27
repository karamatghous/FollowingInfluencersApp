import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MyTextInput from '../../components/mytextInput';
import Button from '../../components/button';
import {StackActions} from '@react-navigation/native';
import {validateEmail, validateNumber} from '../../utils/validate';
import {Api_path} from '../../utils/constants';
import Toast, {DURATION} from 'react-native-easy-toast';

export default function ForgotPassword({navigation}) {
  const toasts = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    if (!email) {
      toasts.current.show('Please Enter Registered Email', 2000);
      return;
    }
    if (validateEmail(email) == false) {
      toasts.current.show('Email is not valid', 2000);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(Api_path + 'reset-password-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();
      console.log(data, 'reset-password-otp Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'OTP Sent Succesfully') {
        navigation.navigate('NewPasswordOTP', {email: email});
      }
      setLoading(false);
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toasts} style={{flex: 1}} />
      <View style={styles.containerstyle}>
        <Image
          style={styles.logoStyle}
          source={require('../../assets/images/following_logo.png')}></Image>
        <Text style={styles.titletext}>Reset Password</Text>

        <Text style={styles.placeholdertext}>Email</Text>
        {/* <MyTextInput
          value={phoneNumber}
          setValue={val => setPhoneNumber(val)}
          placeholder="+971 23456789"
          showTick={validateNumber(phoneNumber)}
        /> */}
        <MyTextInput
          value={email}
          setValue={val => setEmail(val)}
          showTick={validateEmail(email)}
        />

        <Button
          title="Send OTP"
          loading={loading}
          onPress={() => {
            handleSendOTP();
          }}
          wrapperStyle={{marginTop: 25}}
        />
      </View>
    </>
  );
}
