// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      // Navigate to the main screen or any other screen after splash screen
      navigation.replace('MainScreen');
    }, 3000); // 3000 milliseconds = 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/CityRide.png')} // Replace 'path_to_your_logo' with the actual path to your logo image
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Change to your preferred background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Adjust the image size as needed
  },
});

export default SplashScreen;
