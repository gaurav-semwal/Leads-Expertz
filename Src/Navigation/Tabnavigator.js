import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllLeadsscreen from '../Screens/AllLeadsscreen';
import AllTaskscreen from '../Screens/AllTaskscreen';

const Tab = createMaterialTopTabNavigator();

const Tabnavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="All Leads" component={AllLeadsscreen} />
      <Tab.Screen name="All Task" component={AllTaskscreen} />
    </Tab.Navigator>
  )
}

export default Tabnavigator