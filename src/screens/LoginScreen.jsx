import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Pressable, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for showing the loading indicator


  const navigation = useNavigation()
/* 
  useEffect(()=>{
    const checkLoginStatus = async()=>{
     try {
      const token =  await AsyncStorage.getItem("TOKEN");

      if(token) {navigation.replace('Home')}
     } catch (error) {
      alert(error);
      console.log(error);
     }
    } 
    
    checkLoginStatus();
    },[])
    
   */

      


  const handleLogin = ()=>{
    const user={
      email:email,
      password:password
    }

    setIsLoading(true); // Show the loading indicator

    axios.post('http://192.168.43.239:8000/login', user)
    .then((response) =>{
      console.log(response)
      const token= response.data.token;

      AsyncStorage.setItem("TOKEN", token);
      setIsLoading(false); // Hide the loading indicator after successful login
    
      navigation.replace('Home')
      
    }).catch((err) => {
      setIsLoading(false); // Hide the loading indicator on error
       
      alert('Invalid credentials')
      console.log(err)
    })
  }

  return ( 
    <View style={styles.container}>
      
      <KeyboardAvoidingView style={{backgroundColor:"#fff" , alignItems:"center", top:50, borderRadius:15 }}>
        <View style={styles.subContainer}>
          <Text style={{ fontSize: 20, color: "#4A55a2", fontWeight: 600 }}>
            Sign In To DChat
          </Text>
          <Text style={{ fontSize: 17, color: "#4A55a2", fontWeight: 600 }}>
            Sign In to your Account
          </Text>
        </View>

        <View style={{marginTop:50, padding:10}}>
          <View>
            <Text>Email</Text>
            <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email"
              placeholderTextColor={"black"}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View>
            <Text>Password</Text>
            <TextInput
            value={password}
            onChangeText={(text)=>setPassword(text)}
            secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={"black"}
              style={{
                fontSize:email? 18: 16,
                borderBottomColor: "gray",
                borderBottomWidth: 1,  
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <Pressable 
          onPress={handleLogin}
          style={{
            width:200, 
            backgroundColor:"#4A55a2",
            padding:15,
            marginTop:50,
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius:6}}>

               {/* Display either "Login" or the loading indicator based on isLoading state */}
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Login</Text>
          )}
          </Pressable>

            <Pressable style={{marginTop:10}} onPress={()=>(navigation.navigate("Register"))}>
              <Text style={{color:"gray", fontSize:13, fontWeight:"bold", textAlign:"center"}}>Don't have an Account? Sign Up</Text>
            </Pressable>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent:"center",
    
    alignItems: "center",
    backgroundColor: "#4A55a2",
  },
  subContainer: {
    marginTop: 10,
  },
});
