import React, {useEffect, useRef, useState} from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';

export default function WithdrawFundsSuccess({navigation}) {
  const toasts = useRef();

  return (
    <>
      <Header
        title="Withdraw Funds"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <View style={styles.containerstyle}>
        <ImageBackground
          resizeMode="stretch"
          style={{
            width: '100%',
            height: '70%',
            marginBottom: -120,
            alignItems: 'center',
            paddingTop: 40,
          }}
          source={require('../../assets/images/wallet_banner3.png')}>
          <Text style={styles.text1}>
            Woohoo! Your money is on the way to you!
          </Text>
          <Text style={styles.headingtext}>AED 7,500</Text>
        </ImageBackground>
        <View style={styles.row}>
          <Text style={styles.text1}>ACCOUNT NO.</Text>
          <Text style={styles.placeholdertext}>AE24 5492 4847 2294 493283</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>TIME OF INITIATION</Text>
          <Text style={styles.placeholdertext}>12/1/2023 09:51:23 AM</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text1}>REF. NUMBER</Text>
          <Text style={styles.placeholdertext}>12984736</Text>
        </View>
        <Text style={[styles.text1, {textAlign: 'center', marginTop: 20}]}>
          Kindly note: bank transfers require 7-10 business days
        </Text>
      </View>
    </>
  );
}
