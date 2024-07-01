import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homescreen from '../Screens/Homescreen';
import Leadsscreen from '../Screens/Leadsscreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../Comman/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Settingsscreen from '../Screens/Settingsscreen';
import Taskscreen from '../Screens/Taskscreen';

const Tab = createBottomTabNavigator();

const Bottomnavigation = () => {
  return (
    <Tab.Navigator
         screenOptions={{
        tabBarStyle: { backgroundColor: 'white' },
        tabBarActiveTintColor: '#625bc5',
        tabBarInactiveTintColor: '#8a8a87',
      }}>
      <Tab.Screen name="Home" component={Homescreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      /> 
      <Tab.Screen name="Leads" component={Leadsscreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }} 
      />
        <Tab.Screen name="task" component={Taskscreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }} 
      />
        <Tab.Screen name="Setting" component={Settingsscreen}  options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  )
}

export default Bottomnavigation

const styles = StyleSheet.create({})