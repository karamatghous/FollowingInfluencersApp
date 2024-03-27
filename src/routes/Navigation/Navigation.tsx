import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroductionScreen from '../../screens/IntroductionScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import OTPScreen from '../../screens/OTPScreen';
import SocialAccountsScreen from '../../screens/SocialAccountsScreen';
import VerificationStartScreen from '../../screens/VerificationStartScreen';
import VerificationPassScreen from '../../screens/VerificationPassScreen';
import VerificationFailScreen from '../../screens/VerificationFailScreen';
import SignInEmailScreen from '../../screens/SignInEmailScreen';
import SignInPhoneScreen from '../../screens/SignInPhoneScreen';
import SubscriptionPromptScreen from '../../screens/SubscriptionPromptScreen';
import HomeScreen from '../../screens/HomeScreen';
import OfficeScreen from '../../screens/OfficeScreen';
import ActiveScreen from '../../screens/ActiveScreen';
import MenuScreen from '../../screens/MenuScreen';
import BottomTabNavigation from '../BottomTabNavigation/BottomTabNavigation';
import LaunchScreen from '../../screens/LaunchScreen';
import CampaignDetailsScreen from '../../screens/CampaignDetailsScreen';
import ForgotPassword from '../../screens/ForgotPassword';
import NewPasswordOTP from '../../screens/NewPasswordOTP';
import NewPassword from '../../screens/NewPassword';
import RequirementsDetails from '../../screens/RequirementsDetails';
import FiltersScreen from '../../screens/FiltersScreen';
import ReservedSpotsScreen from '../../screens/ReservedSpotsScreen';
import InstoreReachScreen from '../../screens/InstoreReachScreen';
import ActiveCampaignScreen from '../../screens/ActiveCampaignScreen';
import MarkCompletedScreen from '../../screens/MarkCompletedScreen';
import DeliveryApplyScreen from '../../screens/DeliveryApplyScreen';
import DeliverySuccessScreen from '../../screens/DeliverySuccessScreen';
import SavedAddressesScreen from '../../screens/SavedAddressesScreen';
import AddAddresseScreen from '../../screens/AddAddressScreen';
import AddAddressScreen from '../../screens/AddAddressScreen';
import ChatScreen from '../../screens/ChatScreen';
import WalletScreen from '../../screens/WalletScreen';
import WithdrawalHistoryScreen from '../../screens/WithdrawalHistoryScreen';
import WithdrawFundsScreen from '../../screens/WithdrawFundsScreen';
import WithdrawFundsSuccess from '../../screens/WithdrawFundsSuccess';

const Stack = createNativeStackNavigator();
export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LaunchScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} />
        <Stack.Screen
          name="IntroductionScreen"
          component={IntroductionScreen}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen
          name="SocialAccountsScreen"
          component={SocialAccountsScreen}
        />
        <Stack.Screen
          name="VerificationStartScreen"
          component={VerificationStartScreen}
        />
        <Stack.Screen
          name="VerificationPassScreen"
          component={VerificationPassScreen}
        />
        <Stack.Screen
          name="VerificationFailScreen"
          component={VerificationFailScreen}
        />
        <Stack.Screen name="SignInEmailScreen" component={SignInEmailScreen} />
        <Stack.Screen name="SignInPhoneScreen" component={SignInPhoneScreen} />
        <Stack.Screen
          name="SubscriptionPromptScreen"
          component={SubscriptionPromptScreen}
        />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen
          name="CampaignDetailsScreen"
          component={CampaignDetailsScreen}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPasswordOTP" component={NewPasswordOTP} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="FiltersScreen" component={FiltersScreen} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen
          name="WithdrawalHistoryScreen"
          component={WithdrawalHistoryScreen}
        />
        <Stack.Screen
          name="WithdrawFundsScreen"
          component={WithdrawFundsScreen}
        />
        <Stack.Screen
          name="WithdrawFundsSuccess"
          component={WithdrawFundsSuccess}
        />

        <Stack.Screen
          name="DeliveryApplyScreen"
          component={DeliveryApplyScreen}
        />
        <Stack.Screen
          name="DeliverySuccessScreen"
          component={DeliverySuccessScreen}
        />

        <Stack.Screen
          name="ReservedSpotsScreen"
          component={ReservedSpotsScreen}
        />
        <Stack.Screen
          name="InstoreReachScreen"
          component={InstoreReachScreen}
        />

        <Stack.Screen
          name="RequirementsDetails"
          component={RequirementsDetails}
        />
        <Stack.Screen
          name="ActiveCampaignScreen"
          component={ActiveCampaignScreen}
        />
        <Stack.Screen
          name="MarkCompletedScreen"
          component={MarkCompletedScreen}
        />
        <Stack.Screen
          name="SavedAddressesScreen"
          component={SavedAddressesScreen}
        />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
