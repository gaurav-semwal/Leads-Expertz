import { StyleSheet, Text, View, Pressable, Image, Modal, PermissionsAndroid, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../Comman/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profileapi } from '../../Service/Apis';

const Profilescreen = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [fullname, setFullname] = useState('');
  const [mail, setMail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    getProfileData();
    requestCameraPermission();
    loadImageFromStorage();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getProfileData = async () => {
    try {
      const response = await profileapi();
      console.log(response.data);
      if (response.msg === 'Data Load Successfully') {
        setData(response.data);
        setFullname(response.data.name);
        setMail(response.data.email);
        setMobilenumber(response.data.mobile);
      } else {
        console.log('Failed to load profile data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const onPressPlusButton = () => {
    setModalVisible(true);
  };

  const handleCloseModalUpdate = () => {
    setModalVisible(false);
  };

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        saveImageToStorage(imageUri);
        handleCloseModalUpdate();
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error Code: ', response.errorCode);
        console.log('Camera Error Message: ', response.errorMessage);
      } else {
        let imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        saveImageToStorage(imageUri);
        handleCloseModalUpdate();
      }
    });
  };

  const saveImageToStorage = async (imageUri) => {
    try {
      await AsyncStorage.setItem('profileImage', imageUri);
      console.log('Image saved to storage');
    } catch (error) {
      console.log('Error saving image to storage', error);
    }
  };

  const loadImageFromStorage = async () => {
    try {
      const savedImageUri = await AsyncStorage.getItem('profileImage');
      if (savedImageUri) {
        setSelectedImage(savedImageUri);
        console.log('Image loaded from storage');
      }
    } catch (error) {
      console.log('Error loading image from storage', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color="#dbdad3" style={{ marginLeft: 10 }} />
          </Pressable>
          <Text style={styles.text}>My Profile</Text>
          <View>
            <ToggleSwitch
              isOn={isToggled}
              onColor="#fff"
              offColor="#a3a2a0"
              size="small"
              onToggle={handleToggle}
              circleColor="#625bc5"
              style={styles.toggleContainer}
            />
          </View>
        </View>
      </View>

      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={selectedImage ? { uri: selectedImage } : require('../../Assets/Images/profile.jpg')}
        />
        <Pressable style={styles.iconContainer} onPress={onPressPlusButton}>
          <AntDesign name="pluscircle" size={22} color="black" />
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <View>
          <Text>Full Name</Text>
          <View>
            <View style={{ position: 'absolute', top: 15, left: 6, zIndex: 1 }}>
              <MaterialIcons name="person" size={25} color="#625bc5" />
            </View>
            <TextInput
              placeholder="Full Name"
              value={fullname}
              onChangeText={text => setFullname(text)}
              style={[styles.textinput, { paddingLeft: 20 }]}
              mode="outlined"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Email</Text>
          <View>
            <View style={{ position: 'absolute', top: 15, left: 6, zIndex: 1 }}>
              <MaterialIcons name="email" size={25} color="#625bc5" />
            </View>
            <TextInput
              placeholder="Email"
              value={mail}
              onChangeText={text => setMail(text)}
              style={[styles.textinput, { paddingLeft: 20 }]}
              mode="outlined"
            />
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text>Mobile Number</Text>
          <View>
            <View style={{ position: 'absolute', top: 15, left: 6, zIndex: 1 }}>
              <MaterialIcons name="phone" size={25} color="#625bc5" />
            </View>
            <TextInput
              placeholder="Mobile Number"
              value={mobilenumber}
              onChangeText={text => setMobilenumber(text)}
              style={[styles.textinput, { paddingLeft: 20 }]}
              mode="outlined"
              maxLength={10}
            />
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModalUpdate}
      >
        <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View></View>
              <Text style={styles.modalText}>Choose Photo Type</Text>
              <Pressable onPress={handleCloseModalUpdate}>
                <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
              <Pressable style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }} onPress={openGallery}>
                <MaterialIcons name="photo-library" size={27} color="#625bc5" />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#666' }}>Select Photo</Text>
              </Pressable>
              <Pressable style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }} onPress={openCamera}>
                <MaterialIcons name="add-a-photo" size={27} color="#625bc5" />
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#666' }}>Open Camera</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: Colors.Button,
    padding: 8,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#625bc5',
  },
  profileContainer: {
    alignSelf: 'center',
    marginTop: 30,
  },
  bottom: {
    margin: 10,
  },
  textinput: {
    height: 40,
    width: '100%',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -1,
    right: -5,
    borderRadius: 15,
    padding: 5,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    height: '25%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});