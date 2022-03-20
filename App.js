import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Speed from './components/Speed'
import * as Location from 'expo-location';

export default function App() {
  // rgb(153,229,178) Pantone 352
  // rgb(181,226,191) Pantone 344
  // 

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      getLocation()
    })();

    async function getLocation(){
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (e) {
        console.log("Failed to get location:", e)
      }
    }

    setInterval(getLocation, 1000)


    return () => clearInterval(getLocation)
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <TailwindProvider utilities={utilities}>
        <Speed location={location} />
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
