import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Header from '../../components/header';
import Button from '../../components/button';
import {capitalize} from '../../utils/constants';
import Clipboard from '@react-native-community/clipboard';

export default function RequirementsDetails({route, navigation}) {
  // console.log(route.params?.details, 'details in requirement screen');
  const [copiedText, setCopiedText] = useState('');

  const [platformData, setPlatformData] = useState(
    route.params?.details.socialMediaChannels[0],
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const onContainerLayout = event => {
    setContainerWidth(event.nativeEvent.layout.width);
  };
  const renderTabItem = (item, index, totalItems) => (
    <TouchableOpacity
      onPress={() => {
        setPlatformData(item);
      }}>
      <View
        key={index}
        style={[
          item.platform == platformData.platform
            ? [
                styles.tabButtonsChecked,
                index === 0
                  ? styles.radius1
                  : index === totalItems - 1
                  ? styles.radius2
                  : {borderRadius: 0},
              ]
            : styles.tabButtonsUnChecked,
          {
            width:
              containerWidth / route.params?.details.socialMediaChannels.length,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Image style={[styles.socialLogo]} source={{uri: item.logo}}></Image>
          <Text style={styles.tabText}>{capitalize(item.platform)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="#D4FF02"
        barStyle="dark-content"
      />
      <Header title="Requirements Details" type="Details" />
      <ScrollView>
        <View style={styles.containerstyle}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="center"
              style={styles.logoStyle}
              source={{uri: route.params?.details.logoLink}}></Image>
          </View>
          <View>
            <Text style={styles.headingText}>
              {route.params?.details.title}
            </Text>
            <Text style={styles.text1}>
              Past Campaigns: {route.params?.details.pastCampaigns}
            </Text>
            <Text style={styles.text1}>
              Rating: {route.params?.details.rating} Stars
            </Text>
          </View>
          <View style={styles.tabsContainer} onLayout={onContainerLayout}>
            {route.params?.details.socialMediaChannels.map((item, index) =>
              renderTabItem(
                item,
                index,
                route.params?.details.socialMediaChannels.length,
              ),
            )}
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 8,
              borderRadius: 10,
              borderWidth: 0.7,
              borderColor: '#E8E8E8',
              marginTop: 5,
              zIndex: -1,
              width: '100%',
              marginBottom: 100,
            }}>
            {platformData.platform == 'instagram' ? (
              <View style={styles.greenContainer}>
                <View style={styles.column}>
                  <Text style={styles.text3}>Story</Text>
                  <Text style={styles.numericText}>
                    {platformData?.content[0]}
                  </Text>
                  <Text style={styles.underlineText}>Video</Text>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.column}>
                  <Text style={styles.text3}>Reel</Text>
                  <Text style={styles.numericText}>
                    {platformData?.content[1]}
                  </Text>
                  <Text style={[styles.text2, {color: 'transparent'}]}>.</Text>
                </View>
                <View style={styles.verticleLine}></View>
                <View style={styles.column}>
                  <Text style={styles.text3}>Post</Text>
                  <Text style={styles.numericText}>
                    {platformData?.content[2]}
                  </Text>
                  <Text style={styles.underlineText}>Picture</Text>
                </View>
              </View>
            ) : (
              <View style={styles.greenContainer}>
                <View style={styles.column}>
                  {platformData.platform == 'tiktok' ? (
                    <Text style={styles.text3}>Short video</Text>
                  ) : (
                    <Text style={styles.text3}>Story</Text>
                  )}
                  <Text style={styles.numericText}>
                    {platformData?.content[0]}
                  </Text>
                  <Text style={[styles.text2, {color: 'transparent'}]}>.</Text>
                </View>
              </View>
            )}

            <Text style={styles.text4}>Hashtags</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.text4}>{platformData.hashtags}</Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString(platformData.hashtags)}>
                <View style={styles.copyContainer}>
                  <Image
                    style={[styles.copyLogo]}
                    source={require('../../assets/icons/copy.png')}></Image>
                  <Text style={styles.text2}>Copy</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.text4}>Description</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.text4}>{platformData.description}</Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString(platformData.description)}>
                <View style={styles.copyContainer}>
                  <Image
                    style={[styles.copyLogo]}
                    source={require('../../assets/icons/copy.png')}></Image>
                  <Text style={styles.text2}>Copy</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.text4}>Brand Account</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.text4}>{platformData.brandAccount}</Text>
              <TouchableOpacity
                onPress={() => Clipboard.setString(platformData.brandAccount)}>
                <View style={[styles.copyContainer, {marginTop: -10}]}>
                  <Image
                    style={[styles.copyLogo]}
                    source={require('../../assets/icons/copy.png')}></Image>
                  <Text style={styles.text2}>Copy</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
    </>
  );
}
