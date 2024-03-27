import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import Icon from 'react-native-remix-icon';
import DropDown from '../../components/dropDown';
import SavedAddressesScreen from '../SavedAddressesScreen';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native'; // Import from stripe-react-native
import {Api_path} from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeliveryApplyScreen({navigation}) {
  const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
  const [valuePaymentMethod, setValuePaymentMethod] = useState();
  const [itemsPaymentMethod, setItemsPaymentMethod] = useState([
    {label: 'Apple Pay', value: 'Apple Pay'},
  ]);
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentSheetParams = async () => {
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        `https://following-backend-dev-be2ebc5fdad3.herokuapp.com/stripe/intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            currency: 'pkr',
            amount: 60000,
          }),
        },
      ).then(res => {
        res.json().then(json => {
          console.log(json, ':stripe/intent api response');
        });
      });
      // const {paymentIntent, ephemersalKey, customer} = await response.json();
    } catch (error) {
      console.error(error, 'error');
    }
    // console.log(
    //   paymentIntent,
    //   ephemersalKey,
    //   customer,
    //   response.json(),
    //   'response',
    // );
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    // const {
    //   paymentIntent,
    //   ephemeralKey,
    //   customer,
    //   // publishableKey,
    // } = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: '1',
      customerEphemeralKeySecret: '',
      paymentIntentClientSecret:
        'pi_3OwLYQADTNbHc8P61z7N2tvA_secret_mwfLQdUaOyMF2iYNWfXqM29Iv',
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <>
      <StripeProvider publishableKey="pk_test_51OWZbJADTNbHc8P6rxTqJTZmvlk7A8Cvp7cO9wr8y2Nn3kLeCT7g9iXml0hhcM3HIbkWH6rwFzI50A9zRen3CPWk00heWzumz4">
        <StatusBar
          animated={true}
          backgroundColor="#D4FF02"
          barStyle="dark-content"
        />
        <Header title="PR Package Delivery" type="Details" />
        <View style={styles.containerstyle}>
          <Text style={styles.headingText}>Where should we deliver?</Text>
          <Image
            resizeMode="center"
            style={styles.logoStyle}
            source={require('../../assets/images/delivery.png')}></Image>
          <Text style={styles.graytext}>SELECT ADDRESS</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SavedAddressesScreen')}>
            <View style={styles.itemContainerStyle}>
              <Text style={styles.text1}>View Saved Addresses</Text>
              <Icon name="ri-arrow-right-s-line" size="20" color="#000" />
            </View>
          </TouchableOpacity>

          <View style={styles.row}>
            <Text style={styles.graytext}>DELIVERY FEES</Text>
            <Text style={[styles.graytext, {color: '#171717'}]}>
              Join Following+ and save on fees
            </Text>
          </View>
          <View style={styles.itemContainerStyle}>
            <Text style={styles.text1}>AED 35</Text>
          </View>
          <Text style={styles.graytext}>PAYMENT METHOD</Text>
          <DropDown
            placeholder={'PAYMENT METHOD'}
            open={openPaymentMethod}
            value={valuePaymentMethod}
            items={itemsPaymentMethod}
            //   onOpen={onCategoryOpen}
            setOpen={setOpenPaymentMethod}
            setValue={
              setValuePaymentMethod
              // handlePaymentMethodSelection;
            }
            setItems={setItemsPaymentMethod}
            wrapperStyle={{
              zIndex: 2,
            }}
          />
          {/* <CardField
            postalCodeEnabled={false} // You can set it to true if you want to collect postal code
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 10,
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          /> */}
          {/* <Button
            title="Confirm Payment"
            onPress={handleConfirmPayment}
            disabled={loading}
          /> */}

          {/* <Button
            variant="primary"
            disabled={!loading}
            title="Checkout"
            onPress={openPaymentSheet}
          /> */}
        </View>
        <View style={styles.footer}>
          <Button
            title="Get PR Package Delivered"
            onPress={() => navigation.navigate('DeliverySuccessScreen')}
          />
        </View>
      </StripeProvider>
    </>
  );
}
