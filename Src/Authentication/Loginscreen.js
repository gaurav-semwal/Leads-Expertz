import { Image, Pressable, StyleSheet, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Button from '../Component/Button';
import { Provider as Paperprovider, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Login } from '../Service/Apis';
import Toast from 'react-native-toast-message';

const Loginscreen = ({ navigation }) => {

  useEffect(() => {
    checkForToken();
  }, []);

  const checkForToken = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      navigation.navigate('bottom');
    }
  };

  const [loading, setLoading] = useState(false);

  const handleLoginPress = async () => {
    try {
      setLoading(true);
      const response = await Login(mobilenumner, password);
      if (response.msg === "User logged in successfully.") {
        await AsyncStorage.removeItem('authToken');

        await AsyncStorage.setItem('authToken', response.data.token);
        await AsyncStorage.setItem('userPassword', response.data.password);
        await AsyncStorage.setItem('mobile', response.data.mobile);

        Toast.show({
          text1: 'User login successful',
          type: 'success',
        });

        navigation.navigate('bottom');
      } else {
        Toast.show({
          text1: 'Failed to login!',
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        text1: 'Error',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };


  const [mobilenumner, setmobilenumber] = useState();
  const [password, setpassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Paperprovider style={styles.container}>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <View>
        <Image
          style={styles.logo}
          source={require('../Assets/Images/Logo.png')}
        />
        <View style={styles.textinputview}>
          <View>
            <View style={{ position: 'absolute', top: 30, left: 12, zIndex: 1 }}>
              <MaterialCommunityIcons name="cellphone" size={25} color="#625bc5" />
            </View>
            <TextInput
              label="Enter Your Mobile Number"
              value={mobilenumner}
              onChangeText={text => {
                const formattedText = text.replace(/[^0-9]/g, '');
                setmobilenumber(formattedText.slice(0, 10));
              }}
              style={[styles.textinput, { paddingLeft: 20 }]}
              mode="outlined"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View>
            <View style={{ position: 'absolute', top: 30, left: 12, zIndex: 1 }}>
              <MaterialCommunityIcons name="lock" size={25} color="#625bc5" />
            </View>
            <View>
            <TextInput
              label="Enter Your Password"
              value={password}
              mode="outlined"
              onChangeText={text => setpassword(text)} 
              style={[styles.textinput, { paddingLeft: 20 }]}
              // secureTextEntry={!showPassword}
            />
            </View>
           
           
          </View>
        </View>
        {/* <View style={styles.eye} onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={25} color="#625bc5" />
            </View> */}
        <Pressable style={{ top: 20 }} onPress={handleLoginPress}>
          <Button text="Login" />
        </Pressable>
      </View>
    </Paperprovider>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  eye: {
    // zIndex: 1,
    // backgroundColor: 'red', 
    alignItems: 'flex-end',
    // position: 'relative',
    bottom: '45%',
    marginRight: "6%"
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    height: '40%',
    width: '50%',
    alignSelf: 'center',
  },
  textinput: {
    // borderWidth:1,
    marginBottom: 10,
    margin: 10,
  },
});
