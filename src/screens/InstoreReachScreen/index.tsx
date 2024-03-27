import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import ActiveCampaignScreen from '../ActiveCampaignScreen';

export default function InstoreReachScreen({route, navigation}) {
  console.log(route.params, 'details in Instore Reach screen');

  return (
    <>
      <Header
        title="Enroll"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />

      <View style={styles.containerstyle}>
        <TouchableOpacity>
          <View style={styles.supportButton}>
            <Text style={styles.text2}>Help & Contact</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text1}>
          Enter your unique enrollment ID{'\n'}at store
        </Text>
        <Text style={styles.headingText}>{route.params?.code}</Text>
        <Button
          title="Submit"
          onPress={() =>
            navigation.navigate('ActiveCampaignScreen', {
              details: route.params?.details,
              influencerId: route.params?.influencerid,
              campaignId: route.params?.campaignid,
            })
          }
        />
      </View>
    </>
  );
}
