import React, {useState} from 'react';
import {Image, StatusBar, Text, View} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import Icon from 'react-native-remix-icon';
import DropDown from '../../components/dropDown';
import HomeScreen from '../HomeScreen';

export default function DeliverySuccessScreen({navigation}) {
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [valuePaymentMethod, setValuePaymentMethod] = useState();
  const [itemsPaymentMethod, setItemsPaymentMethod] = useState([
    {label: 'Apple Pay', value: 'Apple Pay'},
  ]);
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#D4FF02"
        barStyle="dark-content"
      />
      <Header title="PR Package Delivery" type="Details" />
      <View style={styles.containerstyle}>
        <Text style={styles.headingText}>
          Charge your camera!{'\n'}Your PR Package is on the{'\n'}way
        </Text>
        <Text style={styles.text1}>
          Our delivery agent will contact you shortly with{'\n'}the date & time
          of delivery
        </Text>
        <Image
          resizeMode="center"
          style={styles.logoStyle}
          source={require('../../assets/images/delivery.png')}></Image>
      </View>
      <View style={styles.footer}>
        <Button
          title="Return to Home"
          onPress={() => navigation.navigate('HomeScreen')}
        />
      </View>
    </>
  );
}
