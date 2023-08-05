import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
import React, { useContext,useEffect,useLayoutEffect,useState } from "react";
import { UserType } from "../../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import SearchBar from "../components/SearchBar";


const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={{ color: "white", fontSize: 20 }}>Chats</Text>,
      headerStyle: {
        backgroundColor: "#4A55a2",
      },
      headerTitleStyle: {
        color: "white", // Set text color to white
      },
      headerTintColor: "white", // Set back button and other icons' color to white
    });
 

    return () => {};
  }, [navigation]);


  const [filteredFriends, setFilteredFriends] = useState(acceptedFriends); // New state to hold filtered friends

    // Function to handle search
    const handleSearch = (searchText) => {
      if (searchText === "") {
        // If search text is empty, display all friends
        setFilteredFriends(acceptedFriends);
      } else {
        // Filter friends based on search text
        const filtered = acceptedFriends.filter(
          (friend) =>
            friend.name.toLowerCase().includes(searchText.toLowerCase()) ||
            friend.email.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredFriends(filtered);
      }
    };

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `https://dalle-imagecrafter-dt.onrender.com/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
          setFilteredFriends(data)
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);
  console.log("friends",acceptedFriends)
  return (
    <View>  
      {/* Add the SearchBar component and pass the handleSearch function */}
       <SearchBar onSearch={handleSearch} />

      <ScrollView showsVerticalScrollIndicator={false}>
      
      <Pressable>
           {/* Display filtered friends instead of all friends */}
        {filteredFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
      </View>
   
  );
    
};

export default ChatsScreen;

const styles = StyleSheet.create({});
