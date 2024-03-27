import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/button';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import Header from '../../components/header';
import Icon from 'react-native-remix-icon';
// import {
//   Freshchat,
//   FreshchatUser,
//   FreshchatConfig,
// } from 'react-native-freshchat-sdk';
export default function MenuScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [myInfo, setMyInfo] = useState({});
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Freshchat.init({
      //   appId: '7d3c77c7-1dea-465c-834a-e096f900dd78',
      //   appKey: 'e5260317-29c7-4a94-b3bf-773344f55586',
      //   domain: 'msdk.freshchat.com',
      // });
      whoAmI();
    });
    return unsubscribe;
  }, [navigation]);
  const whoAmI = async () => {
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/me',
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
          console.log(json, ':WHO AM I api response');
          setMyInfo(json.user);
          if (json.user.chatId == null) {
            console.log('null');
            identifyUser(json.user.email, json.user.chatId);
            setUser(json.user.name, json.user.email, json.user.phoneNumber);
          } else {
            console.log('not null');
            identifyUser(json.user.email, json.user.chatId);
            // identifyUser(myInfo.email, myInfo.chatId);
            getUser();
            // setUser(json.user.name, json.user.email, json.user.phoneNumber);
            // identifyUser(json.user.email, json.user.chatId);
          }
        });
      });
    } catch (error) {
      console.error(error, 'error');
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            AsyncStorage.setItem('token', 'null');
            navigation.dispatch(StackActions.replace('SignInEmailScreen'));
            // Freshchat.resetUser();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to Delete Account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteAccount();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const deleteAccount = async () => {
    console.log(myInfo.id, 'my id');
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/influencer/delete?influencerId=' +
          myInfo.id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ':delete influencer api response');
          if (json.message == 'Deleted successfully') {
            AsyncStorage.setItem('token', 'null');
            navigation.dispatch(StackActions.replace('SignInEmailScreen'));
          }
          setLoading(false);
        });
      });
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };
  const identifyUser = (externalId, restoreId) => {
    // Freshchat.identifyUser(externalId, restoreId, error => {
    //   console.log(error);
    // });
  };
  // const setUser = (name, email, phone) => {
  //   var freshchatUser = new FreshchatUser();
  //   console.log(freshchatUser, 'new user');
  //   freshchatUser.firstName = name;
  //   freshchatUser.lastName = name;
  //   freshchatUser.email = email;
  //   freshchatUser.phone = phone;
  //   freshchatUser.phoneCountryCode = '+97';

  //   Freshchat.setUser(freshchatUser, error => {
  //     // console.log(freshchatUser, 'user');
  //     console.log(error);
  //   });
  // };
  // const getUser = () => {
  //   Freshchat.getUser(user => {
  //     console.log(user, 'get user');
  //   });
  // };
  // const openFreshchat = () => {
  //   // Open Freshchat
  //   Freshchat.showConversations();
  //   Freshchat.addEventListener(
  //     Freshchat.EVENT_USER_RESTORE_ID_GENERATED,
  //     () => {
  //       console.log('onRestoreIdUpdated triggered');
  //       Freshchat.getUser(user => {
  //         var restoreId = user.restoreId;
  //         var externalId = user.externalId;
  //         console.log('externalId: ' + externalId);
  //         console.log('restoreId: ' + restoreId);
  //         updateChatId(myInfo.id, user.restoreId);
  //       });
  //     },
  //   );

  //   // Freshchat.addEventListener(Freshchat.EVENT_USER_INTERACTED, actionData => {
  //   //   console.log('FRESHCHAT_EVENTS triggereds', actionData);
  //   //   var action = actionData.user_action;
  //   //   console.log(action);
  //   // });
  //   // Freshchat.addEventListener(Freshchat.FRESHCHAT_EVENTS, actionData => {
  //   //   console.log('Freshchat Detailed action event triggered');
  //   //   console.log('Event - ', actionData.event_name);
  //   //   console.log('Event Properties - ', actionData.properties);
  //   // });
  // };

  // const updateChatId = async (influencerId, chatId) => {
  //   var token = null;
  //   await AsyncStorage.getItem('token').then(res => {
  //     token = res;
  //   });
  //   try {
  //     const response = await fetch(
  //       'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/influencer/add/chatid?influencerId=' +
  //         influencerId +
  //         '&chatId=' +
  //         chatId,
  //       {
  //         method: 'PUT',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           token: token,
  //         },
  //       },
  //     ).then(res => {
  //       res.json().then(json => {
  //         console.log(json, ':updateChatId api response');
  //       });
  //     });
  //   } catch (error) {
  //     console.error(error, 'error');
  //   }
  // };
  return (
    <>
      <Header
        title="Account"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <View style={styles.containerstyle}>
        <Image
          resizeMode="center"
          style={{width: '100%', height: 70, marginBottom: 10}}
          source={require('../../assets/images/user.png')}></Image>
        <ScrollView>
          <View
            style={[
              styles.whiteContainer,
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{width: 15, height: 15, marginRight: 10}}
                    source={require('../../assets/icons/account_social.png')}></Image>
                </View>
                <Text style={styles.text1}>Social Accounts</Text>
              </View>
              <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SubscriptionPromptScreen')}>
            <View style={styles.whiteContainer}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={{width: 15, height: 15, marginRight: 10}}
                      source={require('../../assets/icons/account_subscription.png')}></Image>
                  </View>
                  <Text style={styles.text1}>Subscriptions</Text>
                </View>
                <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.whiteContainer}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{width: 15, height: 15, marginRight: 10}}
                    source={require('../../assets/icons/shop.png')}></Image>
                </View>
                <Text style={styles.text1}>My Following Score</Text>
              </View>
              <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavedAddressesScreen')}>
            <View
              style={[
                styles.whiteContainer,
                {
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderBottomWidth: 0.7,
                  marginBottom: 10,
                },
              ]}>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={{width: 15, height: 15, marginRight: 10}}
                      source={require('../../assets/icons/account_saved.png')}></Image>
                  </View>
                  <Text style={styles.text1}>Saved Addresses</Text>
                </View>
                <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.whiteContainer,
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              },
            ]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{width: 15, height: 15, marginRight: 10}}
                    source={require('../../assets/icons/account_bell.png')}></Image>
                </View>
                <Text style={styles.text1}>Notifications</Text>
              </View>
              <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
            </View>
          </View>
          <View style={styles.whiteContainer}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <View>
                  <Image
                    resizeMode="contain"
                    style={{width: 15, height: 15, marginRight: 10}}
                    source={require('../../assets/icons/account_star.png')}></Image>
                </View>
                <Text style={styles.text1}>My Rating</Text>
              </View>
              <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.whiteContainer,
              {
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomWidth: 0.7,
                marginBottom: 10,
              },
            ]}
            // onPress={() => navigation.navigate('ChatScreen')}
            // onPress={() => openFreshchat()}
          >
            <View>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={{width: 15, height: 15, marginRight: 10}}
                      source={require('../../assets/icons/account_help.png')}></Image>
                  </View>
                  <Text style={styles.text1}>Help & Contact</Text>
                </View>
                <Icon name="ri-arrow-right-s-line" size="22" color="#0A0615" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.whiteContainer,
              {borderRadius: 10, borderBottomWidth: 0.7, marginBottom: 10},
            ]}
            onPress={() => handleLogout()}>
            <View>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={{width: 15, height: 15, marginRight: 10}}
                      source={require('../../assets/icons/account_logout.png')}></Image>
                  </View>
                  <Text style={styles.text1}>Log Out</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.whiteContainer,
              {borderRadius: 10, borderBottomWidth: 0.7, marginBottom: 10},
            ]}
            onPress={() => handleDelete()}>
            <View>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                <View style={styles.row}>
                  <View>
                    <Image
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        marginRight: 10,
                      }}
                      source={require('../../assets/icons/account_delete.png')}></Image>
                  </View>
                  <Text style={[styles.text1, {color: '#F13005'}]}>
                    Delete Account
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* <Button
          title="Logout"
          onPress={() => {
            AsyncStorage.setItem('token', 'null');
            navigation.dispatch(StackActions.replace('SignInEmailScreen'));
          }}
        /> */}
        {/* <Button
          title="Chat"
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}
        /> */}
      </View>
    </>
  );
}
