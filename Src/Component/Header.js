import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../Comman/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
  const navigation = useNavigation();

  const [isToggled, setIsToggled] = useState(false);
  

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const PlusIcon = () => {
    navigation.navigate('addleads');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.imageicon}>
          <Image
            style={styles.image}
            source={require('../Assets/Images/headerimage.png')}
          />
          <View style={styles.icons}>
            <Pressable onPress={PlusIcon}>
            <AntDesign  name="pluscircle" size={23} color="#dbdad3" />
            </Pressable>
            <View style={{left:10}}>
            <AntDesign name="bells" size={23} color="#dbdad3" />
            </View>
           
            <ToggleSwitch
              isOn={isToggled}
              onColor="#fff"
              offColor="#a3a2a0"
              size="small"
              onToggle={handleToggle}
              circleColor="#625bc5"
              style={[
                styles.toggleContainer,
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    backgroundColor: Colors.Button,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 20,
},
  image: {
    height: 40,
    width: 150,
    alignItems: 'center',
  },
  imageicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top:10
  },
  icons: {
    flexDirection: 'row',
    alignItems:'center',
  },
  toggleSwitch: {
    // paddingLeft: 10,
    // paddingRight: 10,
    borderWidth: 1,
  },
});
