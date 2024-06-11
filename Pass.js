import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import moment from 'moment';
import Toast, { BaseToast } from 'react-native-toast-message';
import * as Location from 'expo-location';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; // Import initializeApp function
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

// Initialize Firebase Authentication
const auth = getAuth();

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyCA7wBoQgyALz623_kZIPjaExG3ojba86U",
  authDomain: "cityride2-c66ec.firebaseapp.com",
  projectId: "cityride2-c66ec",
  storageBucket: "cityride2-c66ec.appspot.com",
  messagingSenderId: "692339334559",
  appId: "1:692339334559:web:9de6f6a4df5936bb2271aa"
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const db = getFirestore(app);

// Rest of the code remains the same...


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e", borderRadius: 12, marginBottom: 20 }}
      text1Style={{
        fontSize: 15,
        color: "#fff",
        textAlign: "center"
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#E3AB12', backgroundColor: "#E3AB12", borderRadius: 12, marginBottom: 20 }}
      text1Style={{
        fontSize: 15,
        color: "#fff",
        textAlign: "center"
      }}
    />
  )
};

export default function Pass({ route }) {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [loaderModal, setLoaderModal] = useState(false);
  const [rideRequested, setRideRequested] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (route.params && route.params.driverDetails) {
      const { name, phoneNumber, vehicleNumber } = route.params.driverDetails;
      // Display the driver details
      console.log("Driver Name: ", name);
      console.log("Driver Phone Number: ", phoneNumber);
      console.log("Driver Vehicle Number: ", vehicleNumber);
    }
  }, [route.params]);

  const onSubmit = async () => {
    if (pickupLocation === "" || pickupLocation === null) {
      Toast.show({
        type: 'info',
        text1: 'Pickup location cannot be empty'
      });
    } else if (dropLocation === "" || dropLocation === null) {
      Toast.show({
        type: 'info',
        text1: 'Drop location cannot be empty'
      });
    } else {
      setLoaderModal(true);
      uploadData();
      // Simulate ride acceptance after a delay (e.g., 3 seconds)
      setTimeout(() => {
        setRideAccepted(true);
        setLoaderModal(false); // Hide the loader after 3 seconds
      }, 3000);
      // Update ride requested state
      setRideRequested(true);
    }
  }
  
  const uploadData = async () => {
    const today = moment();
    try {
      const user = auth.currentUser; // Get the current user
      if (user) {
        if (!rideRequested) {
          const createUser = await addDoc(collection(db, "rides"), {
            userId: user.uid, // Associate the ride request with the current user's ID
            date: today.format('Do MMMM, YYYY'),
            pickupLocation: pickupLocation,
            dropLocation: dropLocation,
            isRideAccepted: false
          });
          setRideRequested(true);
          Toast.show({
            type: 'success',
            text1: 'Event Created'
          });
          setLoaderModal(false);
        }
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      setLoaderModal(false);
    }
  }
  

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {} else {
      const location = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (address.length > 0) {
        const { formattedAddress } = address[0];
        setPickupLocation(formattedAddress);
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingLeft: "5.5%", paddingRight: "5.5%" }}>
      <StatusBar backgroundColor={"#000"} style="light" />
      <Modal isVisible={loaderModal} style={{ justifyContent: "center", alignSelf: "center" }} useNativeDriver={true}>
        <StatusBar backgroundColor={"#000000"} style="light" />
        <View style={{ backgroundColor: 'transparent', justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
          <Image
            style={{
              height: 200,
              resizeMode: "contain"
            }}
            source={require("../assets/loader.gif")}
          />
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 62, paddingTop: "7%", }}>
        <Text style={{ color: "#222", fontSize: 24 }}>
          Book Ride
        </Text>
        <Text style={{ color: "#222", marginTop: 6, fontSize: 14, marginBottom: 20 }}>
          Please make sure all the required fields are properly filled.
        </Text>
        <Text style={{ color: "#222", marginTop: 20, fontSize: 15, marginLeft: 2 }}>
          Pickup Location
        </Text>
        <View style={{ width: "100%", height: 45, marginTop: 8, borderWidth: 2, borderColor: "#E3E3E3", backgroundColor: "#fff", borderRadius: 7, justifyContent: "center", alignSelf: "center", paddingLeft: 13, paddingRight: 13 }}>
          <TextInput
            style={{
              width: "100%",
              color: "#222",
              fontSize: 16,
            }}
            value={pickupLocation}
            placeholder={"Enter Pickup Location"}
            placeholderTextColor={"#9E9E9E"}
            onChangeText={(text) => setPickupLocation(text)}
            returnKeyType="next"
          />
        </View>
        <Text style={{ color: "#222", marginTop: 20, fontSize: 15, marginLeft: 2 }}>
          Drop Location
        </Text>
        <View style={{ width: "100%", height: 50, marginTop: 8, flexDirection: "row", backgroundColor: "#fff", borderRadius: 7, alignSelf: "center", paddingLeft: 13, paddingRight: 13, borderWidth: 2, borderColor: "#E3E3E3", }}>
          <TextInput
            style={{
              width: "100%",
              color: "#222",
              fontSize: 16,
            }}
            value={rideAccepted ? "" : dropLocation} // Only display drop location if ride is not accepted
            placeholder={"Enter Drop Location"}
            placeholderTextColor={"#9E9E9E"}
            onChangeText={(text) => setDropLocation(text)}
            returnKeyType="done"
            editable={!rideAccepted} // Disable editing drop location if ride is accepted
          />
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={{
            backgroundColor: rideRequested ? "#06c58e" : "#000",
            marginTop: 20,
            width: "100%",
            height: 45,
            borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, }}>
            {rideRequested ? "Ride Requested" : "Book Ride"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 7,
    padding: 12,
    paddingLeft: 13
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 15,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  },
});
