import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {useTailwind} from 'tailwind-rn';

export default function Compass(props){
    const { location } = props
    const tw = useTailwind()

    const [heading, setHeading] = useState(0)

    useEffect(() => {
        if(location?.coords?.heading){
            console.log('compass heading', location.coords.heading)
                let heading = parseInt(location.coords.heading)
                heading = heading > 0 ? heading - 45 : -45
                // heading = heading - 45 // account for div being sideways
                setHeading(heading)
        }
    }, [location])

    return (
        <>
            <View style={{}}>
                <Text>{heading}</Text>
                <View style={[
                    styles.compass, 
                    {
                        transform: [{
                                rotate: `${heading}deg`
                        }]
                    }]}></View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    compass: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: '#F5F5F5', // need better way of doing this
        height: 10,
        width: 10,
    }
})