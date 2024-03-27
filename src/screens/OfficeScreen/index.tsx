import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import ButtonPlus from '../../components/buttonPlus';
import ActiveScreen from '../ActiveScreen';

export default function OfficeScreen({navigation}) {
  const [showInvitations, setShowInvitations] = useState(false);

  return (
    <View style={styles.containerstyle}>
      <Text style={styles.headingText}>My Office</Text>
      <Image
        resizeMode="stretch"
        style={styles.cardStyle}
        source={require('../../assets/images/card.png')}></Image>
      <ButtonPlus
        onPress={() => navigation.navigate('SubscriptionPromptScreen')}
      />
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('ActiveScreen')}>
          <View>
            <View>
              <Image
                style={styles.iconStyle}
                tintColor={'#171717'}
                source={require('../../assets/icons/inbox.png')}
              />
              <Text style={styles.text1}>Campaigns</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.itemContainer, {backgroundColor: '#E8E8E8'}]}
          onPress={() => navigation.navigate('WalletScreen')}>
          <View>
            <View>
              <Image
                style={styles.iconStyle}
                tintColor={'#171717'}
                source={require('../../assets/icons/Wallet.png')}
              />
              <Text style={styles.text1}>Wallet</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setShowInvitations(!showInvitations)}>
        <View style={[styles.itemContainer, {width: '100%'}]}>
          <View>
            <Image
              style={styles.iconStyle}
              tintColor={'#171717'}
              source={require('../../assets/icons/message.png')}
            />
            <Text style={styles.text1}>View Invitations</Text>
          </View>
        </View>
      </TouchableOpacity>
      {showInvitations == true && (
        <View style={styles.invitationContainer}>
          <View>
            <Image
              style={{width: 50, height: 50, alignSelf: 'center'}}
              source={require('../../assets/icons/emoji.png')}
            />
            <Text style={[styles.text1, {color: '#BBBBBB'}]}>
              When you receive invitations from a{'\n'}brand, they will appear
              here
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
