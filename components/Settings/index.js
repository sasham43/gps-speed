import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn'
import SettingsButton from '../SettingsButton'
import SettingsScreen from '../SettingsScreen'

export default function Settings(props){
    // const { showSettings } = props
    const tw = useTailwind()

    const [showSettings, setShowSettings] = useState()

    // const [tx, setTx] = useState(-2000)

    // useEffect(() => {
    //     if(showSettings){
    //         setTx(10)
    //     } else {
    //         setTx(-2000)
    //     }
    // }, [showSettings])

    return (
        <>
            <View style={tw('border border-neutral-100 absolute top-0 left-0')}>
                {/* <Text>Settings</Text> */}
                
            <SettingsButton showSettings={showSettings} setShowSettings={setShowSettings} />
            <SettingsScreen showSettings={showSettings} setShowSettings={setShowSettings} />
            </View>
        </>
    )
}