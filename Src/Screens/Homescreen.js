import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, Pressable, PanResponder, Dimensions } from 'react-native';
import Header from '../Component/Header';
import SearchBar from '../Component/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AllLeadsscreen from './AllLeadsscreen';

const Homescreen = ({ navigation }) => {
  const [buttonPosition, setButtonPosition] = useState({ x: "80%", y: "90%" });
  const [hasMoved, setHasMoved] = useState(false);
  const [leads, setLeads] = useState('Leads');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      setButtonPosition({
        x: gestureState.moveX - 25,
        y: gestureState.moveY - 75,
      });

      if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
        setHasMoved(true);
      }
    },
    onPanResponderRelease: () => {
      setHasMoved(false);
    },
  });

  const btnClick = (type) => {
    setLeads(type);
    if (type === 'Tasks') {
      navigation.navigate('task');
    }
  };

  const onPressPlusButton = () => {
    if (!hasMoved) {
      navigation.navigate('addleads');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <SearchBar />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => btnClick('Leads')} style={{ borderBottomColor: leads === 'Leads' ? 'blue' : 'transparent', borderBottomWidth: 2, height: 50, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width * 0.5 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>All Leads</Text>
        </Pressable>

        <Pressable onPress={() => btnClick('Tasks')} style={{ borderBottomColor: leads === 'Leads' ? 'transparent' : 'blue', borderBottomWidth: 2, height: 50, alignItems: 'center', justifyContent: 'center', width: Dimensions.get('window').width * 0.5 }}>
          <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>All Task</Text>
        </Pressable>
      </View>

      <View>
        <AllLeadsscreen />
      </View>


      <View style={styles.plusButtonContainer
        //  { left: buttonPosition.x, top: buttonPosition.y }]}{...panResponder.panHandlers}
      }
         >
        <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
          <AntDesign name="plus" size={28} color="#dbdad3" />
        </Pressable>
      </View>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  plusButtonContainer: {
    position: 'absolute',
    backgroundColor: '#625bc5',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    alignSelf:'flex-end',
    bottom:20,
    right:20,
  },
  plusButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
