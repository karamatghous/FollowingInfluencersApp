import React, {useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import MyTextInput from '../../components/mytextInput';
import Button from '../../components/button';
import {StackActions} from '@react-navigation/native';
import {validateNumber} from '../../utils/validate';
import {Api_path} from '../../utils/constants';
import Toast, {DURATION} from 'react-native-easy-toast';
import SignInEmailScreen from '../SignInEmailScreen';

export default function NewPassword({route, navigation}) {
  const toasts = useRef();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState('');
  const [error, setError] = useState(false);

  const handleOnChangeNewPass = val => {
    setNewPassword(val);
    if (val != confirmPassword && confirmPassword != '') {
      setPassError('Both passwords must match.');
      setError(true);
    } else {
      setPassError('');
      setError(false);
    }
  };
  const handleOnChangeConfirmPass = val => {
    setConfirmPassword(val);
    if (val != newPassword) {
      setPassError('Both passwords must match.');
      setError(true);
    } else {
      setPassError('');
      setError(false);
    }
  };
  const handleDisableButton = () => {
    if (error == true || !newPassword || !confirmPassword) {
      return true;
    } else {
      return false;
    }
  };
  const handleSetPassword = async () => {
    // navigation.navigate('NewPasswordOTP', {phoneNumber: phoneNumber});
    try {
      setLoading(true);
      const response = await fetch(Api_path + 'reset-password-influencer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: route.params?.email,
          password: newPassword,
          confirmPassword: confirmPassword,
        }),
      });

      const data = await response.json();
      console.log(data, 'reset-password-influencer Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'Password updated Succesfully') {
        // navigation.navigate('SignInPhoneScreen', {phoneNumber: phoneNumber});
        navigation.dispatch(StackActions.replace('SignInEmailScreen'));
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
        <Text style={styles.titletext}>Create New Password</Text>

        <Text style={styles.placeholdertext}>ENTER NEW PASSWORD</Text>
        <MyTextInput
          value={newPassword}
          setValue={val => handleOnChangeNewPass(val)}
          type={'password'}
          wrapperStyle={{borderColor: error ? '#FF0000' : '#E8E8E8'}}
        />
        <Text style={styles.placeholdertext}>RE-ENTER NEW PASSWORD</Text>
        <MyTextInput
          value={confirmPassword}
          setValue={val => handleOnChangeConfirmPass(val)}
          type={'password'}
          wrapperStyle={{borderColor: error ? '#FF0000' : '#E8E8E8'}}
        />
        <Text style={styles.errorText}>{passError}</Text>

        <Button
          disable={handleDisableButton()}
          title="Change Password"
          loading={loading}
          onPress={() => {
            handleSetPassword();
          }}
          wrapperStyle={{
            marginTop: 20,
            backgroundColor: handleDisableButton() ? '#DADADA' : '#D4FF02',
          }}
        />
      </View>
    </>
  );
}
