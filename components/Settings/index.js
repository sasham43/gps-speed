import React, { useState, useEffect, useRef, useContext } from 'react'

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn'
// import SettingsButton from '../SettingsButton'
// import SettingsScreen from '../SettingsScreen'
import SettingsContext from '../../SettingsContext'

import { Octicons } from '@expo/vector-icons'

export default function Settings(props){
    const { location } = props
    const tw = useTailwind()

    const [showSettings, setShowSettings] = useState()
    const settings = useContext(SettingsContext)
    const slideAnim = useRef(new Animated.Value(-2000)).current


    // const showSettings = useRef()
    function openSettingsScreen(){
        console.log('open')
        setShowSettings(true)
        // showSettings.current = true
    }
    function closeSettingsScreen(){
        console.log('close')
        setShowSettings(false)
        // showSettings.current = false
    }
    function toggleSettingsScreen(){
        console.log('toggle', showSettings)
        if(showSettings) {
            closeSettingsScreen()
        } else {
            openSettingsScreen()
        }
    }
    
    useEffect(() => {
        const slideIn = () => {
            // Will change slideAnim value to 1 in 5 seconds
            Animated.timing(slideAnim, {
                toValue: 25,
                duration: 800,
                useNativeDriver: true,
            }).start();

        };
    
        const slideOut = () => {
            // Will change slideAnim value to 0 in 3 seconds
            Animated.timing(slideAnim, {
                toValue: -2000,
                duration: 500,
                useNativeDriver: true,
            }).start();

        };

        if(showSettings === true){
            slideIn()
        } else {
            slideOut()
        }

    }, [showSettings])

    console.log('location', location)

    return (
        <>
            <View style={tw('border border-neutral-100 absolute top-0 left-0 z-50')}>
                <TouchableOpacity style={tw('border-neutral-100 absolute top-14 left-8')} onPress={() => toggleSettingsScreen()}>
                    <Octicons name={'gear'} size={40} color={'white'} />
                </TouchableOpacity>
            {/* <SettingsButton 
                showSettings={showSettings} 
                // setShowSettings={setShowSettings} 
            /> */}



            {/* <SettingsScreen 
                showSettings={showSettings} 
                // setShowSettings={setShowSettings} 
            /> */}
                <Animated.View style={[
                    tw('border border-neutral-100 top-28 p-4 absolute bg-neutral-100 w-80 h-80 rounded-md z-50'),
                    // style
                    {
                        transform: [{
                            translateX: slideAnim
                        }]
                    }
                ]}>
                    <Text style={tw('text-neutral-900 text-center font-bold text-lg')}>Settings</Text>
                    <View style={tw('pt-4')}>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Background Color: {settings.bg_color}
                            </Text>
                        </View>

                        <View style={tw('pt-4 pb-2')}>
                            <Text style={tw('text-neutral-900 font-semibold text-center')}>
                                Full Location Data
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Accuracy: {location?.coords?.accuracy}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Altitude: {location?.coords?.altitude}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Altitude Accuracy: {location?.coords?.altitudeAccuracy}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Heading: {location?.coords?.heading}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Latitude: {location?.coords?.lat}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Longitude: {location?.coords?.lon}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Speed (meters / second): {location?.coords?.speed}
                            </Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </>
    )
}