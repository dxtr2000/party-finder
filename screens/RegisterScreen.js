import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
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

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        Toast.show({
          type: "success",
          position: "top",
          text1: "Sikeres regisztráció",
          text2: `A ${email} e-mail címmel sikeresen regisztráltál!`,
          visibilityTime: 1500,
          autoHide: true,
          onHide: () => navigation.replace("Home"),
        });
        console.log("Registered with:", user.email);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Hiba történt a regisztráció során",
          text2: "Kérlek ellenőrizd a megadott adatok helyességét!",
          visibilityTime: 3000,
          autoHide: true,
        });
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} behavior="padding">
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Text style={styles.partyFinderText}>Regisztráció</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
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
          <TextInput
            placeholder="Jelszó újra"
            value={passwordAgain}
            onChangeText={(text) => setPasswordAgain(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Regisztráció</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace("Login")}>
            <Text style={styles.alreadyRegisteredText}>
              Van már fiókod? Kattints ide.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

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
    paddingVertical: 10,
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
    marginTop: 30,
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
  alreadyRegisteredText: {
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
