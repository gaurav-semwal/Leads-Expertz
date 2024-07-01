import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Homescreentable from '../Component/Homescreentable';
import Channelpartners from '../Component/Channelpartners';
import { dashboardapi } from '../Service/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Homescreenfilter from '../Component/Homescreenfilter';

const AllLeadsscreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getdashboardapi();
    getdashboard2api();
  }, []);

  const [data, setData] = useState([]);
  const [datanew, setDatanew] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getdashboardapi = async () => {
    const password = await AsyncStorage.getItem('userPassword');
    const mobile = await AsyncStorage.getItem('mobile');
    try {
      const response = await dashboardapi(password, mobile);
      console.log('resp', response);
      if (response.msg === "Unauthorized Required") {
        console.log('Data is null, navigate to another screen');
        navigation.navigate('Login');
      } else if (response.msg === "Data Load Successfully") {
        const data = [
          { id: '1', title: 'Total Leads', value: response.data.all_lead.total_leads || 0 },
          { id: '2', title: 'Today Leads', value: response.data.all_leads.today_lead.total_leads || 0 },
          { id: '3', title: 'This Month Leads', value: response.data.all_leads.this_month_lead.total_leads || 0 },
          { id: '4', title: 'Future Leads', value: response.data.all_leads.future_lead.total_leads || 0 },
        ];
        setData(data);
      } else {
      }
    } catch (error) {
      console.log(error);
      // Handle error scenario
    }
  };

  const getdashboard2api = async () => {
    const password = await AsyncStorage.getItem('userPassword');
    const mobile = await AsyncStorage.getItem('mobile');
    try {
      const response = await dashboardapi(password, mobile);
      console.log('newwwwwwwwwwwwwww',response.data);
      if (response.msg === "Unauthorized Required") {
        navigation.navigate('Login'); 
      } else if (response.msg === "Data Load Successfully") {
        const { all_lead } = response.data;
        const datanew = Object.keys(all_lead).map(key => ({
          title: key.replace(/_/g, ' '),
          value: all_lead[key],
        }));
        console.log('hiiiiiiiii',datanew)
        setDatanew(datanew);
      } else {
      }
    } catch (error) {
      console.log(error);
      // Handle error scenario
    }
  };

  const Item = ({ item }) => (
    <Pressable style={styles.card}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Text style={styles.description}>{item.value !== undefined ? item.value : 0}</Text>

          <View style={{ backgroundColor: '#625bc5', borderRadius: 40, padding: 5 }}>
            <Ionicons name="bag-outline" size={13} color="#fff" />
          </View>
        </View>
        <Text style={styles.texttitle}>{item.title}</Text>
      </View>
    </Pressable>
  );

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const leadnaviagte = (item) => {
    console.log(item)
    navigation.navigate('Leads', { statusfilter: item.title })
  };

  const Items = ({ item }) => (
    <Pressable style={styles.card} onPress={() => leadnaviagte(item)}>
      <View style={styles.content}>
        <View style={styles.icon}>
          <Text style={styles.description}>{item.value !== undefined ? item.value : 0}</Text>
          <View style={{ backgroundColor: '#625bc5', borderRadius: 40, padding: 5 }}>
            <Ionicons name="people" size={13} color="#fff" />
          </View>
        </View>
        <Text style={styles.texttitle}>{capitalizeFirstLetter(item.title)}</Text>
      </View>
    </Pressable>
  );

  const refreshData = async () => {
    setRefreshing(true); // Set refreshing state to true
  
    try {
      await getdashboardapi();
      await getdashboard2api();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false); // Set refreshing state to false after data fetching is done
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
      }
    >
      <View>
        <FlatList
          data={data}
          nestedScrollEnabled
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <Homescreentable />
      </View>

      <View>
        <FlatList
          nestedScrollEnabled
          data={datanew}
          renderItem={({ item }) => <Items item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={styles.text}>Channel Partners</Text>
      </View>
      <View>
        <Channelpartners />
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default AllLeadsscreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
    margin: 10
  },
  card: {
    backgroundColor: '#e6ebf5',
    height: 90,
    margin: 10,
    borderRadius: 10,
    minWidth: 150,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: '#000',
    fontWeight: '500',
    fontSize: 15
  },
  texttitle: {
    color: '#555',
    fontWeight: '700',
    fontSize: 16
  }
});
