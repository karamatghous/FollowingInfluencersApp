import React, {useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import {capitalize, replaceCommaWithAnd} from '../../utils/constants';

export default function ReservedSpotsScreen({route, navigation}) {
  const toasts = useRef();
  console.log(route.params);
  const [loading, setLoading] = useState(false);
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleArrived = async () => {
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaignInfluencer/arrived',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            userCode: generateOTP(),
            influencerId: route.params?.campaignInfluencer.influencerId,
            campaignId: route.params?.campaignInfluencer.campaignId,
          }),
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ':arrived api response');
          if (res.status == 200) {
            toasts.current.show(json.message, 2000);
            navigation.navigate('InstoreReachScreen', {
              code: generateOTP(),
              campaignid: route.params?.campaignInfluencer.campaignId,
              influencerid: route.params?.campaignInfluencer.influencerId,
              details: route.params?.details,
            });
          } else {
            toasts.current.show(json.message, 2000);
          }
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
        title="Campaign Details"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />

      <ScrollView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
        <View style={styles.containerstyle}>
          <View style={{flexDirection: 'row'}}>
            <Image
              resizeMode="contain"
              style={styles.logoStyle}
              source={{uri: route.params?.details.logoLink}}></Image>
            <Text style={styles.headingText}>
              {route.params?.details.title}
            </Text>
          </View>
          <View style={[styles.itemContainer, {borderColor: '#D4FF02'}]}>
            <Text
              style={[
                styles.headingText,
                {textAlign: 'center', fontFamily: 'Manrope-SemiBold'},
              ]}>
              You’ve Reserved Your Spot!
            </Text>
            <Text style={styles.text3}>
              {route.params?.details.title} is expecting you on{'\n'}
              {route.params?.date} | {route.params?.time}
            </Text>
            <Button
              title="I have arrived"
              wrapperStyle={{marginTop: 30}}
              onPress={() => handleArrived()}
              loading={loading}
            />
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Text style={styles.text1}>Campaign Type</Text>
              <Text style={styles.text2}>
                {capitalize(route.params?.details.campaignType)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Platform(s)</Text>
              <Text style={styles.text2}>
                {replaceCommaWithAnd(route.params?.details.channels.join(','))}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Location</Text>
              <Text style={styles.text2}>
                {route.params?.details.city}, {route.params?.details.country}
              </Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Text style={styles.text1}>Paid / Barter</Text>
              <Text style={styles.text2}>
                {capitalize(route.params?.details.paymentType)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>Payment Amount</Text>
              <Text style={styles.text2}>
                AED {route.params?.details.billing?.budgetPerInfluencer}
              </Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <Text style={[styles.text2, {fontSize: 14}]}>Requirements</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RequirementsDetails', {
                    details: route.params?.details,
                  })
                }>
                <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>
                  View All Details
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.socialContainer}>
              <Image
                style={[styles.socialLogo]}
                source={require('../../assets/icons/instagram.png')}></Image>
              <View>
                <Text style={styles.text2}>120 Second - Story</Text>
                <Text style={styles.text2}>1 - Picture Post</Text>
                <Text style={[styles.text2, {textDecorationLine: 'underline'}]}>
                  Brand has specified hashtags to be used
                </Text>
              </View>
            </View>
            <View style={styles.socialContainer}>
              <Image
                style={[styles.socialLogo, {height: 30}]}
                source={require('../../assets/icons/tiktok.png')}></Image>
              <View>
                <Text style={styles.text2}>1 - Video Post</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
