import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';

export default function VerificationStartScreen({navigation}) {
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
          source={require('../../assets/images/verification1.png')}></Image>
        <Text style={styles.titletext}>Conducting One Time verification</Text>
        <Text style={styles.text2}>
          Your account is under verification, we will notify you once it’s
          verified
        </Text>

        <Button
          title="You’ll be notified soon"
          onPress={() => {
            navigation.navigate('VerificationPassScreen');
          }}
          wrapperStyle={styles.footer}
        />
      </View>
    </>
  );
}
