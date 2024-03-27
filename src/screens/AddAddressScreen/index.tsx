import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import MyTextInput from '../../components/mytextInput';
import Geocoding from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import {splitStringAtFirstSpace} from '../../utils/constants';
import Toast, {DURATION} from 'react-native-easy-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddAddressScreen({route, navigation}) {
  Geocoding.init('AIzaSyDQBzoUlMoN7Cd0m3EQSDU2AyEkSE-E5O4');
  console.log(route.params?.addressDetails, 'address details');
  const ref_input1 = useRef(null);
  const ref_input2 = useRef(null);

  const toasts = useRef();
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(
    route.params.type == 'new' ? true : false,
  );

  const [houseNumber, setHouseNumber] = useState(
    route.params && route.params.addressDetails
      ? route.params.addressDetails.houseNo
      : '',
  );
  const [floor, setFloor] = useState(
    route.params && route.params.addressDetails
      ? route.params.addressDetails.floor
      : '',
  );
  const [area, setArea] = useState(
    route.params && route.params.addressDetails
      ? route.params.addressDetails.area
      : '',
  );
  const [additionalDirection, setAdditionalDirection] = useState(
    route.params && route.params.addressDetails
      ? route.params.addressDetails.direction
      : '',
  );
  const [address, setAddress] = useState(
    route.params && route.params.addressDetails
      ? route.params.addressDetails.addressLabel
      : '',
  );
  const [initialRegion, setInitialRegion] = useState({
    latitude:
      route.params && route.params.addressDetails
        ? route.params?.addressDetails.latitude
        : 0,
    longitude:
      route.params && route.params.addressDetails
        ? route.params?.addressDetails.longitude
        : 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude:
      route.params && route.params.addressDetails
        ? route.params?.addressDetails.latitude
        : 0,
    longitude:
      route.params && route.params.addressDetails
        ? route.params?.addressDetails.longitude
        : 0,
  });

  useEffect(() => {
    if (route.params.type == 'new') {
      getLocation();
    }
  }, []);
  // const getLocation = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           const {latitude, longitude} = position.coords;
  //           // console.log(position, 'position');
  //           getArea(latitude, longitude);
  //           setInitialRegion(prevRegion => ({
  //             ...prevRegion,
  //             latitude: latitude,
  //             longitude: longitude,
  //           }));
  //           setMarkerCoordinate(prevMarkerCoordinate => ({
  //             ...prevMarkerCoordinate,
  //             latitude: latitude,
  //             longitude: longitude,
  //           }));
  //         },

  //         error => {
  //           console.error(error.message);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     } else {
  //       console.log('Location permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const getLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        const result = await requestLocationPermission();
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              getArea(latitude, longitude);
              setInitialRegion(prevRegion => ({
                ...prevRegion,
                latitude: latitude,
                longitude: longitude,
              }));
              setMarkerCoordinate(prevMarkerCoordinate => ({
                ...prevMarkerCoordinate,
                latitude: latitude,
                longitude: longitude,
              }));
            },
            error => {
              console.error(error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const requestLocationPermission = async () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        getArea(position.coords.latitude, position.coords.longitude);
        setInitialRegion(prevRegion => ({
          ...prevRegion,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setMarkerCoordinate(prevMarkerCoordinate => ({
          ...prevMarkerCoordinate,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      },
      error => {
        console.log('map error: ', error);
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };
  const handleMapPress = async event => {
    // console.log(event.nativeEvent, 'event');
    // Update the marker's coordinate based on the pressed location
    setMarkerCoordinate(event.nativeEvent.coordinate);
    getArea(
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    );
  };
  const getArea = async (lat, long) => {
    try {
      const response = await Geocoding.from(lat, long);
      const address = response.results[0].formatted_address;
      // console.log(address, 'address');
      // console.log(response, 'address');
      setArea(address);
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };
  const handleSaveAddress = async () => {
    // console.log(houseNumber, floor, area, additionalDirection, address);

    if (!houseNumber) {
      toasts.current.show('Please enter House Number', 2000);
      return;
    }
    if (!floor) {
      toasts.current.show('Please enter Floor', 2000);
      return;
    }
    if (!additionalDirection) {
      toasts.current.show('Please enter Additional Direction', 2000);
      return;
    }
    if (!address) {
      toasts.current.show('Please enter Address Label', 2000);
      return;
    }
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      setLoading(true);
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/address',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({
            houseNo: houseNumber,
            floor: floor,
            area: area,
            direction: additionalDirection,
            addressLabel: address,
            influencerId: '286',
            latitude: markerCoordinate.latitude,
            longitude: markerCoordinate.longitude,
          }),
        },
      );

      const data = await response.json();
      console.log(data, 'Add address Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'address added successfully') {
        navigation.goBack();
      }

      setLoading(false);
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      setLoading(true);
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/address/' +
          route.params?.addressDetails.id,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token,
          },
        },
      );

      const data = await response.json();
      console.log(data, 'delete address Api Response');
      toasts.current.show(data.message, 2500);
      if (data.message == 'address deleted') {
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      console.error(error, 'error');
      setLoading(false);
    }
  };
  const handleUpdate = async () => {
    if (
      route.params?.addressDetails.houseNo == houseNumber &&
      route.params?.addressDetails.floor == floor &&
      route.params?.addressDetails.area == area &&
      route.params?.addressDetails.direction == additionalDirection &&
      route.params?.addressDetails.addressLabel == address
    ) {
      console.log('not changed');
    } else {
      console.log('changed');
      var token = null;
      await AsyncStorage.getItem('token').then(res => {
        token = res;
      });
      try {
        setLoading(true);
        const response = await fetch(
          'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/address/' +
            route.params?.addressDetails.id,
          {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              token: token,
            },
            body: JSON.stringify({
              houseNo: houseNumber,
              floor: floor,
              area: area,
              direction: additionalDirection,
              addressLabel: address,
              influencerId: '286',
              latitude: markerCoordinate.latitude,
              longitude: markerCoordinate.longitude,
            }),
          },
        );

        const data = await response.json();
        console.log(data, 'Update address Api Response');
        toasts.current.show(data.message, 2500);
        // if (data.message == 'address added successfully') {
        //   navigation.goBack();
        // }

        setLoading(false);
      } catch (error) {
        console.error(error, 'error');
        setLoading(false);
      }
    }
  };
  const handleChangePress = async () => {
    setEditable(true);
    await ref_input2.current.focus();
    await ref_input1.current.focus();
    // }
  };

  const handleAlert = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => handleDelete()},
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <Toast ref={toasts} style={{flex: 1}} />
      <Header
        title={route.params.type == 'new' ? 'Address ' : 'Address'}
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
        deleteOnPress={() => handleAlert()}
      />
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#FAFAFA'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={{flex: 1, backgroundColor: '#FAFAFA', marginBottom: 110}}>
          <View style={styles.containerstyle}>
            <View style={styles.mapContainer}>
              <View style={{borderRadius: 10, overflow: 'hidden'}}>
                <MapView
                  showsUserLocation={true}
                  style={{width: '100%', height: 150}}
                  onPress={handleMapPress}
                  provider={
                    Platform.OS === 'android'
                      ? PROVIDER_GOOGLE
                      : PROVIDER_DEFAULT
                  }
                  region={initialRegion}>
                  <Marker
                    coordinate={markerCoordinate}
                    // title="You are here"
                    // description="Marker Description"
                  />
                </MapView>
              </View>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.text1,
                    {marginLeft: 10, maxWidth: '75%', marginVertical: 5},
                  ]}>
                  {splitStringAtFirstSpace(area)}
                </Text>
                {route.params.type !== 'new' && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => handleChangePress()}>
                    <Text style={[styles.text1, styles.bold]}>Change</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <Text style={styles.placeholdertext}>HOUSE / APARTMENT NO.</Text>
            <MyTextInput
              ref={ref_input1}
              editable={editable}
              value={houseNumber}
              setValue={val => setHouseNumber(val)}
            />
            <Text style={styles.placeholdertext}>FLOOR</Text>
            <MyTextInput
              ref={ref_input2}
              editable={editable}
              value={floor}
              setValue={val => setFloor(val)}
            />
            <Text style={styles.placeholdertext}>AREA NAME</Text>
            <MyTextInput
              editable={false}
              multiline={true}
              value={area}
              setValue={val => setArea(val)}
            />
            <Text style={styles.placeholdertext}>ADDITIONAL DIRECTIONS</Text>
            <MyTextInput
              editable={editable}
              value={additionalDirection}
              setValue={val => setAdditionalDirection(val)}
            />
            <Text style={styles.placeholdertext}>ADDRESS LABEL</Text>
            <MyTextInput
              editable={editable}
              value={address}
              setValue={val => setAddress(val)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footer}>
        <Button
          title="Save Address"
          loading={loading}
          onPress={() =>
            route.params?.type == 'new' ? handleSaveAddress() : handleUpdate()
          }
        />
      </View>
    </>
  );
}
