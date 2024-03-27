import React, {useRef, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import RequirementsDetails from '../RequirementsDetails';
import MarkCompletedScreen from '../MarkCompletedScreen';
import {capitalize, replaceCommaWithAnd} from '../../utils/constants';

export default function ActiveCampaignScreen({route, navigation}) {
  const toasts = useRef();
  console.log(route.params, 'hvgvg');
  const [loading, setLoading] = useState(false);

  const handleMarkCompleted = async () => {
    // setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaignInfluencer/complete?influencerId=' +
          route.params?.influencerId +
          '&campaignId=' +
          route.params?.campaignId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ':complete api response');
          navigation.navigate('MarkCompletedScreen', {
            details: route.params?.details,
            postdetails: json.data,
          });
          // setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      // setLoading(false);
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

      <View style={styles.containerstyle}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="contain"
            style={styles.logoStyle}
            source={{uri: route.params?.details.logoLink}}></Image>
          <Text style={styles.headingText}>{route.params?.details.title}</Text>
        </View>
        <View style={[styles.itemContainer, {borderColor: '#D4FF02'}]}>
          <Text
            style={[
              styles.headingText,
              {textAlign: 'center', fontFamily: 'Manrope-SemiBold'},
            ]}>
            Campaign is Active
          </Text>
          <Text style={styles.text3}>
            {route.params?.details.title} is expecting the {'\n'}deliverables by
            20/June/2024
          </Text>
          <Button
            title="View Requirements"
            wrapperStyle={{marginTop: 30}}
            onPress={() =>
              navigation.navigate('RequirementsDetails', {
                details: route.params?.details,
              })
            }
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
        <View style={styles.footer}>
          <Button
            title="Mark as Completed"
            onPress={() => handleMarkCompleted()}
          />
        </View>
      </View>
    </>
  );
}
