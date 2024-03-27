import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';

export default function BackButton(props) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 20,
        paddingTop: Platform.OS == 'ios' ? 60 : 20,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Icon name="ri-arrow-left-s-line" size="24" color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
