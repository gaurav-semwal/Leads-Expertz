import React, {useState} from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../Comman/Styles';

const Homescreenfilter = () => {
    const [activeButton, setActiveButton] = useState('All');
    
    const onPressButton = (type) => {
        setActiveButton(type);
    };

  return (
    <View style={styles.body}>
    <Pressable
        style={[
            styles.button,
            activeButton === 'All' && { backgroundColor: '#ddd' }
        ]}
        onPress={() => onPressButton('All')}
    >
        <Text style={[styles.text, activeButton === 'All' && { color: '#625bc5' }]}>Call Schedule</Text>
    </Pressable>
    <Pressable
        style={[
            styles.button,
            activeButton === 'Pending' && { backgroundColor: '#ddd' }
        ]}
        onPress={() => onPressButton('Pending')}
    >
        <Text style={[styles.text, activeButton === 'Pending' && { color: '#625bc5' }]}>Visit Schedule</Text>
    </Pressable>
    <Pressable
        style={[
            styles.button,
            activeButton === 'Complete' && { backgroundColor: '#ddd' }
        ]}
        onPress={() => onPressButton('Complete')}
    >
        <Text style={[styles.text, activeButton === 'Complete' && { color: '#625bc5' }]}>Missed Follow Up</Text>
    </Pressable>
</View>
  );
};

export default Homescreenfilter;
const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    button: {
        borderWidth: 1,
        borderColor: Colors.Button,
        width: '30%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        borderRadius: 10
    },
})