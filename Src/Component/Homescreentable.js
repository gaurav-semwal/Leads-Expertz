import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Pressable } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dashboardapi, leaddataapi } from '../Service/Apis';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Comman/Styles';

const Homescreentable = () => {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState('All');
  const [callScheduleData, setCallScheduleData] = useState([]);
  const [visitScheduleData, setVisitScheduleData] = useState([]);
  const [missedFollowUpData, setMissedFollowUpData] = useState([]);

  const onPressButton = (type) => {
    setActiveButton(type);
  };

  const [tableHead] = useState(['Lead ID', 'Name', 'Campaign', 'Classification', 'Last Comment']);
  const [widthArr] = useState([150, 100, 100, 100, 200]);
  const [tableData, setTableData] = useState([]);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handleLoginPress();
  }, []);

  const handleLoginPress = async () => {
    const password = await AsyncStorage.getItem('userPassword');
    const mobile = await AsyncStorage.getItem('mobile');
    try {
      const response = await dashboardapi( password,mobile);
      console.log(response.data);
      if (!response.error) {
        const callSchedule = response.data.call_schedule || [];
        const visitSchedule = response.data.visit_schedule || [];
        const missedFollowUp = response.data.missed_followup || [];
        console.log("=========================================")
        console.log('hlooooooooooooo',response.data.visitSchedule)
        setCallScheduleData(callSchedule);
        setVisitScheduleData(visitSchedule);
        setMissedFollowUpData(missedFollowUp);
      } else {
        console.log('Error fetching data:', response.msg);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };


  const renderTableRows = () => {
    console.log(activeButton)
    let dataToDisplay = [];
  
    switch (activeButton) {
      case 'All':
        dataToDisplay = tableData;
        break;
      case 'Call Schedule':
        dataToDisplay = callScheduleData;
        break;
      case 'Visit Schedule':
        dataToDisplay = visitScheduleData;
        break;
      case 'Missed Follow Up':
        dataToDisplay = missedFollowUpData;
        break;
      default:
        dataToDisplay = tableData;
    }
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    return dataToDisplay.slice(startIndex, endIndex).map((rowData, index) => (
      <Row
        key={startIndex + index}
        data={rowData}
        widthArr={widthArr}
        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
        textStyle={styles.text}
      />
    ));
  };
  

  const renderPagination = () => {
    const totalPages = Math.ceil(tableData.length / itemsPerPage);

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
        >
          <AntDesign name="left" color="#625bc5" size={25} />
        </TouchableOpacity>
        <Text style={styles.pageText}>{currentPage} / {totalPages}</Text>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
        >
          <AntDesign name="right" color="#625bc5" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Call Schedule' && { backgroundColor: '#ddd' },
          ]}
          onPress={() => onPressButton('Call Schedule')}
        >
          <Text style={[styles.text, activeButton === 'Call Schedule' && { color: '#625bc5' }]}>Call Schedule</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Visit Schedule' && { backgroundColor: '#ddd' }
          ]}
          onPress={() => onPressButton('Visit Schedule')}
        >
          <Text style={[styles.text, activeButton === 'Visit Schedule' && { color: '#625bc5' }]}>Visit Schedule</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === 'Missed Follow Up' && { backgroundColor: '#ddd' }
          ]}
          onPress={() => onPressButton('Missed Follow Up')}
        >
          <Text style={[styles.text, activeButton === 'Missed Follow Up' && { color: '#625bc5' }]}>Missed Follow Up</Text>
        </Pressable>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={[styles.text, { color: '#FFFFFF' }]}
            />
            {renderTableRows()}
          </Table>
        </View>
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    height: 50,
    backgroundColor: '#625bc5'
  },
  text: {
    textAlign: 'center',
    fontWeight: '100'
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  pageButton: {
    marginHorizontal: 5
  },
  pageText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
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
});

export default Homescreentable;
