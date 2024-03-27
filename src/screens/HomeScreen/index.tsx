import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-remix-icon';
import ButtonPlus from '../../components/buttonPlus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';
import {capitalize, splitStringAtFirstSpace} from '../../utils/constants';

export default function HomeScreen({navigation}) {
  Geocoding.init('AIzaSyDQBzoUlMoN7Cd0m3EQSDU2AyEkSE-E5O4');

  const [loading, setLoading] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFilter, setSortFilter] = useState('all');
  const [categoriesFilter, setCategoriesFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState('');
  const flatListRef = useRef(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getLocation();
    });
    return unsubscribe;
  }, [navigation]);

  const getArea = async (lat, long) => {
    try {
      const response = await Geocoding.from(lat, long);
      const address = response.plus_code.compound_code;
      // console.log(address, 'address');
      // console.log(response, 'address');
      setLocation(splitStringAtFirstSpace(address));
      AsyncStorage.setItem('location', splitStringAtFirstSpace(address));
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  // const getLocation = async () => {
  //   var location = null;
  //   await AsyncStorage.getItem('location').then(res => {
  //     location = res;
  //   });
  //   if (location == null || location == 'null') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         Geolocation.getCurrentPosition(
  //           position => {
  //             const {latitude, longitude} = position.coords;
  //             // console.log(position, 'position');
  //             getArea(latitude, longitude);
  //           },
  //           error => {
  //             console.error(error.message);
  //           },
  //           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //         );
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   } else {
  //     setLocation(location);
  //   }
  // };

  const getLocation = async () => {
    var location = null;
    await AsyncStorage.getItem('location').then(res => {
      location = res;
    });
    if (location == null || location == 'null') {
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
    } else {
      setLocation(location);
    }
  };

  const requestLocationPermission = async () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        getArea(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.log('map error: ', error);
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getCampaigns(sortFilter, categoriesFilter, platformFilter, page);
  }, [page]);

  const fetchData = () => {
    setPage(1);
    setRefreshing(true);
    setTimeout(() => {
      getCampaigns(sortFilter, categoriesFilter, platformFilter, page);
      setRefreshing(false);
    }, 1000);
  };

  const getCampaigns = async (sort, cat, plat, pg) => {
    console.log(sort, cat, plat, pg);

    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });
    try {
      const response = await fetch(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaign/influencer?page=' +
          pg +
          '&per_page=10&sortby=' +
          sort +
          '&category=' +
          cat +
          '&platform=' +
          plat,
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
          console.log(json, ': Get All campaign api response');
          // setAllCampaigns(json.data);
          if (page == 1) {
            setAllCampaigns(json.data);
            setOriginalData(json.data);
          } else {
            setAllCampaigns(prevData => [...prevData, ...json.data]);
            setOriginalData(prevData => [...prevData, ...json.data]);
          }
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
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CampaignDetailsScreen', {details: item})
          }>
          <View style={styles.itemContainer}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={styles.row}>
                <Image
                  resizeMode="center"
                  style={styles.logoStyle}
                  source={{uri: item.logoLink}}></Image>
                <View>
                  <Text
                    // numberOfLines={1}
                    // ellipsizeMode="middle"
                    style={[styles.text1]}>
                    {item.title}
                  </Text>
                  <View style={styles.row}>
                    <Image
                      style={styles.iconLogo}
                      source={require('../../assets/icons/shop.png')}></Image>
                    <Text style={styles.text2}>
                      {item.campaignType == 'walkIn'
                        ? 'In-store Campaign'
                        : 'PR Box Delivery'}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Image
                      style={styles.iconLogo}
                      source={require('../../assets/icons/card.png')}></Image>
                    <Text style={styles.text2}>
                      {capitalize(item.paymentType)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{alignSelf: 'flex-start'}}>
                <View style={styles.flatListButton}>
                  <Text style={styles.text2}>
                    {capitalize(item.campaignType)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {index === 1 && (
          <ButtonPlus
            onPress={() => navigation.navigate('SubscriptionPromptScreen')}
          />
        )}
      </>
    );
  };

  const onDataReceived = data => {
    console.log(data, 'onDataReceived function');
    setSortFilter(data[0]);
    setCategoriesFilter(data[1]);
    setPlatformFilter(data[3]);
    setPage(1);
    getCampaigns(data[0], data[1], data[2], 1);
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setAllCampaigns(originalData);
    } else {
      const filteredData = originalData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setAllCampaigns(filteredData);
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  };
  const handleEndReached = () => {
    // Load more data when the end of the list is reached
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#D4FF02"
        barStyle="dark-content"
      />
      <Header
        title={location}
        onPress={() =>
          navigation.navigate('SavedAddressesScreen', {route: 'home'})
        }
      />
      {/* {loading == true ? (
        <ActivityIndicator
          color={'#000'}
          style={{alignSelf: 'center', flex: 1}}
        />
      ) : ( */}
      <>
        <View style={styles.containerstyle}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Searchbar
              clearIcon={
                searchQuery
                  ? () => <Icon name="ri-close-fill" size="18" color="#000" />
                  : undefined
              }
              clearButtonMode="never"
              placeholder="Search Brands"
              onChangeText={onChangeSearch}
              value={searchQuery}
              textAlign="left"
              inputStyle={[
                styles.text1,
                {fontSize: 12, marginTop: -9, marginLeft: -5},
              ]}
              icon={() => <Icon name="ri-search-line" size="18" color="#000" />}
              style={styles.searchbarContainer}
            />
            <TouchableOpacity
              style={styles.filterContainer}
              onPress={() => {
                navigation.navigate('FiltersScreen', {
                  onDataReceived,
                  sort: sortFilter,
                  category: categoriesFilter,
                  platform: platformFilter,
                });
              }}>
              <View>
                <Image
                  style={{width: 20, height: 22}}
                  source={require('../../assets/icons/filter.png')}></Image>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={allCampaigns}
            renderItem={renderListItem}
            // keyExtractor={item => item.id.toString()}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchData}
                colors={['#000', '#000']}
                progressBackgroundColor="#D4FF02"
              />
            }
            onEndReached={handleEndReached}
            onEndReachedThreshold={1}
          />
        </View>
      </>
      {/* )} */}
    </>
  );
}
