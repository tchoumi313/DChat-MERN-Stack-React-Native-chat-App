import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    console.log(name,email,password,image)
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    console.log(user)
    // send post request
    axios
      .post("https://dalle-imagecrafter-dt.onrender.com/register", user)
      .then((response) => {
        console.log(response);
        alert("Messages: "+ response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
        navigation.navigate('Login')
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#fff",
          alignItems: "center",
          top: 50,
          borderRadius: 15,
        }}
      >
        <View style={styles.subContainer}>
          <Text style={{ fontSize: 20, color: "#4A55a2", fontWeight: 600 }}>
            Sign Up To DChat
          </Text>
          <Text style={{ fontSize: 17, color: "#4A55a2", fontWeight: 600 }}>
            Create your Account
          </Text>
        </View>

        <View style={{ marginTop: 50, padding: 10 }}>
          <View>
            <Text>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter your name"
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
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Enter your password"
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 16,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View>
            <Text>Image</Text>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              placeholder="select a profile image"
              placeholderTextColor={"black"}
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#4A55a2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 13,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Already have an Account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#4A55a2",
  },
  subContainer: {
    marginTop: 10,
  },
});
export default RegisterScreen;
