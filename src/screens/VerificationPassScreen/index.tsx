import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';

export default function VerificationPassScreen({navigation}) {
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
        <Text style={styles.titletext}>All good to go</Text>
        <Text style={styles.text2}>
          You’re successfully verified, and can now proceed with your Following
          journey, Find your Following Score in the menu.
        </Text>

        <Button
          title="Begin"
          onPress={() => {
            navigation.navigate('VerificationFailScreen');
          }}
          wrapperStyle={styles.footer}
        />
      </View>
    </>
  );
}
