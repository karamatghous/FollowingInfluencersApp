// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   ImageBackground,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {styles} from './styles';
// import Button from '../../components/button';
// // import * as RNIap from 'react-native-iap';

// const productId = 'your_product_id';

// export default function SubscriptionPromptScreen({navigation}) {
//   const [products, setProducts] = useState([]);

//   // useEffect(() => {
//   //   async function fetchProducts() {
//   //     try {
//   //       const products = await RNIap.getProducts([productId]);
//   //       setProducts(products);
//   //     } catch (error) {
//   //       console.log('Error fetching products: ', error);
//   //     }
//   //   }

//   //   fetchProducts();

//   //   return () => {
//   //     RNIap.endConnection();
//   //   };
//   // }, []);

//   // const purchaseProduct = async () => {
//   //   try {
//   //     const purchase = await RNIap.requestPurchase(productId);
//   //     console.log('Purchase successful: ', purchase);
//   //     // You can update your app state or UI here after a successful purchase
//   //   } catch (error) {
//   //     console.log('Error purchasing: ', error);
//   //   }
//   // };

//   return (
//     <ScrollView style={{flex: 1, backgroundColor: '#121212'}}>
//       <View style={styles.containerstyle}>
//         <Image
//           style={styles.logoStyle}
//           source={require('../../assets/images/followingplus_logo.png')}></Image>
//         <ImageBackground
//           resizeMode="stretch"
//           style={styles.gradientContainer}
//           source={require('../../assets/images/container.png')}>
//           <Text style={styles.titletext}>
//             One Subscription. {'\n'}Unlimited Perks.
//           </Text>
//           <View style={styles.grayContainer}>
//             <Image
//               style={styles.iconStyle}
//               source={require('../../assets/icons/logo1.png')}></Image>
//             <Text style={styles.text1}>Unlock Paid Campaigns</Text>
//           </View>
//           <View style={styles.grayContainer}>
//             <Image
//               style={styles.iconStyle}
//               source={require('../../assets/icons/logo2.png')}></Image>
//             <Text style={styles.text1}>Join Unlimited Campaigns</Text>
//           </View>
//           <View style={styles.grayContainer}>
//             <Image
//               style={styles.iconStyle}
//               source={require('../../assets/icons/logo3.png')}></Image>
//             <Text style={styles.text1}>Monthly Free PR Packages</Text>
//           </View>
//           <View style={styles.grayContainer}>
//             <Image
//               style={styles.iconStyle}
//               source={require('../../assets/icons/logo4.png')}></Image>
//             <Text style={styles.text1}>Get Priority Support</Text>
//           </View>
//         </ImageBackground>
//         {/* {products.map(product => (
//           <View key={product.productId}>
//             <Text>{product.title}</Text>
//             <Text>{product.description}</Text>
//             <Text>{product.price}</Text>
//           </View>
//         ))}
//         <Button title="Purchase" onPress={purchaseProduct} /> */}

//         <Button
//           title="One Month for AED 89"
//           //   onPress={() => {
//           //     navigation.navigate('SignInEmailScreen');
//           //   }}
//           wrapperStyle={{backgroundColor: '#FAFAFA', marginVertical: 0}}
//         />

//         <TouchableOpacity>
//           <ImageBackground
//             style={styles.gradientButton}
//             imageStyle={{borderRadius: 10}}
//             source={require('../../assets/icons/gradient_button.png')}>
//             <Text style={styles.buttonText}>6 Months for AED 259</Text>
//           </ImageBackground>
//         </TouchableOpacity>

//         <Text style={[styles.text1, {textAlign: 'center'}]}>
//           Save 50% by subscribing for 6 months
//         </Text>

//         <Button
//           title="Continue as Free User"
//           onPress={() => {
//             navigation.navigate('BottomTabNavigation');
//           }}
//           wrapperStyle={styles.footer}
//         />
//       </View>
//     </ScrollView>
//   );
// }

import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import Button from '../../components/button';
import * as RNIap from 'react-native-iap';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  getSubscriptions,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

const productId = [
  'com.following.1_month_subscription',
  'com.following.6_month_subscription',
];

export default function SubscriptionPromptScreen({navigation}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // ComponentDidMount: Set up the IAP connection and listeners
    initConnection().then(() => {
      fetchProducts();

      // Remove "ghost" pending payments
      flushFailedPurchasesCachedAsPendingAndroid()
        .catch(() => {
          // Handle or ignore exceptions here
        })
        .then(() => {
          // Purchase Updated Listener
          const purchaseUpdateSubscription = purchaseUpdatedListener(
            purchase => {
              console.log('purchaseUpdatedListener', purchase);
              const receipt = purchase.transactionReceipt;
              // if (receipt) {
              //   yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
              //     .then(async (deliveryResult) => {
              //       if (isSuccess(deliveryResult)) {
              //         // Handle successful transaction
              //         await finishTransaction({ purchase, isConsumable: !!purchase.isConsumable });
              //       } else {
              //         // Handle unsuccessful transaction
              //       }
              //     });
              // }
            },
          );
          const purchaseErrorSubscription = purchaseErrorListener(error => {
            console.warn('purchaseErrorListener', error);
          });

          return () => {
            purchaseUpdateSubscription.remove();
            purchaseErrorSubscription.remove();
          };
        });
    });
    return () => {
      RNIap.endConnection();
    };
  }, []);

  async function fetchProducts() {
    try {
      const products = await getSubscriptions({skus: productId});
      setProducts(products);
      console.log(products, 'products');
    } catch (error) {
      console.log('Error fetching products: ', error);
    }
  }

  const purchaseProduct = async id => {
    try {
      const purchase = await RNIap.requestSubscription({sku: id});
      console.log('Purchase successful: ', purchase);
    } catch (error) {
      console.log('Error purchasing: ', error);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#121212'}}>
      <View style={styles.containerstyle}>
        <Image
          style={styles.logoStyle}
          source={require('../../assets/images/followingplus_logo.png')}></Image>
        <ImageBackground
          resizeMode="stretch"
          style={styles.gradientContainer}
          source={require('../../assets/images/container.png')}>
          <Text style={styles.titletext}>
            One Subscription. {'\n'}Unlimited Perks.
          </Text>
          <View style={styles.grayContainer}>
            <Image
              style={styles.iconStyle}
              source={require('../../assets/icons/logo1.png')}></Image>
            <Text style={styles.text1}>Unlock Paid Campaigns</Text>
          </View>
          <View style={styles.grayContainer}>
            <Image
              style={styles.iconStyle}
              source={require('../../assets/icons/logo2.png')}></Image>
            <Text style={styles.text1}>Join Unlimited Campaigns</Text>
          </View>
          <View style={styles.grayContainer}>
            <Image
              style={styles.iconStyle}
              source={require('../../assets/icons/logo3.png')}></Image>
            <Text style={styles.text1}>Monthly Free PR Packages</Text>
          </View>
          <View style={styles.grayContainer}>
            <Image
              style={styles.iconStyle}
              source={require('../../assets/icons/logo4.png')}></Image>
            <Text style={styles.text1}>Get Priority Support</Text>
          </View>
        </ImageBackground>

        <Button
          title="One Month for AED 89"
          onPress={() => {
            purchaseProduct('com.following.1_month_subscription');
          }}
          wrapperStyle={{backgroundColor: '#FAFAFA', marginVertical: 0}}
        />

        <TouchableOpacity>
          <ImageBackground
            style={styles.gradientButton}
            imageStyle={{borderRadius: 10}}
            source={require('../../assets/icons/gradient_button.png')}>
            <Text style={styles.buttonText}>6 Months for AED 259</Text>
          </ImageBackground>
        </TouchableOpacity>

        <Text style={[styles.text1, {textAlign: 'center'}]}>
          Save 50% by subscribing for 6 months
        </Text>

        <Button
          title="Continue as Free User"
          onPress={() => {
            navigation.navigate('BottomTabNavigation');
          }}
          wrapperStyle={styles.footer}
        />
      </View>
    </ScrollView>
  );
}
