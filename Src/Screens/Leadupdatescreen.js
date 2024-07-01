import { Pressable, ScrollView, StyleSheet, Text, View, Modal,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../Comman/Styles';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import Button from '../Component/Button';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { getleaddata, updateleadsform,sourceapi, getstateapi, getcityapi, typeapi, categoryapi, subcategoryapi, classificationapi, campignsapi, projectapi } from '../Service/Apis';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import validator from 'validator';
import { useRoute } from '@react-navigation/native';

const Leadupdatescreen = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;
    console.log(id);

    const [mobilenumner, setmobilenumber] = useState('');
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [dob, setdob] = useState();
    const [doa, setdoa] = useState();
    const [source, setsource] = useState([]);
    const [selectedSource, setSelectedSource] = useState('');
    const [type, settype] = useState([]);
    const [selectedtype, setselectedtype] = useState('')
    const [category, setcategory] = useState([]);
    const [selectedcategory, setselectedcategory] = useState('')
    const [subcategory, setsubcategory] = useState([]);
    const [selectedsubcategory, setselectedsubcategory] = useState('')
    const [project, setproject] = useState([]);
    const [selectedproject, setselectedproject] = useState('')
    const [campigns, setcampigns] = useState([]);
    const [selectedcampigns, setselectedcampigns] = useState('')
    const [city, setcity] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [classification, setclassification] = useState([]);
    const [selectedclassification, setselectedclassification] = useState('')
    const [comments, setcomments] = useState('');
    const [address, setaddress] = useState('');
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [selectedDatedob, setSelectedDatedob] = useState();
    const [selectedCity, setSelectedCity] = useState('')
    const [error, setError] = useState('');

    const addleads = () => {
        setShowCalendarModal(true);
    };

    const addleadsdob = () => {
        setShowCalendar(true);
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

    const handleDateSelectdob = async (date) => {
        setSelectedDatedob(date);
        setShowCalendar(false);

        if (date) {
            setSelectedDatedob(date);
            const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
            //   await addholidayapi(date);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getsourceapi();
            getstate();
            gettypeapi();
            getclassificationapi();
            getcampignsapi();
            getprojectapi();
            getleaddataapi();
        }, []),
    );


    const getstate = async () => {
        try {
            const response = await getstateapi();
            if (response.msg === "Data Load Successfully") {
                const stateData = response.data.map(item => item.state);
                setStates(stateData);
            } else {

            }
        } catch (error) {

        } finally {
        }
    };

    const getcity = async (itemValue) => {
        try {
            const response = await getcityapi(itemValue);
            if (response.msg === "Data Load Successfully") {
                setcity(response.data)
            } else {

            }
        } catch (error) {
            console.log(error);

        } finally {
        }
    };

    const handleStateChange = (itemValue, itemIndex) => {
        setSelectedState(itemValue);
        getcity(itemValue);
    };

    const getsourceapi = async () => {
        try {
            const response = await sourceapi();
            console.log('source', response)
            if (response.msg === "Data Load Successfully") {
                setsource(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const handletypeChange = (itemValue) => {
        setselectedtype(itemValue);
        const selectedTypeObj = type.find((src) => src.name === itemValue);

        if (selectedTypeObj && selectedTypeObj.id) {
            gecategoryapi(selectedTypeObj.id);
        } else {
            setcategory([]);
        }
    };

    const getcampignsapi = async () => {
        try {
            const response = await campignsapi();
            if (response.msg === "Data Load Successfully") {
                setcampigns(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const getprojectapi = async () => {
        try {
            const response = await projectapi();
            if (response.msg === "Data Load Successfully") {
                setproject(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const getclassificationapi = async () => {
        try {
            const response = await classificationapi();
            if (response.msg === "Data Load Successfully") {
                setclassification(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const gettypeapi = async () => {
        try {
            const response = await typeapi();
            if (response.msg === "Data Load Successfully") {
                settype(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const getsubcategoryapi = async (categoryId) => {
        try {
            const response = await subcategoryapi(categoryId);
            if (response.msg === "Data Load Successfully") {
                setsubcategory(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const gecategoryapi = async (typeId) => {
        try {
            const response = await categoryapi(typeId);
            if (response.msg === "Data Load Successfully") {
                setcategory(response.data);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const getleaddataapi = async () => {
        try {
            const response = await getleaddata(id);
            console.log('leaddddddddddddddd',response.data)
            if (response.msg === "Data Load Successfully") {
                const leadData = response.data.lead_data[0]; 
                setfullname(leadData.name),
                setmobilenumber(leadData.mobile),
                setemail(leadData.email),
                setcomments(leadData.comments),
                setaddress(leadData.address);
            } else {
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                text1: 'Error',
                type: 'error',
            });
        } finally {
        }
    };

    const handleaddleads = async () => {
        console.log(fullname,
            email,
            mobilenumner,
            selectedSource,
            selectedtype,
            selectedcategory,
            selectedsubcategory,
            selectedclassification,
            selectedcampigns,
            selectedproject,
            selectedState,
            selectedCity,
            address,
            comments)
        try {
          const response = await updateleadsform(
            fullname,
            email,
            mobilenumner,
            selectedSource,
            selectedtype,
            selectedcategory,
            selectedsubcategory,
            selectedclassification,
            selectedcampigns,
            selectedproject, 
            selectedState,
            selectedCity,
            address,
            comments
          );

          console.log(response)

          if (response.result.msg === "Update Successfully") {
            Toast.show({
              text1: 'Update successfully',
              type: 'success',
            });
            navigation.navigate('allleads');
          } else {
            Toast.show({
              text1: 'Failed to add lead!',
              type: 'error',
            });
          }
        } catch (error) {
          console.log(error);
          Toast.show({
            text1: 'Error',
            type: 'error',
          });
        }
    };


    const handleSourceChange = (itemValue) => {
        setSelectedSource(itemValue);
    };

    const handlecategoryChange = (itemValue) => {
        setselectedcategory(itemValue);
        const selectedCategoryObj = category.find((src) => src.name === itemValue);
        if (selectedCategoryObj && selectedCategoryObj.id) {
            getsubcategoryapi(selectedCategoryObj.id);
        } else {
            setsubcategory([]);
        }
    };

    const handlesubcategoryChange = (itemValue) => {
        setselectedsubcategory(itemValue)
    }

    const handleclassificationChange = (itemValue) => {
        setselectedclassification(itemValue)
    }

    const handlecampignsChange = (itemValue) => {
        setselectedcampigns(itemValue)
    }

    const handleprojectChange = (itemValue) => {
        setselectedproject(itemValue)
    }

    const handleEmailChange = (text) => {
        setemail(text);
        if (validator.isEmail(text)) {
            setError('');
        } else {
            setError('Please enter a valid email address');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.content}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color="#dbdad3" style={{ marginLeft: 10 }} />
                    </Pressable>
                    <Text style={styles.text}>Lead Update</Text>
                </View>
            </View>

            <View style={styles.form}>
                <View>
                    <Pressable
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            //   bottom: 16,
                            top: 20,
                            //   right: 16,
                            //   backgroundColor: '#4e93e1',
                            //   borderRadius: 30,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <AntDesign name="phone" color="#625bc5" size={25} />
                    </Pressable>
                    <TextInput
                        label="Contact Number"
                        value={mobilenumner}
                        onChangeText={text => {
                            const formattedText = text.replace(/[^0-9]/g, '');
                            setmobilenumber(formattedText.slice(0, 10));
                        }}
                        style={[styles.textinput, { paddingLeft: 30 }]}
                        mode="outlined"
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>

                <View>
                    <Pressable
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            //   bottom: 16,
                            top: 20,
                            //   right: 16,
                            //   backgroundColor: '#4e93e1',
                            //   borderRadius: 30,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <AntDesign name="user" color="#625bc5" size={25} />
                    </Pressable>
                    <TextInput
                        label="Full Name"
                        value={fullname}
                        onChangeText={text => setfullname(text)}
                        style={[styles.textinput, { paddingLeft: 30 }]}
                        mode="outlined"
                    />
                </View>

                <View>
                    <Pressable
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            //   bottom: 16,
                            top: 20,
                            //   right: 16,
                            //   backgroundColor: '#4e93e1',
                            //   borderRadius: 30,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <AntDesign name="mail" color="#625bc5" size={25} />
                    </Pressable>
                    <>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={handleEmailChange}
                            style={[styles.textinput, { paddingLeft: 30 }]}
                            mode="outlined"
                            maxLength={100}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCompleteType="email"
                        />
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </>
                </View>

                <View style={styles.dob}>
                    <View style={{ width: '49%' }}>
                        <View >
                            <TextInput
                                label="DOB"
                                value={selectedDatedob ? moment(selectedDatedob).format('YYYY-MM-DD') : ''}
                                onChangeText={(text) => setdob(text)}
                                style={{ flex: 1, marginRight: 10 }}
                                mode="outlined"
                                maxLength={10}
                            />
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    //   bottom: 16,
                                    top: 10,
                                    right: 16,
                                    //   backgroundColor: '#4e93e1',
                                    //   borderRadius: 30,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={addleadsdob}>
                                <AntDesign name="calendar" color="#625bc5" size={25} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ width: '49%' }}>
                        <TextInput
                            label="DOA"
                            value={selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''}
                            onChangeText={(text) => setdoa(text)}
                            style={[styles.textinputdob, { paddingLeft: 20 }]}
                            mode="outlined"
                            maxLength={10}
                            editable={false}
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
                </View>


                <View style={{ marginTop: 10 }}>
                    <View style={styles.dropdowncontainer1}>
                        <Picker
                            selectedValue={selectedSource}
                            style={styles.picker}
                            onValueChange={handleSourceChange}>
                            <Picker.Item label="Select Source" value="" />
                            {source.map((src, index) => (
                                <Picker.Item key={index} label={src.name} value={src.id} />
                            ))}
                        </Picker>
                    
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.dropdowncontainer1}>
                        <Picker
                            selectedValue={selectedtype}
                            style={styles.picker}
                            onValueChange={handletypeChange}>
                            <Picker.Item label="Select Type" value="" />
                            {type.map((src, index) => (
                                <Picker.Item key={index} label={src.name} value={src.id} />
                            ))}
                        </Picker>
                    </View>
                </View>


                <View style={{ marginTop: 10 }}>
                    <View style={styles.dropdowncontainer1}>
                            <Picker
                                selectedValue={selectedcategory}
                                style={styles.picker}
                                onValueChange={handlecategoryChange}
                            >
                                <Picker.Item label="Select Category" value="" />
                                {category.map((src, index) => (
                                    <Picker.Item key={index} label={src.name} value={src.id} />
                                ))}
                            </Picker>
                       
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.dropdowncontainer1}>
                        <Picker
                            selectedValue={selectedsubcategory}
                            style={styles.picker}
                            onValueChange={handlesubcategoryChange}>
                            <Picker.Item label="Select Sub Category" value="" />
                            {subcategory.map((src, index) => (
                                <Picker.Item key={index} label={src.name} value={src.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.dropdowncontainer1}>
                        <Picker
                            selectedValue={selectedclassification}
                            style={styles.picker}
                            onValueChange={handleclassificationChange}>
                            <Picker.Item label="Select Classification" value="" />
                            {classification.map((src, index) => (
                                <Picker.Item key={index} label={src.name} value={src.id} />
                            ))}
                        </Picker>
                    </View>
                </View>


                <View style={styles.dob}>
                    <View style={{ width: '49%' }}>
                        <View style={styles.dropdowncontainer1}>
                            <Picker
                                selectedValue={selectedcampigns}
                                style={styles.picker}
                                onValueChange={handlecampignsChange}>
                                <Picker.Item label="Select Campigns" value="" />
                                {campigns.map((src, index) => (
                                    <Picker.Item key={index} label={src.campaign_name} value={src.campaign_id} />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={{ width: '49%' }}>
                        <View style={styles.dropdowncontainer1}>
                            <Picker
                                selectedValue={selectedproject}
                                style={styles.picker}
                                onValueChange={handleprojectChange}>
                                <Picker.Item label="Select Project" value="" />
                                {project.map((src, index) => (
                                    <Picker.Item key={index} label={src.name} value={src.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </View>


                <View style={styles.dob}>
                    <View style={styles.dropdowncontainer}>
                        <Picker
                            selectedValue={selectedState}
                            dropdownIconRippleColor={1}
                            style={styles.picker}
                            onValueChange={handleStateChange}>
                            <Picker.Item label="Select State" value="" />
                            {states.map((state, index) => (
                                <Picker.Item key={index} label={state} value={state} />
                            ))}
                        </Picker>

                    </View>

                    <View style={styles.dropdowncontainer}>
                        <Picker
                            selectedValue={selectedCity}
                            style={styles.picker}
                            onValueChange={(city) => setSelectedCity(city)}>
                            <Picker.Item label="Select City" value="" />
                            {city.map((district, index) => (
                                <Picker.Item key={index} label={district.District} value={district.District} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View>
                    <TextInput
                        label="Enter Address"
                        value={address}
                        onChangeText={text => setaddress(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />

                </View>

                <View>
                    <TextInput
                        label="Enter Comments"
                        value={comments}
                        onChangeText={text => setcomments(text)}
                        style={[styles.textinput]}
                        mode="outlined"
                    />
                </View>

            </View>

            <Pressable style={{ top: 20 }} onPress={handleaddleads}>
                <Button text="Submit" />
            </Pressable>

            <View style={{ height: 30 }}></View>

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

            <Modal
                animationType="slide"
                transparent={true}
                visible={showCalendar}
                onRequestClose={() => setShowCalendar(false)}>
                <View style={{ flex: 1, justifyContent: 'center' }}>


                    <Calendar
                        onDayPress={(day) => handleDateSelectdob(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' }
                        }}
                    />
                </View>
            </Modal>
        </ScrollView>
    )
}

export default Leadupdatescreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: Colors.Button,
        padding: 8,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    textinput: {
        marginTop: 10,
    },
    Heading: {
        fontSize: 15,
        color: '#625bc5'
    },
    form: {
        margin: 10
    },
    dob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    picker: {
        // backgroundColor:'red',
        // width: '96%',
        // height: 50,
        borderBlockColor: 'black',
        borderWidth: 1,
        borderColor: 'black',
    },
    dropdowncontainer: {
        width: '49%',
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#625bc5'
    },
    dropdowncontainer1: {
        borderWidth: 1,
        height: 48,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#625bc5'
    }
})