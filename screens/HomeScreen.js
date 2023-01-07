import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, firestore } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [coordinates, setCoordinates] = useState({
    latitude: 47.162494,
    longitude: 19.503304,
  });

  const [savedLocations, setSavedLocations] = useState([]);

  const fetchSavedLocations = async () => {
    const locations = await firestore
      .collection("locations")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => doc.data());
      });
    setSavedLocations(locations);
  };

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const saveLocation = () => {
    firestore
      .collection("locations")
      .add({
        coordinates,
        name: "My Location 2",
      })
      .then(() => {
        console.log("Location saved!");
        Toast.show({
          type: "success",
          position: "top",
          text1: "Helyszín mentve",
          text2: "Sikeresen felvetted a helyszínt a térképre!",
          visibilityTime: 3000,
          autoHide: true,
          onHide: () => fetchSavedLocations(),
        });
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 47.162494,
          longitude: 19.503304,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
        onLongPress={(e) => setCoordinates(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={coordinates} pinColor="red" />
        {savedLocations.map((location, id) => (
          <Marker
            key={location.id}
            coordinate={location.coordinates}
            pinColor="blue"
          >
            <Callout>
              <Text>{location.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.containerB} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={saveLocation} style={styles.button}>
            <Text style={styles.buttonText}>
              <Icon name="user" size={30} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveLocation} style={styles.button}>
            <Text style={styles.buttonText}>
              <Icon name="plus" size={30} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>
              <Icon name="sign-out" size={30} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    bottom: 110,
    width: "100%",
    height: 110,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(52, 73, 94,0.8)",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "17%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginLeft: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 24,
  },
  containerB: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default HomeScreen;
