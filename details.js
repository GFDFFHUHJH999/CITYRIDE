import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Modal from "react-native-modal";
import moment from "moment";
import { initializeApp } from "firebase/app";
import Toast, { BaseToast } from 'react-native-toast-message';
import { getFirestore, collection, addDoc  } from "firebase/firestore";


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

const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#06c58e', backgroundColor: "#06c58e", borderRadius: 12, marginBottom: 20 }}
        text1Style={{
          fontSize: 15,
          color:"#fff",
          textAlign:"center"
        }}
      />
    ),
    info: (props) => (
        <BaseToast
          {...props}
          style={{ borderLeftColor: '#E3AB12', backgroundColor: "#E3AB12",borderRadius: 12, marginBottom: 20 }}
          text1Style={{
            fontSize: 15,
            color:"#fff",
            textAlign:"center"
          }}
        />
    )
};

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        phoneNumber: "",
        vehicleID: "",
        loaderModal: false,
        submitted: false // Added state to track if data submitted
    };
  }

  onSubmit = async() => {
    if(this.state.phoneNumber === "" || this.state.vehicleID === "") {
        Toast.show({
            type: 'info',
            text1: 'Phone number and Vehicle ID cannot be empty'
        });
        return;
    }
    this.setState({
        loaderModal: true
    });
    this.uploadData();
  }

  uploadData = async() => {
    const { phoneNumber, vehicleID } = this.state;
    try {
        const docRef = await addDoc(collection(db, "driversdata"), {
            phoneNumber: phoneNumber,
            vehicleID: vehicleID,
        });
        console.log("Document written with ID: ", docRef.id);
        Toast.show({
            type: 'success',
            text1: 'Driver details saved successfully'
        });
        // Update state to indicate data submitted successfully
        this.setState({
            submitted: true
        });
    } catch (e) {
        console.error("Error adding document: ", e);
        Toast.show({
            type: 'error',
            text1: 'Failed to save driver details'
        });
    } finally {
        this.setState({
            loaderModal: false
        });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', padding: "5.5%" }}>
        <StatusBar backgroundColor={"#000"} style="light" />
        <Modal isVisible={this.state.loaderModal} style={{ justifyContent: "center", alignItems: "center" }}  useNativeDriver={true}>
            <View style={{ backgroundColor: 'transparent', justifyContent: "center", alignItems: "center" }}>
                <Text>Loading...</Text>
            </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 62, paddingTop: "7%" }}>
              <Text style={{ color: "#222", fontSize: 24, marginBottom: 20 }}>
                Driver Details
              </Text>
            <Text style={{ color: "#222", fontSize: 15, marginLeft: 2 }}>
              Phone Number
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={this.state.phoneNumber}
                    placeholder={"Enter Phone Number"}
                    placeholderTextColor={"#9E9E9E"}
                    onChangeText={(text) =>  this.setState({phoneNumber: text})}
                    returnKeyType="next"
                />
            </View>
            <Text style={{ color: "#222", fontSize: 15, marginLeft: 2 }}>
              Vehicle ID
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={this.state.vehicleID}
                    placeholder={"Enter Vehicle ID"}
                    placeholderTextColor={"#9E9E9E"}
                    onChangeText={(text) =>  this.setState({vehicleID: text})}
                    returnKeyType="done"
                />
            </View>
            <TouchableOpacity onPress={this.onSubmit} style={styles.submitButton}>
                <Text style={styles.buttonText}>
                  {this.state.submitted ? "Data Submitted Successfully" : "Submit"}
                </Text>
            </TouchableOpacity>
            <Toast position="bottom" visibilityTime={2000} config={toastConfig}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: 45,
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#E3E3E3",
    backgroundColor: "#fff",
    borderRadius: 7,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 13,
    paddingRight: 13
  },
  input: {
    width: "100%",
    color: "#222",
    fontSize: 16,
  },
  submitButton: {
    borderRadius: 8,
    marginTop: "9%",
    marginBottom: "20%",
    height: 48,
    backgroundColor: "#f4c430",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginTop: -1.5
  }
});
