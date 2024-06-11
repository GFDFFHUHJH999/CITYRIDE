import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Intro from './screens/intro';
import Dscrn from './screens/Dscrn';
import Pass from './screens/Pass';
import Driver from './screens/Driver';
import PassengerMenu from './screens/PassenegerMenu'
import PassengerHomePage from './screens/PHomeScreen'
import Signup from './screens/signup'
import LoginPage from './screens/loginpage'
import Details from './screens/details'
import Status from './screens/Status'
const Stack = createStackNavigator();

function App() {
  return (
    
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Dscrn" component={Dscrn} />
          <Stack.Screen name="Details" component={Details}/>
          <Stack.Screen name="PassengerHomePage" component ={PassengerHomePage}/>
          <Stack.Screen name="Status" component ={Status}/>
          <Stack.Screen name="Pass" component={Pass} />
         
          <Stack.Screen name="Driver" component={Driver} />
  
                <Stack.Screen name="PassengerMenu" component={PassengerMenu}/>

       
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

export default App;
