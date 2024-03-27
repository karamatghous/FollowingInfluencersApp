import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import moment from 'moment';
import {StackActions} from '@react-navigation/native';
import {decodeJWT} from '../../utils/constants';

export default function LaunchScreen({navigation}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    gettoken();
  }, []);

  const gettoken = async () => {
    await AsyncStorage.multiGet(['token', 'intro']).then(res => {
      console.log(res, ': token');
      if (res[1][1] !== 'true') {
        navigation.dispatch(StackActions.replace('IntroductionScreen'));
      } else {
        if (res[0][1] == null || res[0][1] == 'null') {
          navigation.dispatch(StackActions.replace('SignInEmailScreen'));
        } else {
          setLoading(true);
          var decodedToken = decodeJWT(res[0][1]);
          console.log(decodedToken, 'new decoded');
          var expirydate = moment.unix(decodedToken.exp);
          var currentdate = new Date();
          if (expirydate._d.getTime() > currentdate.getTime()) {
            navigation.dispatch(StackActions.replace('BottomTabNavigation'));
            setLoading(false);
          } else {
            navigation.dispatch(StackActions.replace('SignInEmailScreen'));
            setLoading(false);
          }
        }
      }
    });
  };
  return (
    <>
      <StatusBar hidden={false} backgroundColor={'#FAFAFA'} />
      <View
        style={{
          backgroundColor: '#FAFAFA',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* {loading == true && <ActivityIndicator color={'red'} />} */}
      </View>
    </>
  );
}
