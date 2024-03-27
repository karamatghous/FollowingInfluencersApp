import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MyTextInput from '../../components/mytextInput';
import Button from '../../components/button';
import {validateEmail, validateNumber} from '../../utils/validate';
import {StackActions} from '@react-navigation/native';
import {Api_path} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';

export default function SignInPhoneScreen({route, navigation}) {
  const toasts = useRef();
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendloading, setResendloading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [timer, setTimer] = useState(59);
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    if (!timer) {
      setTimer(0);
      setdisable(true);
      clearTimeout(timoutId);
      return;
    }
    const timoutId = setTimeout(() => {
      setTimer(timer - 1);
    }, 1200);
  }, [timer]);

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setPhoneNumber('');
  };

  const handleLoginEmail = async () => {
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

  const handleLoginPhone = async () => {
    console.log(phoneNumber);
    console.log(verificationCode, 'verification Code');
    if (!verificationCode) {
      toasts.current.show('Please Enter Verification Code', 2000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(Api_path + 'login-through-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          code: verificationCode,
        }),
      });
      const data = await response.json();
      console.log(data, 'login-through-phone Api Response');
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

  const handleResend = async () => {
    try {
      setResendloading(true);
      const response = await fetch(Api_path + 'request-otp-for-sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // email: route.params?.email,
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data, 'resend OTP Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'OTP Sent Succesfully') {
        setTimer(59);
      }
      setResendloading(false);
    } catch (error) {
      console.error(error, 'error');
      setResendloading(false);
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
              // phoneEnabled == false ? null : clearFields();
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
              // phoneEnabled == true ? null : clearFields();
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
              showTick={validateNumber(phoneNumber)}
              editable={false}
            />
            <Text style={styles.placeholdertext}>VERIFICATION CODE</Text>
            <MyTextInput
              value={verificationCode}
              setValue={val => setVerificationCode(val)}
            />
            <View style={[styles.row, {alignSelf: 'flex-start'}]}>
              <Text style={styles.placeholdertext}>
                Don't receive your code?
              </Text>
              {timer == 0 ? (
                <TouchableOpacity onPress={() => handleResend()}>
                  <Text
                    style={[
                      styles.placeholdertext,
                      {color: '#171717', fontFamily: 'Manrope-SemiBold'},
                    ]}>
                    Resend
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text
                  style={[
                    styles.graytext,
                    {fontSize: 12, color: '#171717', marginLeft: 5},
                  ]}>
                  {timer}
                </Text>
              )}
            </View>
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

        <Button
          title="Sign In"
          loading={loading}
          onPress={() => {
            phoneEnabled == true ? handleLoginPhone() : handleLoginEmail();
            // navigation.navigate('SubscriptionPromptScreen');
          }}
          wrapperStyle={{marginTop: 25}}
        />
        {phoneEnabled == false && (
          <>
            {/* <View style={styles.row}>
            <Text style={styles.graytext}>Forgot Password? </Text>
            <TouchableOpacity>
              <Text style={styles.graytext}> Reset Here</Text>
            </TouchableOpacity>
          </View> */}

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
