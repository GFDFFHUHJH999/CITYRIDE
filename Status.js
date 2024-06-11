import React, { Component } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, updateDoc, where, query, getDocs } from "firebase/firestore";
import { AntDesign } from '@expo/vector-icons';
import Toast, { BaseToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCA7wBoQgyALz623_kZIPjaExG3ojba86U",
    authDomain: "cityride2-c66ec.firebaseapp.com",
    projectId: "cityride2-c66ec",
    storageBucket: "cityride2-c66ec.appspot.com",
    messagingSenderId: "692339334559",
    appId: "1:692339334559:web:9de6f6a4df5936bb2271aa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(); 

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e", borderRadius: 12, marginBottom: 65, width:"90%" }}
      text1Style={{
        fontSize: 15,
        color:"#fff",
        textAlign:"center"
      }}
    />
  )
};

// Status component
export default class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      completedRides: []
    };
  }

  async componentDidMount(){
    await this.getDriversData();
    await this.loadCompletedRides();
  }

  // Function to fetch driver data
  getDriversData = async() => {
    Toast.show({
      type: 'success',
      text1: 'Please wait, refreshing data'
    });

    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "driversdata"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);

    let drivers = [];
    querySnapshot.forEach((doc) => {
      drivers.push({ id: doc.id, ...doc.data() });
    });

    this.setState({ drivers });
  }

  // Function to load completed rides
  loadCompletedRides = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const completedRides = await AsyncStorage.getItem(`completedRides_${user.uid}`);
        if (completedRides !== null) {
          this.setState({ completedRides: JSON.parse(completedRides) });
        }
      }
    } catch (error) {
      console.error('Error loading completed rides:', error);
    }
  }

  // Function to mark ride as complete
  markRideComplete = async (driverId) => {
    try {
      const driverRef = doc(db, "driversdata", driverId);
      await updateDoc(driverRef, { rideCompleted: true });
      Toast.show({
        type: 'success',
        text1: 'Ride marked as complete'
      });

      const user = auth.currentUser;
      if (user) {
        const { completedRides } = this.state;
        const updatedCompletedRides = [...completedRides, driverId];
        await AsyncStorage.setItem(`completedRides_${user.uid}`, JSON.stringify(updatedCompletedRides));
        this.setState({ completedRides: updatedCompletedRides });
      }
    } catch (error) {
      console.error("Error marking ride as complete: ", error);
      Toast.show({
        type: 'error',
        text1: 'Failed to mark ride as complete'
      });
    }
  }

  render() {
    const { drivers, completedRides } = this.state;
    return (
      <View style={{backgroundColor:"#fff", padding:"4%", flex: 1, paddingTop: "6%"}}>
        <StatusBar backgroundColor={"#000"} style="light" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 15, marginBottom: 25}}>
            <Text style={{color:"#222", fontFamily: "Lato-Bold", fontSize: 22}}>This driver accepted your request</Text>
          </View>
          {drivers.length > 0 ?
            <View style={{ marginTop: "2%", marginBottom: 75, paddingLeft: 10, paddingRight: 10 }}>
              {drivers.map((driver, index) => (
                <View key={index} style={styles.driverContainer}>
                  <View>
                    <Text style={styles.driverInfo}>{`Ph_Number: ${driver.phoneNumber}`}</Text>
                    <Text style={styles.driverInfo}>{`Vehicle ID: ${driver.vehicleID}`}</Text>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.driverName}>{driver.name}</Text>
                    {completedRides.includes(driver.id) ? (
                      <AntDesign name="checkcircle" size={20} color="green" />
                    ) : (
                      <TouchableOpacity onPress={() => this.markRideComplete(driver.id)}>
                        <Text style={styles.completeButton}>Mark Ride Complete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
            :
            <Text>No active drivers available</Text>
          }
        </ScrollView>
        <Toast position="bottom" visibilityTime={2000} config={toastConfig}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  driverContainer: {
    borderWidth: 1,
    borderColor: "#f4c430",
    backgroundColor:"#FFF5D5",
    padding: 15,
    marginBottom: 7,
    borderRadius: 7,
  },
  driverName: {
    fontSize: 15,
    color:"#222",
  },
  driverInfo: {
    fontSize: 12,
    color:"#222",
    marginTop: 3,
  },
  completeButton: {
    fontSize: 14,
    color: "green",
  }
});