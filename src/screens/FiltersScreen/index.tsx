import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import BackButton from '../../components/backButton';
import Header from '../../components/header';
import Icon from 'react-native-remix-icon';
import {StackActions} from '@react-navigation/native';
import HomeScreen from '../HomeScreen';

export default function FiltersScreen({route, navigation}) {
  const {onDataReceived} = route.params;
  console.log(route.params, 'jbjdbjhbvd');
  const [sort, setSort] = useState(route.params?.sort);
  const [sortBy, setSortBy] = useState([
    {title: 'Recently Listed', value: 'recent'},
    {title: 'Highest Payout', value: 'highestPay'},
    {title: 'Spots Left', value: 'spots'},
  ]);
  const [categories, setCategories] = useState(route.params?.category);
  const [categoriesFilter, setCategoriesFilter] = useState([
    {title: 'Paid Campaigns', value: 'paid'},
    {title: 'Barter Campaigns', value: 'barter'},
    {title: 'All', value: 'all'},
  ]);
  // const [platform, setPlatform] = useState(route.params?.platform);
  const [platformFilter, setPlatformFilter] = useState([
    {title: 'Instagram', value: 'Instagram', selected: false},
    {title: 'Snapchat', value: 'snapchat', selected: false},
    {title: 'Tiktok', value: 'tiktok', selected: false},
    {title: 'All', value: 'all', selected: true},
  ]);
  const [selectedplatform, setSelectedPlatform] = useState([
    route.params?.platform,
  ]);

  useEffect(() => {
    if (route.params?.platform) {
      const selectedPlatforms = route.params.platform;
      setPlatformFilter(prevFilter =>
        prevFilter.map(platform =>
          selectedPlatforms.includes(platform.value)
            ? {...platform, selected: true}
            : {...platform, selected: false},
        ),
      );
    }
  }, [route.params?.platform]);

  const handlePlatformSelection = index => {
    const updatedPlatformFilter = [...platformFilter];
    const selectedPlatforms = [];

    if (index === platformFilter.length - 1) {
      // If "All" is selected, unselect all other platforms
      updatedPlatformFilter.forEach((platform, i) => {
        updatedPlatformFilter[i] = {
          ...platform,
          selected: i === index,
        };
      });
    } else {
      // If any other platform is selected, toggle its selection
      updatedPlatformFilter[index] = {
        ...platformFilter[index],
        selected: !platformFilter[index].selected,
      };

      // If the selected count exceeds 2, toggle off the current selection
      const selectedCount = updatedPlatformFilter.filter(
        p => p.selected,
      ).length;
      if (selectedCount > 2 && updatedPlatformFilter[index].selected) {
        updatedPlatformFilter[index].selected = false;
      }

      // Unselect "All" if any other platform is selected
      updatedPlatformFilter[platformFilter.length - 1].selected = false;
    }

    updatedPlatformFilter.forEach(platform => {
      if (platform.selected) {
        selectedPlatforms.push(platform.value);
      }
    });

    setPlatformFilter(updatedPlatformFilter);
    setSelectedPlatform(selectedPlatforms);
  };

  const handleReset = () => {
    const updatedPlatformFilter = platformFilter.map(platform => ({
      ...platform,
      selected: platform.value === 'all',
    }));
    setPlatformFilter(updatedPlatformFilter);
    setSort('highestPay');
    setCategories('all');
    setSelectedPlatform(['all']);
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#D4FF02"
        barStyle="dark-content"
      />
      <Header />

      <View style={styles.containerstyle}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="ri-arrow-left-s-line" size="24" color="#000" />
          </TouchableOpacity>
          <Text style={styles.titletext}>Enable Filters</Text>
          <View style={styles.filterContainer}>
            <Image
              style={{width: 20, height: 22}}
              source={require('../../assets/icons/filter.png')}></Image>
          </View>
        </View>
        <ScrollView>
          <View style={styles.card}>
            <Text style={styles.titletext}>Sort by</Text>
            <View>
              <FlatList
                horizontal
                data={sortBy}
                // numColumns={2}
                contentContainerStyle={styles.listContents}
                renderItem={({item, index}) => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setSort(item.value);
                        }}>
                        <View
                          style={[
                            styles.rectangleButton,
                            {
                              backgroundColor:
                                item.value === sort ? '#D4FF02' : '#EBEBEB',
                            },
                          ]}>
                          <Text style={styles.text1}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <Text style={styles.titletext}>Categories</Text>
            <View>
              <FlatList
                style={{alignSelf: 'flex-start'}}
                // horizontal
                data={categoriesFilter}
                contentContainerStyle={{alignItems: 'flex-start'}}
                renderItem={({item, index}) => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setCategories(item.value);
                        }}>
                        <View
                          style={[
                            styles.rectangleButton,
                            {
                              backgroundColor:
                                item.value === categories
                                  ? '#D4FF02'
                                  : '#EBEBEB',
                            },
                          ]}>
                          <Text style={styles.text1}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>

            <Text style={styles.titletext}>Platform</Text>
            <View>
              <FlatList
                horizontal
                data={platformFilter}
                contentContainerStyle={styles.listContents}
                renderItem={({item, index}) => {
                  return (
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          handlePlatformSelection(index);
                        }}>
                        <View
                          style={[
                            styles.rectangleButton,
                            {
                              backgroundColor: item.selected
                                ? '#D4FF02'
                                : '#EBEBEB',
                            },
                          ]}>
                          <Text style={styles.text1}>{item.title}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.grayContainer}>
              <Text style={[styles.titletext, {textAlign: 'center'}]}>
                Join Following+ to unlock Paid Campaigns
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            title="Reset"
            wrapperStyle={{
              backgroundColor: '#171717',
              width: '47%',
            }}
            textwrapperStyle={{color: '#fff'}}
            onPress={() => {
              handleReset();
            }}
          />
          <Button
            title="OK"
            wrapperStyle={{
              width: '47%',
            }}
            onPress={() => {
              onDataReceived([
                sort,
                categories,
                selectedplatform.join(','),
                selectedplatform,
              ]);
              navigation.goBack();
              console.log(
                platformFilter,
                'platform filter',
                selectedplatform.join(', '),
              );
              // navigation.dispatch(
              //   StackActions.replace('BottomTabNavigation'),
              // );
            }}
          />
        </View>
      </View>
    </>
  );
}
