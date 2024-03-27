import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackButton from '../../components/backButton';
import {Api_path} from '../../utils/constants';
import Toast, {DURATION} from 'react-native-easy-toast';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen({route, navigation}) {
  // console.log(route.params);
  const toasts = useRef();
  const [otp_code, setotp_code] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendloading, setResendloading] = useState(false);
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

  const handleSignup = async () => {
    if (otp_code == '') {
      toasts.current.show('please enter OTP', 2500);
    } else
      try {
        setLoading(true);
        const response = await fetch(Api_path + 'signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: route.params?.name,
            email: route.params?.email,
            fullName: route.params?.name,
            password: route.params?.password,
            phoneNumber: route.params?.phoneNumber,
            code: otp_code,
          }),
        });
        const data = await response.json();
        console.log(data, 'signup Api Response');
        toasts.current.show(data.message, 2500);
        if (data.message == 'User Registered Succesfully') {
          AsyncStorage.setItem('token', data.user.refreshToken);

          navigation.dispatch(StackActions.replace('SocialAccountsScreen'));
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
          email: route.params?.email,
          phoneNumber: route.params?.phoneNumber,
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
      <BackButton />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : ''}>
        <View style={styles.containerstyle}>
          <Text style={styles.titletext}>Verification</Text>
          <Text style={styles.graytext}>
            Enter the 6-digit OTP code and your phone number will be verified
          </Text>

          <View style={{alignSelf: 'center', marginTop: '20%'}}>
            <OTPInputView
              keyboardType="number-pad"
              keyboardAppearance="light"
              style={{width: '60%', height: 70}}
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.OTPInput}
              codeInputHighlightStyle={{borderColor: '#D4FF02'}}
              placeholderTextColor="#FFF"
              onCodeFilled={code => {
                setotp_code(code.toString());
              }}
            />
          </View>

          <View style={styles.row}>
            <Text style={[styles.graytext, {fontSize: 12}]}>
              Don't receive your code?{' '}
            </Text>
            {timer == 0 ? (
              <TouchableOpacity onPress={() => handleResend()}>
                <Text
                  style={[styles.graytext, {fontSize: 12, color: '#171717'}]}>
                  {' '}
                  Resend
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={[styles.graytext, {fontSize: 12, color: '#171717'}]}>
                {timer}
              </Text>
            )}
            {/* <TouchableOpacity onPress={() => handleResend()}>
            <Text style={[styles.graytext, {fontSize: 12, color: '#171717'}]}>
              {' '}
              Resend
            </Text>
          </TouchableOpacity> */}
          </View>
          <Button
            title="Verify Phone Number"
            onPress={() => handleSignup()}
            wrapperStyle={styles.footer}
            loading={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
