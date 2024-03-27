import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';
import HomeScreen from '../../screens/HomeScreen';
import OfficeScreen from '../../screens/OfficeScreen';
import ActiveScreen from '../../screens/ActiveScreen';
import MenuScreen from '../../screens/MenuScreen';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigation({route}) {
  // console.log(route.params?.data, 'routes in bottom tab');
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS == 'ios' ? 90 : 60,
          paddingVertical: 10,
          backgroundColor: '#171717',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#848484',
        tabBarLabelStyle: {
          marginBottom: 10,
          fontFamily: 'Manrope-Regular',
        },
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={styles.iconStyle}
              tintColor={focused ? '#FFF' : '#848484'}
              source={require('../../assets/icons/Home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OfficeScreen"
        component={OfficeScreen}
        options={{
          tabBarLabel: 'Office',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              style={styles.iconStyle}
              tintColor={focused ? '#FFF' : '#848484'}
              source={require('../../assets/icons/Wallet.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ActiveScreen"
        component={ActiveScreen}
        // initialParams={{data: route.params?.data}}
        options={{
          tabBarLabel: 'Active',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                flexDirection: 'row',
                // alignSelf: 'center',
                // alignContent: 'center',
                marginLeft: 7,
              }}>
              <Image
                style={styles.iconStyle}
                tintColor={focused ? '#FFF' : '#848484'}
                source={require('../../assets/icons/inbox.png')}
              />
              <View
                style={{
                  width: 13,
                  height: 13,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  marginTop: -8,
                  marginLeft: -6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Manrope-Bold',
                    fontSize: 8,
                    color: '#fff',
                  }}>
                  1
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Menu',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="ri-menu-line"
              size="20"
              color={focused ? '#FFF' : '#848484'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export const styles = StyleSheet.create({
  iconStyle: {width: 20, height: 15},
});
