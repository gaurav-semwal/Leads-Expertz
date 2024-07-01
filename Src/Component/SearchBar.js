import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={24}
          color="#625bc5"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          // onFocus={() => {
          //   setClicked(true);
          // }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    flexDirection: "row",
    width: "99%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    opacity: 0.7,
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBar__clicked: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    opacity: 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
