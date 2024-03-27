import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MyTextInput from '../../components/mytextInput';
import Button from '../../components/button';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {validateEmail, validateNumber} from '../../utils/validate';
import {Api_path} from '../../utils/constants';
import Toast, {DURATION} from 'react-native-easy-toast';

export default function SignInEmailScreen({navigation}) {
  const toasts = useRef();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toasts.current.show('All fields are required', 2000);
      return;
    }
    if (validateEmail(email) == false) {
      toasts.current.show('Email is not valid', 2000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(Api_path + 'login-through-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data, 'Login Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'User Logged In Succesfully') {
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('location', 'null');
        navigation.dispatch(StackActions.replace('SubscriptionPromptScreen'));
      }
      setLoading(false);
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    // console.log('+971' + phoneNumber, );
    if (!phoneNumber) {
      toasts.current.show('Please Enter Phone Number', 2000);
      return;
    }
    if (validateNumber(phoneNumber) == false) {
      toasts.current.show('Phone Number is not valid', 2000);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(Api_path + 'request-otp-for-sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: '+971' + phoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data, 'request-otp-for-sign-in Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'OTP Sent Succesfully') {
        navigation.navigate('SignInPhoneScreen', {
          phoneNumber: '+971' + phoneNumber,
        });
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
        <Text style={styles.titletext}>Sign In To Your Account</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              setPhoneEnabled(false);
              phoneEnabled == false ? null : clearFields();
            }}>
            <View
              style={[
                styles.buttonContainer,
                {backgroundColor: phoneEnabled ? '#fff' : '#D4FF02'},
              ]}>
              <Text style={styles.text1}>Email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPhoneEnabled(true);
              phoneEnabled == true ? null : clearFields();
            }}>
            <View
              style={[
                styles.buttonContainer,
                {backgroundColor: phoneEnabled ? '#D4FF02' : '#fff'},
              ]}>
              <Text style={styles.text1}>Phone</Text>
            </View>
          </TouchableOpacity>
        </View>

        {phoneEnabled == true ? (
          <>
            <Text style={styles.placeholdertext}>PHONE NUMBER</Text>
            <MyTextInput
              value={phoneNumber}
              setValue={val => setPhoneNumber(val)}
              placeholder="23456789"
              showTick={validateNumber(phoneNumber)}
              type="phoneNumber"
            />
          </>
        ) : (
          <>
            <Text style={styles.placeholdertext}>EMAIL</Text>
            <MyTextInput
              value={email}
              setValue={val => setEmail(val)}
              showTick={validateEmail(email)}
            />
            <Text style={styles.placeholdertext}>PASSWORD</Text>
            <MyTextInput
              value={password}
              setValue={val => setPassword(val)}
              type={'password'}
            />
            <View
              style={[styles.row, {alignSelf: 'flex-start', marginTop: -15}]}>
              <Text style={styles.placeholdertext}>Forgot Password? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text
                  style={[
                    styles.placeholdertext,
                    {color: '#171717', fontFamily: 'Manrope-SemiBold'},
                  ]}>
                  Reset Here
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {phoneEnabled == true ? (
          <Button
            title="Send OTP"
            loading={loading}
            onPress={() => {
              handleSendOTP();
            }}
            wrapperStyle={{marginTop: 25}}
          />
        ) : (
          <>
            <Button
              title="Sign In"
              onPress={() => {
                handleLogin();
              }}
              wrapperStyle={{marginTop: 25}}
              loading={loading}
            />

            <View style={styles.row}>
              <Text style={styles.graytext}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(StackActions.replace('SignUpScreen'))
                }>
                <Text style={styles.graytext}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}
