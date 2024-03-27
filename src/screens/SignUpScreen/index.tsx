import React, {useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MyTextInput from '../../components/mytextInput';
import Button from '../../components/button';
import Toast, {DURATION} from 'react-native-easy-toast';
import {
  validateEmail,
  validateName,
  validateNumber,
} from '../../utils/validate';
import {Api_path} from '../../utils/constants';
import {StackActions} from '@react-navigation/native';
import SignInEmailScreen from '../SignInEmailScreen';
export default function SignUpScreen({navigation}) {
  const toasts = useRef();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !phoneNumber || !email || !password) {
      toasts.current.show('All fields are required', 2000);
      return;
    }
    if (validateName(name) == false) {
      toasts.current.show('Name is not valid', 2000);
      return;
    }
    if (validateNumber(phoneNumber) == false) {
      toasts.current.show('Phone Number is not valid', 2000);
      return;
    }
    if (validateEmail(email) == false) {
      toasts.current.show('Email is not valid', 2000);
      return;
    }
    if (password.length < 6) {
      toasts.current.show('Password must be more than 5 digit', 2000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(Api_path + 'request-otp-for-sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          phoneNumber: '+971' + phoneNumber,
          // phoneNumber: '+923085856847',
        }),
      });

      const data = await response.json();
      console.log(data, 'signup Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'OTP Sent Succesfully') {
        navigation.navigate('OTPScreen', {
          name: name,
          email: email,
          password: password,
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
      <ScrollView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <View style={styles.containerstyle}>
          <Image
            style={styles.logoStyle}
            source={require('../../assets/images/following_logo.png')}></Image>
          <Text style={styles.titletext}>
            Join The Ultimate {'\n'} Influencer Platform
          </Text>
          <Text style={styles.placeholdertext}>FULL NAME</Text>
          <MyTextInput
            value={name}
            setValue={val => setName(val)}
            showTick={validateName(name)}
          />
          <Text style={styles.placeholdertext}>PHONE NUMBER</Text>
          <MyTextInput
            value={phoneNumber}
            placeholder="23456789"
            setValue={val => setPhoneNumber(val)}
            showTick={validateNumber(phoneNumber)}
            type="phoneNumber"
          />
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
            secureText={true}
            type={'password'}
          />
          <Button
            title="Continue"
            onPress={() => handleSignup()}
            wrapperStyle={{marginTop: 25}}
            loading={loading}
          />
          <View style={styles.row}>
            <Text style={styles.graytext}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(StackActions.replace('SignInEmailScreen'))
              }>
              <Text style={styles.graytext}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
