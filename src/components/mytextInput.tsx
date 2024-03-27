// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-remix-icon';

// export default function MyTextInput(props: Props) {
//   const [showPassword, setShowPassword] = useState(true);
//   const {
//     value,
//     setValue,
//     wrapperStyle,
//     placeholder,
//     maxLength,
//     placeholderTextColor,
//     secureText,
//     type,
//     screen,
//     showTick,
//     editable,
//     multiline,
//     ref,
//   } = props;
//   console.log(editable, 'editable', ref);
//   return (
//     <View style={[styles.containerStyle, wrapperStyle]}>
//       {type == 'instagram' && (
//         <Image
//           style={styles.socialLogo}
//           source={require('../assets/icons/instagram.png')}></Image>
//       )}
//       {type == 'tiktok' && (
//         <Image
//           style={[styles.socialLogo, {height: 18}]}
//           source={require('../assets/icons/tiktok.png')}></Image>
//       )}
//       {type == 'youtube' && (
//         <Icon
//           style={{marginHorizontal: 5}}
//           name="ri-youtube-fill"
//           size="19"
//           color="#000"></Icon>
//       )}
//       {type == 'phoneNumber' && (
//         <Text
//           style={{
//             fontSize: 12,
//             // width: '90%',
//             color: '#171717',
//             fontFamily: 'Manrope-Medium',
//             paddingTop: 0,
//             paddingBottom: 0,
//             marginLeft: 5,
//           }}>
//           +971
//         </Text>
//       )}

//       <TextInput
//         ref={ref}
//         selectionColor={'#171717'}
//         editable={editable}
//         multiline={multiline}
//         // maxLength={type == 'number' ? 18 : 30}
//         onChangeText={text => setValue(text)}
//         value={value}
//         placeholderTextColor="#848484"
//         placeholder={placeholder}
//         textAlignVertical="center"
//         secureTextEntry={showPassword && type == 'password'}
//         style={{
//           fontSize: 12,
//           width: type == 'phoneNumber' ? '80%' : '90%',
//           color: '#171717',
//           fontFamily: 'Manrope-Medium',
//           paddingTop: 0,
//           paddingBottom: 0,
//         }}
//       />
//       {showTick == true && (
//         <View
//           style={{
//             width: 15,
//             height: 15,
//             backgroundColor: '#D4FF02',
//             alignSelf: 'center',
//             borderRadius: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Icon name="ri-check-line" size="12" color="black"></Icon>
//         </View>
//       )}
//       {type == 'password' && (
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           {showPassword == true ? (
//             <Icon
//               style={{marginHorizontal: 5}}
//               name="ri-eye-fill"
//               size="19"
//               color="#000"></Icon>
//           ) : (
//             <Icon
//               style={{marginHorizontal: 5}}
//               name="ri-eye-off-fill"
//               size="19"
//               color="#000"></Icon>
//           )}
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   containerStyle: {
//     width: '100%',
//     marginVertical: 5,
//     paddingHorizontal: 5,
//     height: 45,
//     borderRadius: 10,
//     flexDirection: 'row',
//     backgroundColor: '#FFF',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#E8E8E8',
//     marginBottom: 20,
//     alignContent: 'center',
//   },
//   socialLogo: {width: 15, height: 15, marginHorizontal: 5},
// });

import React, {useState, forwardRef} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-remix-icon';

const MyTextInput = forwardRef((props, ref) => {
  const [showPassword, setShowPassword] = useState(true);
  const {
    value,
    setValue,
    wrapperStyle,
    placeholder,
    maxLength,
    placeholderTextColor,
    secureText,
    type,
    screen,
    showTick,
    editable,
    multiline,
  } = props;
  // console.log(editable, 'editable', ref);

  return (
    <View style={[styles.containerStyle, wrapperStyle]}>
      {type == 'instagram' && (
        <Image
          style={styles.socialLogo}
          source={require('../assets/icons/instagram.png')}></Image>
      )}
      {type == 'tiktok' && (
        <Image
          style={[styles.socialLogo, {height: 18}]}
          source={require('../assets/icons/tiktok.png')}></Image>
      )}
      {type == 'youtube' && (
        <Icon
          style={{marginHorizontal: 5}}
          name="ri-youtube-fill"
          size="19"
          color="#000"></Icon>
      )}
      {type == 'phoneNumber' && (
        <Text
          style={{
            fontSize: 12,
            // width: '90%',
            color: '#171717',
            fontFamily: 'Manrope-Medium',
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 5,
          }}>
          +971
        </Text>
      )}

      <TextInput
        ref={ref}
        // autoFocus={true}
        selectionColor={'#171717'}
        editable={editable}
        multiline={multiline}
        // maxLength={type == 'number' ? 18 : 30}
        onChangeText={text => setValue(text)}
        value={value}
        placeholderTextColor="#848484"
        placeholder={placeholder}
        textAlignVertical="center"
        secureTextEntry={showPassword && type == 'password'}
        style={{
          fontSize: 12,
          width: type == 'phoneNumber' ? '80%' : '90%',
          color: '#171717',
          fontFamily: 'Manrope-Medium',
          paddingTop: 0,
          paddingBottom: 0,
        }}
      />
      {showTick == true && (
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: '#D4FF02',
            alignSelf: 'center',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="ri-check-line" size="12" color="black"></Icon>
        </View>
      )}
      {type == 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword == true ? (
            <Icon
              style={{marginHorizontal: 5}}
              name="ri-eye-fill"
              size="19"
              color="#000"></Icon>
          ) : (
            <Icon
              style={{marginHorizontal: 5}}
              name="ri-eye-off-fill"
              size="19"
              color="#000"></Icon>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 5,
    height: 45,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 20,
    alignContent: 'center',
  },
  socialLogo: {width: 15, height: 15, marginHorizontal: 5},
});

export default MyTextInput;
