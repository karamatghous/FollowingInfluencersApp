import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ActiveScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [allActiveCampaigns, setAllActiveCampaigns] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getActiveCampaigns();
    });
    return unsubscribe;
  }, [navigation]);

  const getActiveCampaigns = async () => {
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaignInfluencer/active',
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
          console.log(json, ': Get All Active campaign api response');
          setAllActiveCampaigns(json.data);

          setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };
  const renderListItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                style={styles.logoStyle}
                source={require('../../assets/icons/flower.png')}></Image>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.headerText, {minWidth: 30, maxWidth: 150}]}>
                {item.title}
              </Text>
            </View>
            <View style={styles.whiteButton}>
              <Text style={styles.text1}>Started: 12/12/2023</Text>
            </View>
          </View>
          <Text style={styles.text1}>Total Posts Needed: 3</Text>
          <Text style={styles.text1}>Remaining Posts: 1</Text>
          <Text style={styles.text1}>Platforms: Instagram, Snapchat</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={[styles.headerText, {color: '#fff'}]}>
              Get Walk-In Code & Enroll
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      <View style={styles.containerstyle}>
        <Text style={styles.headerText}>Active Campaigns</Text>
        <FlatList
          data={allActiveCampaigns}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}
