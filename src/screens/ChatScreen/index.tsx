import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
// import {
//   Freshchat,
//   FreshchatUser,
//   FreshchatConfig,
// } from 'react-native-freshchat-sdk';
import Button from '../../components/button';
export default function ChatScreen({navigation}) {
  const [chatId, setChatId] = useState('791b4615-9015-4e8d-a367-b240c7194f62');
  const [email, setEmail] = useState('tester5@mail.com');
  // 3f726ba4-b72b-42e8-9010-01cd190c0f0b --tester1@mail.com
  // '60a5829f-c400-4fb2-9ff6-358dbcfcf127'--tester2@mail.com
  // "bbc2dd70-b969-49d1-a2e6-0fd8dce7f363"--tester3@mail.com
  // "0346ace9-ae86-43ed-a33d-fe66f837f927"--tester4@mail.com
  // 791b4615-9015-4e8d-a367-b240c7194f62--tester5@mail.com
  // useEffect(() => {
  //   Freshchat.init({
  //     appId: '7d3c77c7-1dea-465c-834a-e096f900dd78',
  //     appKey: 'e5260317-29c7-4a94-b3bf-773344f55586',
  //     domain: 'msdk.freshchat.com',
  //   });
  //   if (chatId == null) {
  //     identifyUser(email, chatId);
  //     // getUser();
  //     setUser();
  //   } else {
  //     identifyUser(email, chatId);
  //   }
  //   // identifyUser();
  //   // getUser();
  // }, []);

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
  //       });
  //     },
  //   );

  //   Freshchat.addEventListener(Freshchat.EVENT_USER_INTERACTED, actionData => {
  //     console.log('FRESHCHAT_EVENTS triggered', actionData);
  //     var action = actionData.user_action;
  //     console.log(action);
  //   });
  //   Freshchat.addEventListener(Freshchat.FRESHCHAT_EVENTS, actionData => {
  //     console.log('Freshchat Detailed action event triggered');
  //     console.log('Event - ', actionData.event_name);
  //     console.log('Event Properties - ', actionData.properties);
  //   });
  // };
  // const setUser = () => {
  //   var freshchatUser = new FreshchatUser();
  //   console.log(freshchatUser, 'user');
  //   freshchatUser.firstName = 'new';
  //   freshchatUser.lastName = 'tester5';
  //   freshchatUser.email = email;
  //   freshchatUser.phoneCountryCode = '+92';
  //   freshchatUser.phone = '123456789';

  //   Freshchat.setUser(freshchatUser, error => {
  //     // console.log(freshchatUser, 'user');
  //     console.log(error);
  //   });
  // };
  // const getUser = () => {
  //   Freshchat.getUser(user => {
  //     console.log(user);
  //   });
  // };
  // const identifyUser = (externalId, restoreId) => {
  //   Freshchat.identifyUser(externalId, restoreId, error => {
  //     console.log(error);
  //   });
  // };

  return (
    <View style={styles.containerstyle}>
      {/* <Text style={styles.text1}>Chat Screen</Text>
      <Button title="Open Freshchat" onPress={openFreshchat} />
      <Button title="Set Freshchat User" onPress={setUser} />
      <Button title="get User" onPress={getUser} />
      <Button title="identify User" onPress={identifyUser(email, chatId)} /> */}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#D4FF02',
          padding: 15,
          borderRadius: 20,
        }}
        // onPress={openFreshchat}
      >
        <Text style={{color: '#000', fontWeight: 'bold'}}>
          Need Help? Chat with Us!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
