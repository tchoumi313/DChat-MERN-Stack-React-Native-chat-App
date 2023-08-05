import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const HomeScreen = () => {
  // ... (existing code)
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const [filteredUsers, setFilteredUsers] = useState(users); // New state to hold filtered users

  // Function to handle search
  const handleSearch = (searchText) => {
    if (searchText === "") {
      // If search text is empty, display all users
      setFilteredUsers(users);
    } else {
      // Filter users based on search text
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  // ... (existing code)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#4A55a2",
      },
      headerLeft: () => (
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white", marginLeft: 10 }}>
          On Djoss
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
          <Ionicons onPress={() => navigation.navigate("Chats")}  style={{ marginRight: 10 , fontSize:30 ,borderWidth:2,padding:2,justifyContent:"center", borderColor:"#4A55e2", borderRadius:6}} name="chatbox-ellipses-outline" size={24} color={"white"} />
          <MaterialIcons
            onPress={() => navigation.navigate("Friend")}
            name="people-outline"
            size={24}
            color={"white"}
            style={{ marginRight: 10 , fontSize:30 ,borderWidth:2,padding:2,justifyContent:"center", borderColor:"#4A55e2", borderRadius:6}}
          />
        </View>
      ),
    });

    return () => {};
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("TOKEN");
      const decodeToken = jwt_decode(token);

      const userId = decodeToken.userId;
      setUserId(userId);

      // Set isLoading to true before making the API call
      setIsLoading(true);

      axios
        .get(`https://dalle-imagecrafter-dt.onrender.com/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
          setFilteredUsers(response.data);
          // Set isLoading to false after the data is fetched
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // Set isLoading to false in case of an error
          setIsLoading(false);
        });
    };

    fetchUser();
  }, []);
  console.log(users);


  
  return (
    <View>
      {/* Add the SearchBar component and pass the handleSearch function */}
      <SearchBar onSearch={handleSearch} />

      {isLoading ? (
        // ... (existing code)
        <>
        <ActivityIndicator size="large" color="#4A55a2" style={{ flex: 1, justifyContent: "center", alignItems: "center", top:15 }} />
        <Text style={{fontSize:14, fontWeight:"bold"}}>Loading...</Text></> 

      ) : (
        <View style={{ padding: 10 }}>
          {/* Display filtered users instead of all users */}
          {filteredUsers.map((user, index) => (
            <User key={index} item={user} />
          ))}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
