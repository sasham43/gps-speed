import React, { useState, useEffect } from 'react'

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn'

export default function SettingsScreen(props){
    const { showSettings } = props
    const tw = useTailwind()

    const [tx, setTx] = useState(-2000)

    useEffect(() => {
        if(showSettings){
            setTx(10)
        } else {
            setTx(-2000)
        }
    }, [showSettings])

    return (
        <>
            <View style={[
                tw('border border-neutral-100 p-40 absolute'),
                {
                    transform: [{
                        translateX: tx
                    }]
                }
            ]}>
                <Text>Settings Screen</Text>
            </View>
        </>
    )
}