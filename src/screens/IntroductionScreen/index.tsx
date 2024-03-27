import React, {useRef, useState} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import {styles} from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';

export default function IntroductionScreen({navigation}) {
  const ref = useRef(null as any);
  const [ind, setind] = useState();

  const slides = [
    {
      key: 's1',
      text: 'View live barter/paid campaigns, tailored to your audience niche, eligibility, & fees.',
      title: 'Browse' + '\n' + 'Nearby Campaigns',
      image: require('../../assets/images/intro1.png'),
    },
    {
      key: 's2',
      title: 'Instantly Visit Stores' + '\n' + 'or Deliver Products',
      text: "Walk-in or enroll online to any open campaign, you're pre-approved to enable real-time facilitation.",
      image: require('../../assets/images/intro2.png'),
    },
    {
      key: 's3',
      title: 'Seamlessly' + '\n' + 'Get Payments',
      text: 'Once the campaigns are completed, instantly withdraw your payments through various modes',
      image: require('../../assets/images/intro3.png'),
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <View style={styles.slidercontainer}>
        <Image source={item.image} style={styles.introImageStyle} />
        <Text style={styles.titletext}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const RenderNextButton = () => {
    setind(ref?.current?.state?.activeIndex);
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Button
          title="Next"
          onPress={() => {
            ref?.current?.goToSlide(ind + 1);
          }}
        />
      </View>
    );
  };
  const RenderDoneButton = () => {
    return (
      <View>
        <Button
          title="Continue"
          onPress={() => {
            AsyncStorage.setItem('intro', 'true');
            navigation.dispatch(StackActions.replace('SignUpScreen'));
          }}
        />
      </View>
    );
  };
  return (
    <>
      <View style={styles.containerstyle}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <AppIntroSlider
            data={slides}
            ref={ref}
            renderItem={RenderItem}
            showSkipButton={false}
            bottomButton={true}
            renderNextButton={RenderNextButton}
            showDoneButton={true}
            renderDoneButton={RenderDoneButton}
            activeDotStyle={{
              backgroundColor: '#0A1221',
              marginBottom: Platform.OS == 'ios' ? '160%' : '120%',
            }}
            dotStyle={{
              backgroundColor: 'gray',
              marginBottom: Platform.OS == 'ios' ? '160%' : '120%',
            }}
          />
        </View>
      </View>
    </>
  );
}
