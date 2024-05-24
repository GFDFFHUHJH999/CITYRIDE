import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const DriverScreen = ({ navigation }) => {
  const [rideRequests, setRideRequests] = useState([
    {
      id: 1,
      pickupLocation: 'Pickup Location 1',
      dropLocation: 'Drop Location 1',
      pickupCoordinates: { latitude: 25.6747, longitude: 94.1100 },
      dropCoordinates: { latitude: 25.6847, longitude: 94.1200 },
    },
    {
      id: 2,
      pickupLocation: 'Pickup Location 2',
      dropLocation: 'Drop Location 2',
      pickupCoordinates: { latitude: 25.6847, longitude: 94.1200 },
      dropCoordinates: { latitude: 25.6947, longitude: 94.1300 },
    },
    // Add more ride requests as needed
  ]);

  const handleAcceptRide = (id) => {
    // Logic to accept the ride request with the given id
    console.log(`Ride ${id} accepted`);
    // Update rideRequests state by removing the accepted ride request
    setRideRequests(rideRequests.filter(request => request.id !== id));
  };

  const handleRejectRide = (id) => {
    // Logic to reject the ride request with the given id
    console.log(`Ride ${id} rejected`);
    // Update rideRequests state by removing the rejected ride request
    setRideRequests(rideRequests.filter(request => request.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 25.6747,
            longitude: 94.1100,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {rideRequests.map(request => (
            <Marker
              key={request.id}
              coordinate={request.pickupCoordinates}
              title={`Ride ${request.id}`}
              pinColor="blue"
            />
          ))}
        </MapView>
      </View>

      <View style={styles.requestContainer}>
        {rideRequests.map(request => (
          <View key={request.id} style={styles.request}>
            <Text style={styles.requestText}>New Ride Request:</Text>
            <Text style={styles.locationText}>Pickup: {request.pickupLocation}</Text>
            <Text style={styles.locationText}>Drop: {request.dropLocation}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptRide(request.id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleRejectRide(request.id)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color="black" />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    //flex: 1,
    height: '69%',
    marginHorizontal: '4%',
    marginTop: statusBarHeight,
    borderWidth: 1,
    borderColor: 'black',
  },
  map: {
    flex: 1,
  },
  requestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  request: {
    width: '48%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
    marginRight: '2%', // Added marginRight to create space between boxes
  },
  requestText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
  },
});

export default DriverScreen;
