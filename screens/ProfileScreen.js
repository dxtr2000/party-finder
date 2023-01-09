import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, changePassword, changeEmail, changeName } from "../firebase";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/core";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setName(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
  }, []);

  auth.reauthenticate = (currentPassword) => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const updateProfile = () => {
    if (name.length > 0 && email.length > 0 && currentPassword.length > 0) {
      if (newPassword.length > 0 && newPassword === confirmPassword) {
        changePassword(currentPassword, newPassword);
      }
      if (email !== auth.currentUser?.email) {
        changeEmail(currentPassword, email);
      }
      if (name !== auth.currentUser?.displayName) {
        changeName(currentPassword, name);
      }
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Hiba",
        text2: "Kérlek add meg a jelenlegi jelszavad.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} behavior="padding">
        <Toast refs={(ref) => Toast.setRef(ref)} />
        <View style={styles.partyFinderText}>
          <Image
            source={require("../assets/profile.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.customText}>{auth.currentUser.displayName}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Teljes név"
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Jelszó"
            style={styles.input}
            secureTextEntry
            value={currentPassword}
            onChangeText={(text) => setCurrentPassword(text)}
          />
          <TextInput
            placeholder="Új jelszó"
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            placeholder="Új jelszó újra"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={updateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Mentés</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.replace("Home");
            }}
          >
            <Text style={styles.buttonText}>Vissza</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginTop: 100,
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
    marginBottom: 10,
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
    position: "absolute",
    top: 50,
    marginTop: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  customText: {
    color: "black",
    fontWeight: "700",
    fontSize: 35,
    padding: 10,
  },
});
