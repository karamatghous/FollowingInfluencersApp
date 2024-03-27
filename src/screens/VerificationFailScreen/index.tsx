import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';

export default function VerificationFailScreen({navigation}) {
  return (
    <>
      <View style={styles.containerstyle}>
        <TouchableOpacity>
          <View style={styles.supportButton}>
            <Text style={styles.text1}>Help & Contact</Text>
          </View>
        </TouchableOpacity>
        <Image
          style={styles.logoStyle}
          source={require('../../assets/images/verification2.png')}></Image>
        <Text style={styles.titletext}>Revision needed</Text>
        <Text style={styles.text2}>
          We found some information missing or inaccurate, kindly resubmit the
          form with all information.
        </Text>

        <Button
          title="Resubmit"
          onPress={() => {
            navigation.navigate('SubscriptionPromptScreen');
          }}
          wrapperStyle={styles.footer}
        />
      </View>
    </>
  );
}
