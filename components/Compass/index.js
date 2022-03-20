import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {useTailwind} from 'tailwind-rn';

export default function Compass(props){
    const { location } = props
    const tw = useTailwind()

    const [heading, setHeading] = useState(-45)

    useEffect(() => {
        if(location?.coords?.heading){
            let heading = parseInt(location.coords.heading)
            if(heading > 0){
                heading = heading - 45 // account for div being sideways
                setHeading(heading)
            }
        }
    }, [location])

    return (
        <>
            <View style={tw(`absolute top-14 right-8`)}>
                <View style={styles.compass}>
                    {/* <Text>{heading}</Text> */}
                    <View style={[
                        styles.indicator, 
                        { 
                            transform: [{
                                    rotate: `${heading}deg`
                            }]
                        }]}></View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    indicator: {
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: '#F5F5F5', // need better way of doing this
        height: 10,
        width: 10,
    },
    compass: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})