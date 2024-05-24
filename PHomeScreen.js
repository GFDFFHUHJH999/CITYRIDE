import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Button, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const images = [
  require('../assets/image1.png'),
  require('../assets/2wheel.png'),
  require('../assets/image5.jpg'),
  require('../assets/CityRide.png'),
  // Add more image paths as needed
];

const PassengerHomePage = () => {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} />
    </View>
  );

  const onSnapToItem = (index) => setActiveSlide(index);

  const handleButtonPress = () => {
    // Handle button press action here
    console.log('Button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Image Carousel */}
      <View style={[styles.carouselContainer, { marginTop: 100 }]}>
        <Carousel
          ref={carouselRef}
          data={images}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          loop={true}
          autoplay={true} // Enable autoplay
          autoplayInterval={3000} // Set autoplay interval to 3 seconds
          layout={'default'}
          onSnapToItem={onSnapToItem}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>

      {/* Book Now Button and Label */}
      <View style={styles.buttonContainer}>
        <Button title="Book Now" onPress={handleButtonPress} color="#000" />
        <Text style={styles.label}>Book your ride now</Text>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color="white" />
          <Text style={styles.iconText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDD0', 
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000', // Black background
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    color: '#FFF', // White text color
  },
  carouselContainer: {
    marginTop: 200, // Adjusted to move carousel more down
    height: viewportHeight / 2, // Half of the screen height
    width: viewportWidth,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: viewportHeight / 2.4, // Half of the screen height
    width: viewportWidth,
  },
  image: {
    width: viewportWidth,
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80, // Adjusted to be right above the bottom bar
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#000', // Black text color
  },
});

export default PassengerHomePage;
