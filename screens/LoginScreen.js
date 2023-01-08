import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.displayName);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Bejelentkezési hiba",
          text2: "Kérlek ellenőrizd az e-mail címed és a jelszavad!",
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Sikeres bejelentkezés",
          text2: "Hamarosan átirányítunk a főoldalra!",
          visibilityTime: 1500,
          autoHide: true,
          onHide: () => navigation.replace("Home"),
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} behavior="padding">
        <Toast refs={(ref) => Toast.setRef(ref)} />
        <Text style={styles.partyFinderText}>Bejelentkezés</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email cím"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Jelszó"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Bejelentkezés</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("Register")}>
            <Text style={styles.notRegisteredText}>
              Kattints ide a regisztrációhoz.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  notRegisteredText: {
    color: "purple",
    fontWeight: "700",
    fontSize: 12,
    paddingTop: 10,
  },
  partyFinderText: {
    fontSize: 50,
    fontWeight: "700",
    color: "#0782F9",
    position: "absolute",
    top: 0,
    marginTop: 85,
  },
});
