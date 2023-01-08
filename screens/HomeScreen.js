import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  Pressable,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, firestore } from "../firebase";
import * as Location from "expo-location";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [coordinates, setCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const [currentLocation, setcurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [savedLocations, setSavedLocations] = useState([]);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoordinates({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setcurrentLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  const fetchSavedLocations = async () => {
    const locations = await firestore
      .collection("locations")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
      });
    setSavedLocations(locations);
  };

  useEffect(() => {
    fetchSavedLocations();
    getCurrentLocation();
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
        region={coordinates}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
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
              <Text>{location.id}</Text>
              <View behavior="padding">
                <View style={styles.callOutbuttonContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `maps://app?saddr=${currentLocation.latitude}+${currentLocation.longitude}&daddr=${location.coordinates.latitude}+${location.coordinates.longitude}`
                      )
                    }
                    style={styles.callOutbutton}
                  >
                    <Text style={styles.callOutbuttonText}>
                      <Icon name="map-marker" size={30} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.callOutbutton}>
                    <Text style={styles.callOutbuttonText}>
                      <Icon name="info" size={30} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Toast refs={(ref) => Toast.setRef(ref)} />
      <View style={styles.containerB} behavior="padding">
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={saveLocation} style={styles.button}>
            <Text style={styles.buttonText}>
              <Icon name="user" size={30} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={styles.button}
          >
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
    bottom: 130,
    width: "95%",
    height: 110,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(52, 73, 94,0.8)",
    borderRadius: 45,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "21%",
    padding: 20,
    borderRadius: 25,
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
  callOutbuttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  callOutbutton: {
    backgroundColor: "#0782F9",
    width: 40,
    padding: 5,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginLeft: 10,
  },
  callOutbuttonText: {
    color: "white",
    fontWeight: "900",
    fontSize: 24,
  },
});

export default HomeScreen;
