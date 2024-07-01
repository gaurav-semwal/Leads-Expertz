import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loginscreen from '../Authentication/Loginscreen';
import Bottomnavigation from './Bottomnavigation';
import Addleads from '../Screens/Addleads';
import { Provider } from 'react-native-paper';
import Profilescreen from '../Screens/Profile/Profilescreen';
import Splashscreen from '../Authentication/Splashscreen';
import AllTaskscreen from '../Screens/AllTaskscreen';
import AllLeadsscreen from '../Screens/AllLeadsscreen';
import Leadupdatescreen from '../Screens/Leadupdatescreen';
import Editleadscreen from '../Screens/Editleadscreen';
import Recordscreen from '../Screens/Recordscreen';
import Homescreenfilter from '../Component/Homescreenfilter';

const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <Provider>
      <Stack.Navigator>
      {/* <Stack.Screen name="Splash" component={Splashscreen} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
      <Stack.Screen name="bottom" component={Bottomnavigation} options={{ headerShown: false }} />
      <Stack.Screen name="addleads" component={Addleads} options={{ headerShown: false }} />
      <Stack.Screen name="profile" component={Profilescreen} options={{ headerShown: false }} />
      <Stack.Screen name="alltask" component={AllTaskscreen} options={{ headerShown: false }} />
      <Stack.Screen name="allleads" component={AllLeadsscreen} options={{ headerShown: false }} />
      <Stack.Screen name="leadupdate" component={Leadupdatescreen} options={{ headerShown: false }} />
      <Stack.Screen name="editlead" component={Editleadscreen} options={{ headerShown: false }} />
      <Stack.Screen name="filter" component={Homescreenfilter} options={{ headerShown: false }} />
      <Stack.Screen name="record" component={Recordscreen} options={{ headerShown: false }} />
    </Stack.Navigator>
      </Provider>
  </NavigationContainer>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})