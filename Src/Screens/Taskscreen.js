import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, TextInput,ScrollView } from 'react-native';
import Header from '../Component/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Component/Button';
import { tasklistapi, addtaskapi, updatetaskapi } from '../Service/Apis';
import { Colors } from '../Comman/Styles';

const Taskscreen = () => {
    const [activeButton, setActiveButton] = useState('All');
    const [taskmodal, setTaskModal] = useState(false);
    const [updateModal, setUpdateModal] = useState({ visible: false, id: null, update: '' });
    const [taskdata, setTaskData] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await tasklistapi(); // Assuming tasklistapi retrieves all tasks
            console.log(response.data);
            if (response.msg === "Load Successfully") {
                setTaskData(response.data);
            } else {
                console.log("Failed to load tasks");
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const addTask = async () => {
        try {
            const response = await addtaskapi(newTask);
            console.log(response);
            if (response.msg === "save Successfully") {
                setTaskModal(false);
                fetchTasks(); // Fetch tasks again to update the list
            } else {
                console.log("Failed to add task");
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async () => {
        try {
            const response = await updatetaskapi(updateModal.id, updateModal.update);
            console.log(response);
            if (response.msg === "Update Successfully") {
                setUpdateModal({ ...updateModal, visible: false });
                fetchTasks(); // Fetch tasks again to update the list
            } else {
                console.log("Failed to update task");
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const onPressButton = (type) => {
        setActiveButton(type);
    };

    const onPressPlusButton = () => {
        setTaskModal(true);
    };

    const onPressUpdateButton = (id) => {
        console.log(id);
        setUpdateModal({ visible: true, id: id, update: '' });
    };

    const handleCloseModalPassword = () => {
        setTaskModal(false);
    };

    const handleCloseModalUpdate = () => {
        setUpdateModal({ ...updateModal, visible: false });
    };

    const renderTasks = () => {
        let filteredTasks = [];

        if (activeButton === 'All') {
            filteredTasks = taskdata;
        } else {
            filteredTasks = taskdata.filter(task => task.status === activeButton);
        }

        if (filteredTasks.length === 0) {
            return <Text>No tasks found.</Text>;
        }

        return filteredTasks.map(task => (
            <View key={task.id} style={styles.taskcontainer}>
                <Text style={styles.text1}>Status: {task.status}</Text>
                <Text style={styles.text1}>Task: {task.task}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.text1}>Date: {task.created_at}</Text>
                    <Pressable style={{ height: 20, width: '30%' }} onPress={() => onPressUpdateButton(task.id)}>
                        <Button text="Update" style={styles.button} />
                    </Pressable>
                </View>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'All' && { backgroundColor: '#ddd' }
                    ]}
                    onPress={() => onPressButton('All')}
                >
                    <Text style={[styles.text, activeButton === 'All' && { color: '#625bc5' }]}>All Task</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'Pending' && { backgroundColor: '#ddd' }
                    ]}
                    onPress={() => onPressButton('Pending')}
                >
                    <Text style={[styles.text, activeButton === 'Pending' && { color: '#625bc5' }]}>Pending</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.button,
                        activeButton === 'Complete' && { backgroundColor: '#ddd' }
                    ]}
                    onPress={() => onPressButton('Complete')}
                >
                    <Text style={[styles.text, activeButton === 'Complete' && { color: '#625bc5' }]}>Complete</Text>
                </Pressable>
            </View>

<ScrollView>
{renderTasks()}
</ScrollView>

            <Pressable style={styles.plusButton} onPress={onPressPlusButton}>
                <AntDesign name="plus" size={28} color="#dbdad3" />
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={taskmodal}
                onRequestClose={handleCloseModalPassword}
            >
                <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <View></View>
                            <Text style={styles.modalText}>Add Task</Text>
                            <Pressable onPress={handleCloseModalPassword}>
                                <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'column', width: '90%', justifyContent: 'space-between' }}>
                            <TextInput
                                placeholder="Enter Task"
                                value={newTask}
                                onChangeText={text => setNewTask(text)}
                                style={[styles.textinput, { paddingLeft: 20 }]}
                            />
                            <Pressable onPress={addTask} style={{ marginTop: 15 }}>
                                <Button text="Add Task" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={updateModal.visible}
                onRequestClose={handleCloseModalUpdate}
            >
                <View style={[styles.centeredView, { justifyContent: 'flex-end' }]}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <View></View>
                            <Text style={styles.modalText}>Update Task</Text>
                            <Pressable onPress={handleCloseModalUpdate}>
                                <MaterialCommunityIcons name="close-circle" size={25} color="#625bc5" />
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'column', width: '90%', justifyContent: 'space-between' }}>
                            <TextInput
                                placeholder="Enter Updated Task"
                                value={updateModal.update}
                                onChangeText={text => setUpdateModal({ ...updateModal, update: text })}
                                style={[styles.textinput, { paddingLeft: 20 }]}
                            />
                            <Pressable onPress={updateTask} style={{ marginTop: 15 }}>
                                <Button text="Update Task" />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Taskscreen;

const styles = StyleSheet.create({
    button: {
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    plusButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#625bc5',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
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
    text: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
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
        height: '30%'
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#625bc5',
    },
    tasktext: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    taskcontainer: {
        backgroundColor: '#ede8e8',
        justifyContent: 'center',
        padding: 10,margin:6
    },
    text1: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        marginBottom: 8
    },
});
