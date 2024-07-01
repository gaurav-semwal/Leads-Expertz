import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, FlatList, Modal, Linking } from 'react-native';
import { Colors } from '../Comman/Styles';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { statusapi, leaddataapi, getleaddataapi } from '../Service/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Leadsscreen = ({ navigation }) => {
  const route = useRoute();
  const { statusfilter } = route.params || {};

  const [statushere, setstatus] = useState([]);
  const [search, setsearch] = useState('');
  const [selectedstatus, setselectedstatus] = useState('');
  const [leadDetails, setLeadDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   getstatus();
  //   handleleaddata();
  //   initializeAudioRecorder();
  // }, [statusfilter]);

  useFocusEffect(
    React.useCallback(() => {
      getstatus();
      handleleaddata();
      initializeAudioRecorder();
    }, [statusfilter])
  );

  const getstatus = async () => {
    try {
      const response = await statusapi();
      console.log("S E M W A L", response);
      if (response.msg === "Unauthorized Required") {
        navigation.navigate('Login');
      } else if (response.msg === "Data Load Successfully") {
        setstatus(response.data);
      } else {
        console.log("Failed to load status data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleleaddata = async () => {
    setLoading(true); // Start loading indicator

    try {
      let response;

      // Determine which API call to make based on filters or defaults
      if (statusfilter) {
        response = await getleaddataapi(statusfilter);
      } else if (selectedstatus) {
        response = await getleaddataapi(selectedstatus);
      } else {
        response = await leaddataapi();
      }

      // Handle response based on success or error messages
      if (response.error) {
        // Handle specific errors if needed
        if (response.msg === "Lead not found.") {
          Toast.show({
            text1: 'Lead not found.',
            type: 'error',
          });
        } else if (response.msg === "Unauthorized Required") {
          navigation.navigate('Login');
        } else {
          console.log("Unknown error:", response.msg);
        }
      } else {
        if (response.msg === "") {
          let filteredData = response.data;

          if (search.trim() !== '') {
            const searchText = search.toLowerCase();
            filteredData = filteredData.filter(item =>
              item.name.toLowerCase().includes(searchText) ||
              item.id.toString().includes(searchText)
            );
          }

          setLeadDetails(filteredData);
        } else {
          console.log("Failed to load lead data:", response.msg);
        }
      }
    } catch (error) {
      console.log("Error fetching lead data:", error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    handleleaddata();
    setRefreshing(false);
  };

  const handlestatusChange = (itemValue) => {
    setselectedstatus(itemValue);
  };

  const leadedit = (item) => {
    navigation.navigate('leadupdate', { id: item.id });
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const editlead = (item) => {
    navigation.navigate('editlead', { itemId: item.id });
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
  };

  const handlePhonePress = (phoneNumber) => {
    let phoneUrl = `tel:${phoneNumber}`;

    Linking.openURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          console.log(`Phone dialing not supported for number: ${phoneNumber}`);
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        if (Platform.OS === 'android' && err.message.includes('not supported')) {
          console.log('Android phone dialing may not be supported');
        } else if (Platform.OS === 'ios' && err.message.includes('not allowed')) {
          console.log('iOS phone dialing permission not allowed');
        }
      });
  };

  const initializeAudioRecorder = () => {
    const player = new AudioRecorderPlayer();
    setAudioRecorderPlayer(player);
  };

  const handleRecordNotes = async () => {
    navigation.navigate('record');
    // Implement recording functionality if needed
  };

  const Item = ({ item }) => (
    <Pressable >
      <View style={styles.leadContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable style={styles.editButton} onPress={() => leadedit(item)}>
            <Text style={styles.editButtonText}>Lead Edit</Text>
          </Pressable>

          <Pressable style={styles.editButton1} onPress={() => openModal(item)}>
            <Text style={styles.editButtonText1}>{item.status}</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View style={styles.profileContainer}>
              <Image style={styles.profileImage} source={require('../Assets/Images/profile.jpg')} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.leadTitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.leadInfo}>{item.mobile}</Text>
                <TouchableOpacity onPress={() => handlePhonePress(item.mobile)}>
                  <View style={{ marginLeft: 10 }}>
                    <AntDesign name="phone" size={20} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Pressable onPress={() => editlead(item)}>
            <AntDesign name="edit" size={25} color="black" />
          </Pressable>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.leadInfo1}>Lead ID: {item.id}</Text>
          <Text style={styles.leadInfo1}>Source: {item.source}</Text>
          <Text style={styles.leadInfo1}>Comments: {item.comments}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.leadInfo1}>Date: {item.created_date}</Text>
            <Pressable style={styles.recordButton} onPress={handleRecordNotes}>
              <Text style={styles.recordButtonText}>Record Notes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );

  const LeadModal = ({ item }) => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeModal}
      transparent={true}
    >
      <View style={styles.centeredView}>
        <Pressable style={styles.modalBackground} onPress={closeModal}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <View></View>
              <Text style={styles.modalText}>Lead Details</Text>
              <Pressable onPress={closeModal}>
                <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
              </Pressable>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding: 6, height: '75%' }}>
              <Text style={styles.modalText}>Name:  {selectedItem.name}</Text>
              <Text style={styles.modalText}>Email:  {selectedItem.email}</Text>
              <Text style={styles.modalText}>Mobile:  {selectedItem.mobile}</Text>
              <Text style={styles.modalText}>Address:  {selectedItem.address}</Text>
              <Text style={styles.modalText}>DOB:  {selectedItem.dob}</Text>
              <Text style={styles.modalText}>DOA:  {selectedItem.doa}</Text>
              <Text style={styles.modalText}>Source:  {selectedItem.source}</Text>
              <Text style={styles.modalText}>Type:  {selectedItem.type}</Text>
              <Text style={styles.modalText}>Category:  {selectedItem.category}</Text>
              <Text style={styles.modalText}>SubCategory:  {selectedItem.sub_category}</Text>
              <Text style={styles.modalText}>State:  {selectedItem.state}</Text>
              <Text style={styles.modalText}>City:  {selectedItem.city}</Text>
              <Text style={styles.modalText}>Classification:  {selectedItem.city}</Text>
              <Text style={styles.modalText}>Project:  {selectedItem.project}</Text>
              <Text style={styles.modalText}>Campaign:  {selectedItem.campaign}</Text>
              <Text style={styles.modalText}>Status:  {selectedItem.status}</Text>
            </View>

            <View style={styles.modalheading}>
              <Text style={styles.modalText}>Lead Comments</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </Modal>
  );

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.content}>
          <Text style={styles.text}>All Leads</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={{ width: '49%' }}>
          <View style={styles.dropdowncontainer1}>
            <Picker
              selectedValue={selectedstatus}
              style={styles.picker}
              onValueChange={handlestatusChange}>
              <Picker.Item label="Select Status" value="" />
              {statushere.map((src, index) => (
                <Picker.Item key={index} label={src} value={src} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ width: '49%' }}>
          <View style={{ position: 'absolute', top: 20, left: 12, zIndex: 1 }}>
            <Ionicons name="search" size={25} color="#625bc5" />
          </View>
          <TextInput
            label="Search Here"
            value={search}
            onChangeText={(text) => {
              setsearch(text);
              handleleaddata(); // Call handleleaddata on each text change
            }}
            style={[styles.textinput, { paddingLeft: 20 }]}
            mode="outlined"
          />

        </View>
      </View>

      <FlatList
        data={leadDetails}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {selectedItem && <LeadModal item={selectedItem} />}
    </View>
  );
};

export default Leadsscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileContainer: {
    alignSelf: 'flex-start',
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#625bc5',
  },
  header: {
    backgroundColor: Colors.Button,
    padding: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 7
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff'
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  dropdowncontainer1: {
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#625bc5',
    marginTop: 6,
    height: 50
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  leadContainer: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#ede8e8',
    borderWidth: 1,
    backgroundColor: '#ede8e8',
    marginBottom: 10
  },
  editButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#625bc5',
    padding: 5,
    borderRadius: 4,
  },
  editButton1: {
    alignSelf: 'flex-start',
    backgroundColor: '#929496',
    padding: 5,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#fff',
  },
  editButtonText1: {
    color: '#fff',
  },
  leadTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  leadInfo: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  leadInfo1: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  recordButton: {
    backgroundColor: '#929496',
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  recordButtonText: {
    color: '#fff',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  modalText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
  },
  closeButton: {
    backgroundColor: '#625bc5',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 20,
    elevation: 5,
    width: '90%',
  },
  modalheading: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
