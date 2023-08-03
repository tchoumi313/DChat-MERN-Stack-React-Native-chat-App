import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search..."
        style={styles.input}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
});

export default SearchBar;
