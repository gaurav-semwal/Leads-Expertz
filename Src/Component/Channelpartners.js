import { StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'

const Channelpartners = () => {

    const data = [
        { id: '1', name: 'ADESH MANOCHA', number: '+91 8146653301', city: 'Zirakpur' },
        { id: '2', name: 'PRIYANKA PIPLANI ', number: '+91 78883 44622', city: 'Gurugram' },
        { id: '3', name: 'MANMEET KAUR', number: '+91 9711428904', city: 'Mohali' },
    ];

    const Item = ({ item }) => (
        <Pressable style={styles.card}>
            <View style={styles.content}>
                <View style={styles.namecontent}>
                    <View style={styles.nametext}>
                        <Text>Name</Text>
                    </View>
                    <Text style={[styles.text, styles.title]}>{item.name}</Text>
                </View>
                <View style={styles.namecontent}>
                    <View style={styles.nametext}>
                        <Text>Number</Text>
                    </View>
                    <Text style={[styles.text, styles.description]}>{item.number}</Text>
                </View>
                <View style={styles.namecontent}>
                    <View style={styles.nametext}>
                        <Text>City</Text>
                    </View>
                    <Text style={[styles.text, styles.description]}>{item.city}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={{ height: '40%' }}>
            <FlatList
                nestedScrollEnabled
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
                vertical
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default Channelpartners

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        height: 60,
        margin: 10,
        borderRadius: 10,
        minWidth: 150,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        alignItems: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: '#CED0CE',
        padding: 5,
    },
    title: {
        fontWeight: 'bold',
    },
    namecontent: {
        flexDirection: 'column',
        height: 50,
        alignItems: 'center'
    },
    nametext: {
        backgroundColor: '#d2d6d3',
        width: 50,
        alignItems: 'center'
    }
});