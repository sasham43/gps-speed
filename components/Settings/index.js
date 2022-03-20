import React, { useState, useEffect, useRef } from 'react'

import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn'
import SettingsButton from '../SettingsButton'
import SettingsScreen from '../SettingsScreen'

import { Octicons } from '@expo/vector-icons'

export default function Settings(props){
    // const { showSettings } = props
    const tw = useTailwind()

    const [showSettings, setShowSettings] = useState()
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

    // const [tx, setTx] = useState(-2000)

    // useEffect(() => {
    //     if(showSettings){
    //         setTx(10)
    //     } else {
    //         setTx(-2000)
    //     }
    // }, [showSettings])
    const slideAnim = useRef(new Animated.Value(-2000)).current

    
    useEffect(() => {
        const slideIn = () => {
            // Will change slideAnim value to 1 in 5 seconds
            Animated.timing(slideAnim, {
            toValue: 10,
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
        // if(showSettings === true){
        //     tx.value = 10
        // }
        if(showSettings === true){
            slideIn()
        } else {
            slideOut()
        }
        // if(showSettings.current === true){
        //     slideIn()
        // } else {
        //     slideOut()
        // }

    }, [showSettings])

    return (
        <>
            <View style={tw('border border-neutral-100 absolute top-0 left-0')}>
                {/* <Text>Settings</Text> */}
                <TouchableOpacity style={tw('border-neutral-100 absolute top-14 left-8')} onPress={() => toggleSettingsScreen()}>
                    {/* <Text style={tw('text-neutral-100 text-4xl')}>Settings</Text> */}
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
                    tw('border border-neutral-100 top-20 p-40 absolute'),
                    // style
                    {
                        transform: [{
                            translateX: slideAnim
                        }]
                    }
                ]}>
                    <Text>Settings Screen</Text>
                </Animated.View>
            </View>
        </>
    )
}