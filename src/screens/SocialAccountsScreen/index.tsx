import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import BackButton from '../../components/backButton';
import MyTextInput from '../../components/mytextInput';

export default function SocialAccountsScreen({navigation}) {
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [snapchat, setSnapchat] = useState('');
  return (
    <>
      <BackButton />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={styles.containerstyle}>
            <Text style={styles.titletext}>Link Your Accounts</Text>
            <Text style={styles.graytext}>
              Connect your social media accounts, this helps us assign a
              ‘Following Score’ and find you relevant campaigns
            </Text>
            <Text style={styles.placeholdertext}>INSTAGRAM</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.facebook.com/dialog/oauth?client_id=1351422465491400&redirect_uri=https://following-backend-dev-be2ebc5fdad3.herokuapp.com/auth/callback&scope=email&response_type=code',
                );
              }}>
              <MyTextInput
                value={instagram}
                setValue={val => setInstagram(val)}
                type={'instagram'}
                placeholder="@username"
                editable={false}
              />
            </TouchableOpacity>
            <Text style={styles.placeholdertext}>TIKTOK</Text>
            <MyTextInput
              value={tiktok}
              setValue={val => setTiktok(val)}
              type={'tiktok'}
              placeholder="@username"
            />
            <Text style={styles.placeholdertext}>YOUTUBE</Text>
            <MyTextInput
              value={snapchat}
              setValue={val => setSnapchat(val)}
              type={'youtube'}
              placeholder="@username"
              wrapperStyle={{marginBottom: 90}}
            />
            <Button
              title="Sign Up"
              onPress={() => {
                navigation.navigate('VerificationStartScreen');
              }}
              wrapperStyle={styles.footer}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
