import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn'
import { Octicons } from '@expo/vector-icons'

export default function SettingsButton(props){
    const tw = useTailwind()
    return (
        <>
            <View style={tw('border-neutral-100 absolute top-14 left-8')}>
                {/* <Text style={tw('text-neutral-100 text-4xl')}>Settings</Text> */}
                <Octicons name={'gear'} size={40} color={'white'} />
            </View>
        </>
    )
}