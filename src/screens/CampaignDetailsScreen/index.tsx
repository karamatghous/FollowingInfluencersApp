import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import ButtonPlus from '../../components/buttonPlus';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast';
import {capitalize, replaceCommaWithAnd} from '../../utils/constants';

export default function CampaignDetailsScreen({route, navigation}) {
  // console.log(route.params?.details, 'details in campaign datail screen');
  const toasts = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showReserveSpot, setShowReserveSpot] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCampaignDetails();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getCampaignDetails();
  }, []);

  const getCampaignDetails = async () => {
    setDataLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaignInfluencer/single/' +
          route.params?.details.id,
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
          console.log(json, ':Campaign Details api response');
          setCampaignDetails(json.data);
          setDataLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setDataLoading(false);
    }
  };

  const handleReserveSpot = async () => {
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaignInfluencer',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            campaignId: campaignDetails?.id,
            influencerId: 286,
            paymentStatus: 11,
            campaignStatus: 24,
            date: date.toDateString(),
            time: date.toLocaleTimeString([], {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
          }),
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ':Reserve spots api response');
          console.log(res.status, 'status code');
          if (res.status == 200) {
            setModalVisible(false);
            navigation.navigate('ReservedSpotsScreen', {
              details: campaignDetails,
              date: date.toDateString(),
              time: date.toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }),
              campaignInfluencer: json.data.campaignInfluencer,
            });
          }
          if (res.status == 400) {
            setModalVisible(false);
            toasts.current.show(
              'Influencer already present for a Campaign',
              2000,
            );
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
      <StatusBar
        animated={true}
        backgroundColor="#D4FF02"
        barStyle="dark-content"
      />
      <Header title="Campaign Details" type="Details" />
      {dataLoading == true ? (
        <ActivityIndicator
          color={'#000'}
          style={{alignSelf: 'center', flex: 1}}
        />
      ) : (
        <>
          <ScrollView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
            <View style={styles.containerstyle}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.logoContainer}>
                  <Image
                    resizeMode="contain"
                    style={styles.logoStyle}
                    source={{uri: route.params?.details.logoLink}}></Image>
                </View>
                <View>
                  <Text style={styles.headingText}>
                    {route.params?.details.title}
                  </Text>
                  <Text style={styles.text1}>
                    Past Campaigns: {campaignDetails?.pastCampaigns}
                  </Text>
                  <Text style={styles.text1}>
                    Rating: {campaignDetails?.rating} Stars
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.row}>
                  <Text style={styles.text1}>Campaign Type</Text>
                  <Text style={styles.text2}>
                    {capitalize(campaignDetails?.campaignType)} Campaign
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text1}>Platform(s)</Text>
                  <Text style={[styles.text2, {maxWidth: '70%'}]}>
                    {replaceCommaWithAnd(campaignDetails?.channels.join(','))}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text1}>Location</Text>
                  <Text style={styles.text2}>
                    {campaignDetails?.city}, {campaignDetails?.country}
                  </Text>
                </View>
              </View>
              <View style={[styles.itemContainer, {borderColor: '#D4FF02'}]}>
                <View style={styles.row}>
                  <Text style={styles.text1}>Available Spots</Text>
                  <Text style={styles.text2}>
                    {campaignDetails?.availableSpots}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text1}>Paid / Barter</Text>
                  <Text style={styles.text2}>
                    {capitalize(campaignDetails?.paymentType)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text1}>Payment Amount</Text>
                  <Text style={styles.text2}>
                    AED {campaignDetails?.billing?.budgetPerInfluencer}
                  </Text>
                </View>
              </View>
              <View style={styles.itemContainer}>
                <View style={styles.row}>
                  <Text style={[styles.text2, {fontSize: 14}]}>
                    Requirements
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('RequirementsDetails', {
                        details: campaignDetails,
                      })
                    }>
                    <Text
                      style={[styles.text2, {textDecorationLine: 'underline'}]}>
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
                    <Text
                      style={[styles.text2, {textDecorationLine: 'underline'}]}>
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
          {route.params?.details.campaignType == 'delivery' && (
            <View style={styles.footer}>
              {route.params?.details.paymentType == 'Paid' ||
              route.params?.details.paymentType == 'paid' ? (
                <>
                  <Button
                    wrapperStyle={{backgroundColor: '#DADADA'}}
                    title="Get PR Package Delivered"
                  />
                  <ButtonPlus
                    wrapperStyle={{marginTop: 0}}
                    onPress={() =>
                      navigation.navigate('SubscriptionPromptScreen')
                    }
                  />
                </>
              ) : (
                <>
                  <Button
                    title="Get PR Package Delivered"
                    onPress={() => navigation.navigate('DeliveryApplyScreen')}
                  />
                </>
              )}
            </View>
          )}
          {route.params?.details.campaignType == 'walkIn' && (
            <View style={styles.footer}>
              {route.params?.details.paymentType == 'Paid' ||
              route.params?.details.paymentType == 'paid' ? (
                <>
                  <Button
                    wrapperStyle={{backgroundColor: '#DADADA'}}
                    title="Paid Campaigns Locked"
                  />
                  <ButtonPlus
                    wrapperStyle={{marginTop: 0}}
                    onPress={() =>
                      navigation.navigate('SubscriptionPromptScreen')
                    }
                  />
                </>
              ) : (
                <>
                  <Button
                    title="Instantly Apply"
                    onPress={() => setModalVisible(true)}
                  />
                </>
              )}
            </View>
          )}
        </>
      )}

      {modalVisible == true && (
        <>
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType={'slide'}>
            <View
              style={{
                height: '100%',
                // backgroundColor: 'rgba(255,255,255,0.6)',
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: modalVisible ? -1 : 2,
              }}>
              <View style={styles.modalFooter}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <View
                    style={{
                      height: '50%',
                      backgroundColor: 'transparent',
                    }}></View>
                </TouchableOpacity>

                <View style={styles.modalFooterContainer}>
                  {showReserveSpot == true && (
                    <View>
                      <Text
                        style={[
                          styles.headingText,
                          {textAlign: 'center', fontSize: 20},
                        ]}>
                        Apply to Walk-in Campaign
                      </Text>
                      <Text
                        style={[
                          styles.text2,
                          {textAlign: 'center', fontSize: 11},
                        ]}>
                        This campaign type is ‘walk-in’ and requires you{'\n'}to
                        visit the store to participate. When will you{'\n'}
                        visit?
                      </Text>
                      {campaignDetails?.availableSpots == 0 ? (
                        <Text
                          style={[
                            styles.headingText,
                            {
                              textAlign: 'center',
                              fontSize: 20,
                              marginTop: '25%',
                            },
                          ]}>
                          No available spots
                        </Text>
                      ) : (
                        <>
                          <View style={styles.row2}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowDatePicker(true);
                                setShowReserveSpot(false);
                              }}>
                              <View style={styles.dateTimeContainer}>
                                <Text
                                  style={[
                                    styles.headingText,
                                    {marginBottom: 0},
                                  ]}>
                                  {date.toDateString()}
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setShowTimePicker(true);
                                setShowReserveSpot(false);
                              }}>
                              <View style={styles.dateTimeContainer}>
                                <Text
                                  style={[
                                    styles.headingText,
                                    {marginBottom: 0},
                                  ]}>
                                  {date.toLocaleTimeString([], {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                  })}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <Text
                            style={[
                              styles.text2,
                              {textAlign: 'center', fontSize: 11},
                            ]}>
                            This spot will be reserved for you for 1 hour within
                            the
                            {'\n'}selected time
                          </Text>
                          <Button
                            title="Reserve My Spot"
                            onPress={() => {
                              // setShowDatePicker(true);
                              // setShowReserveSpot(false);
                              // setModalVisible(false);
                              handleReserveSpot();
                            }}
                          />
                        </>
                      )}
                    </View>
                  )}
                  {showDatePicker == true && (
                    <>
                      <View style={{alignItems: 'center'}}>
                        <DatePicker
                          mode="date"
                          date={date}
                          onDateChange={setDate}
                          minimumDate={new Date()}
                          style={{
                            marginVertical: 20,
                            backgroundColor: '#FAFAFA',
                            alignSelf: 'center',
                          }}
                          textColor="#171717"
                        />
                      </View>

                      <Button
                        title="Select Date"
                        onPress={() => {
                          setShowDatePicker(false);
                          setShowReserveSpot(true);
                        }}
                      />
                    </>
                  )}
                  {showTimePicker == true && (
                    <>
                      <View>
                        <DatePicker
                          mode="time"
                          date={date}
                          onDateChange={setDate}
                          minimumDate={new Date()}
                          // maximumDate={moment().add(5, 'years')}
                          style={{
                            marginVertical: 20,
                            backgroundColor: '#FAFAFA',
                            alignSelf: 'center',
                          }}
                          textColor="#171717"
                        />
                      </View>
                      <Button
                        title="Select Time"
                        onPress={() => {
                          setShowTimePicker(false);
                          setShowReserveSpot(true);
                        }}
                      />
                    </>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </>
  );
}
