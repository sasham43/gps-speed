import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn'
import { Octicons } from '@expo/vector-icons'

export default function SettingsButton(props){
    let { showSettings, setShowSettings } = props
    const tw = useTailwind()

    function openSettingsScreen(){
        console.log('open')
        // setShowSettings(true)
        showSettings.current = true
    }
    function closeSettingsScreen(){
        console.log('close')
        // setShowSettings(false)
        showSettings.current = false
    }
    function toggleSettingsScreen(){
        console.log('toggle', showSettings)
        if(showSettings) {
            openSettingsScreen()
        } else {
            closeSettingsScreen()
        }
    }
    return (
        <>
            <TouchableOpacity style={tw('border-neutral-100 absolute top-14 left-8')} onPress={() => toggleSettingsScreen()}>
                {/* <Text style={tw('text-neutral-100 text-4xl')}>Settings</Text> */}
                <Octicons name={'gear'} size={40} color={'white'} />
            </TouchableOpacity>
        </>
    )
}