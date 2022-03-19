import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import Speed from './components/Speed'

export default function App() {
  // rgb(153,229,178) Pantone 352
  // rgb(181,226,191) Pantone 344
  // 

  return (
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <Text>Slava Ukraina!</Text>
        <Speed />
        <StatusBar style="auto" />
      </View>
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
