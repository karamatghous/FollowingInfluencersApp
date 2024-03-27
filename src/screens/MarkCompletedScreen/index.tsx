import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import MyTextInput from '../../components/mytextInput';
import Header from '../../components/header';
import Icon from 'react-native-remix-icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

export default function MarkCompletedScreen({route, navigation}) {
  console.log(route.params);
  const [filePath, setFilePath] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [data, setData] = useState();

  const [instagramPost, setInstagramPost] = useState(
    route.params?.postdetails == null ? '' : route.params?.postdetails.postLink,
  );
  const [instagramStory, setInstagramStory] = useState(
    route.params?.postdetails == null
      ? ''
      : route.params?.postdetails.storySSName,
  );
  const [instagramReel, setInstagramReel] = useState(
    route.params?.postdetails == null ? '' : route.params?.postdetails.reelLink,
  );

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response;
        setFilePath(source);
        // if (source.assets.length > 0) {
        //   setImageFile(source.assets[0]);

        //   const img = {
        //     fileCopyUri: source.assets[0],
        //     name: source.assets[0].fileName,
        //     size: source.assets[0].fileSize,
        //     type: source.assets[0].type,
        //     uri: source.assets[0].uri,
        //   };
        //   const data = {
        //     influencerId: 286,
        //     campaignId: 104,
        //     postLink: 'http://abc/post/32323434',
        //     reelLink: 'http://abc/post/32323434',
        //     storySS: img,
        //   };
        //   const formData = new FormData();
        //   Object.keys(data).forEach(key => {
        //     if (data[key] instanceof FileList) {
        //       if (data[key].length > 0) {
        //         formData.append(key, data[key][0]);
        //       }
        //     } else if (data[key] instanceof File) {
        //       formData.append(key, data[key]);
        //     } else {
        //       formData.append(key, data[key]);
        //     }
        //   });
        //   console.log(formData, 'formData');

        //   setData(formData);
        //   handleSubmit(formData);
        // }
      }
    });
  };

  const collectData = () => {
    if (Object.keys(filePath).length !== 0) {
      setImageFile(filePath.assets[0]);

      const img = {
        fileCopyUri: filePath.assets[0],
        name: filePath.assets[0].fileName,
        size: filePath.assets[0].fileSize,
        type: filePath.assets[0].type,
        uri: filePath.assets[0].uri,
      };
      const data = {
        influencerId: 286,
        campaignId: 104,
        postLink: 'http://abc/post/32323434',
        reelLink: 'http://abc/post/32323434',
        storySS: img,
      };
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] instanceof FileList) {
          if (data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      console.log(formData, 'formData');

      setData(formData);
      // handleSubmit(formData);
    } else {
      const data = {
        influencerId: 286,
        campaignId: 104,
        postLink: 'http://abc/post/32323434',
        reelLink: 'http://abc/post/32323434',
        storySS: '',
      };
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key] instanceof FileList) {
          if (data[key].length > 0) {
            formData.append(key, data[key][0]);
          }
        } else if (data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });
      console.log(formData, 'formData without image');
    }
  };

  const handleSubmit = async dat => {
    setLoading(true);
    var token = null;
    await AsyncStorage.getItem('token').then(res => {
      token = res;
    });

    try {
      const response = await axios.post(
        'https://following-backend-dev-be2ebc5fdad3.herokuapp.com/campaigninfluencer/complete',
        dat,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token,
            Connection: 'keep-alive',
          },
        },
      );
      console.log('response', response);

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <Header
        title="Mark as Completed"
        type="Details"
        wrapperStyle={{backgroundColor: '#FAFAFA'}}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View style={styles.containerstyle}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 30,
              }}>
              <Image
                resizeMode="contain"
                style={styles.logoStyle}
                source={{uri: route.params?.details.logoLink}}></Image>
              <Text style={styles.headingText}>
                {route.params?.details.title}
              </Text>
            </View>

            <Text style={styles.placeholdertext}>INSTAGRAM POST LINK</Text>
            <MyTextInput
              value={instagramPost}
              setValue={val => setInstagramPost(val)}
              // type={'instagram'}
              editable={true}
              wrapperStyle={{
                borderColor:
                  route.params?.postdetails == null
                    ? '#FF0000'
                    : route.params?.postdetails.postLinkStatus == true
                    ? '#14AE5C'
                    : route.params?.postdetails.postLinkStatus == false
                    ? '#FF7A00'
                    : '#FF0000',
              }}
            />
            <Text style={styles.placeholdertext}>
              INSTAGRAM STORY SCREENSHOT
            </Text>
            <View
              style={[
                styles.UploadContainerStyle,
                {
                  borderColor:
                    route.params?.postdetails == null
                      ? '#FF0000'
                      : route.params?.postdetails.storySSStatus == true
                      ? '#14AE5C'
                      : route.params?.postdetails.storySSStatus == false
                      ? '#FF7A00'
                      : '#FF0000',
                },
              ]}>
              <TouchableOpacity onPress={() => chooseFile()}>
                <Icon
                  style={{marginLeft: 5}}
                  name="ri-upload-cloud-2-line"
                  size="19"
                  color="#848484"></Icon>
              </TouchableOpacity>
              {Object.keys(filePath).length === 0 ? (
                <Text style={styles.placeholdertext}>Upload</Text>
              ) : (
                <Text style={styles.placeholdertext}>
                  {filePath.assets[0].fileName}
                </Text>
              )}
            </View>
            <Text style={styles.placeholdertext}>INSTAGRAM REEL LINK</Text>
            <MyTextInput
              value={instagramReel}
              setValue={val => setInstagramReel(val)}
              wrapperStyle={{
                marginBottom: 200,
                borderColor:
                  route.params?.postdetails == null
                    ? '#FF0000'
                    : route.params?.postdetails.reelLinkStatus == true
                    ? '#14AE5C'
                    : route.params?.postdetails.reelLinkStatus == false
                    ? '#FF7A00'
                    : '#FF0000',
              }}
            />
            <View style={styles.footer}>
              <View style={styles.whiteContainer}>
                <Text style={styles.text1}>Color Key Definitions</Text>
                <View style={[styles.row, {justifyContent: 'space-around'}]}>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.colorDot,
                        {backgroundColor: '#FF0000'},
                      ]}></View>
                    <Text style={styles.placeholdertext}>PENDING</Text>
                  </View>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.colorDot,
                        {backgroundColor: '#FF7A00'},
                      ]}></View>
                    <Text style={styles.placeholdertext}>
                      SENT FOR APPROVAL
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.colorDot,
                        {backgroundColor: '#14AE5C'},
                      ]}></View>
                    <Text style={styles.placeholdertext}>COMPLETE</Text>
                  </View>
                </View>
              </View>
              <Button
                title="Submit Posts"
                onPress={() => {
                  //
                  collectData();
                }}
                // wrapperStyle={styles.footer}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
