import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, TextInput, Modal, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Comman/Styles';
import { statusapi } from '../Service/Apis';
import Button from '../Component/Button';
import { useRoute } from '@react-navigation/native';
import { updatestatus } from '../Service/Apis';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Editleadscreen = ({ navigation }) => {
    const route = useRoute();
    const { itemId } = route.params;

    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [statusData, setStatusData] = useState([]);
    const [remarks, setremarks] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showDateTimeInputs, setShowDateTimeInputs] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (time) => {
        setSelectedTime(moment(time).format('HH:mm')); // Format the selected time as needed
        hideTimePicker();
    };

    useEffect(() => {
        getstatus();
    }, []);

    const getstatus = async () => {
        try {
            const response = await statusapi();
            console.log(response);
            if (response.error === false) {
                setStatusData(response.data);
            } else {
                console.log("Failed to load status data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updatestatusapi = async () => {
        try {
            let response;
            if (showDateTimeInputs) {
                response = await updatestatus(itemId, remarks, selectedStatus, selectedDate, selectedTime);
            } else {
                response = await updatestatus(itemId, remarks, selectedStatus);
            }
            console.log(response);
            if (response.error === false) {
                Toast.show({
                    text1: 'Update Successfully',
                    type: 'success',
                });
                navigation.navigate('Leads');
            } else {
                console.log("Failed to update status");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleStatusSelect = (item) => {
        setSelectedStatus(item);
        if (item === "Call Scheduled" || item === "Visit Scheduled") {
            setShowDateTimeInputs(true);
        } else {
            setShowDateTimeInputs(false);
        }
    };

    const addleads = () => {
        setShowCalendarModal(true);
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date);
        setShowCalendarModal(false);

        if (date) {
            setSelectedDate(date);
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            //   await addholidayapi(date);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const renderStatusItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => handleStatusSelect(item)}>
                <View style={[styles.statusItem,
                { backgroundColor: selectedStatus === item ? '#8fc2ff' : '#c7c5ed' }]}>
                    <Text style={{ color: selectedStatus === item ? 'white' : 'black' }}>{item}</Text>
                    {selectedStatus === item && (
                        <AntDesign name="checkcircle" size={24} color="#625bc5" style={{ position: 'absolute', top: 5, right: 5 }} />
                    )}
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.content}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color="#dbdad3" style={{ marginLeft: 10 }} />
                    </Pressable>
                    <Text style={styles.text}>Update Lead</Text>
                    <View />
                </View>
            </View>

            <View>
                <FlatList
                    data={statusData}
                    renderItem={renderStatusItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />
            </View>

            {showDateTimeInputs && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    <View style={{ width: '48%' }}>
                        <TextInput
                            placeholder="Select Date"
                            value={selectedDate}
                            onChangeText={(date) => setSelectedDate(date)}
                            style={[styles.textinput, { marginTop: 10 }]}
                            mode="outlined"
                        />
                        <Pressable
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 16,
                                width: 40,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={addleads}>
                            <AntDesign name="calendar" color="#625bc5" size={25} />
                        </Pressable>
                    </View>
                    <View style={{ width: '100%', marginLeft: 10 }}>
                        <View style={{ width: '48%' }}>
                            <TextInput
                                placeholder="Select Time"
                                value={selectedTime}
                                onChangeText={(time) => setSelectedTime(time)}
                                style={[styles.textinput, { marginTop: 10 }]}
                                mode="outlined"
                                editable={false} // Prevent manual editing
                            />
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 16,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={showTimePicker}>
                                <AntDesign name="clockcircleo" color="#625bc5" size={25} />
                            </Pressable>
                        </View>

                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmTime}
                            onCancel={hideTimePicker}
                        />

                    </View>
                </View>
            )}


            <View style={{ padding: 10, top: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500', color: '#555' }}>Remarks</Text>

                <TextInput
                    placeholder="Enter Your Remarks"
                    value={remarks}
                    onChangeText={text => setremarks(text)}
                    style={[styles.textinput, { top: 15 }]}
                    mode="outlined"
                    maxLength={100}
                />

                <Pressable style={{ top: 30 }} onPress={updatestatusapi}>
                    <Button text="Submit" />
                </Pressable>

            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendarModal}
                onRequestClose={() => setShowCalendarModal(false)}>
                <View style={{ flex: 1, justifyContent: 'center' }}>


                    <Calendar
                        onDayPress={(day) => handleDateSelect(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' }
                        }}
                    />
                </View>
            </Modal>

        </View>
    );
};

export default Editleadscreen;

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
    statusItem: {
        marginHorizontal: 5,
        marginVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#c7c5ed',
        width: 110
    },
    textinput: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#625bc5'
    },
    textinput1: {
        width: '48%',
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#625bc5'
    },
    textinput1: {
        width: '48%',
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#625bc5'
    }
});
