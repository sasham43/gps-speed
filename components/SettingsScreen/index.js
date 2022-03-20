import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn'

export default function SettingsScreen(props){
    const tw = useTailwind()
    return (
        <>
            <View style={tw('border border-neutral-100')}>
                <Text>Settings Screen</Text>
            </View>
        </>
    )
}