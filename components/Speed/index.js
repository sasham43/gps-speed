import { useState, useEffect } from 'react'
import {useTailwind} from 'tailwind-rn';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Compass from '../Compass'

export default function Speed(props){
    const { location } = props
    const tailwind = useTailwind();

    const [speed, setSpeed] = useState(0)

    useEffect(() => {
        if(location?.coords && location.coords.speed){
            let speed = location.coords.speed
            if(speed > 0){
                setSpeed(Math.round(location.coords.speed))
            } else {
                setSpeed(0)
            }
        }
    }, [location])

    return (
        <SafeAreaView style={tailwind('bg-pantone-352 h-full flex items-center justify-center')}>
            <Compass location={location} />
        {/* <SafeAreaView style={styles.container}> */}
            <Text style={tailwind('text-4xl text-neutral-100')}>Speed {speed}</Text>
            {/* <Text>
                {JSON.stringify(location)}
            </Text> */}
        </SafeAreaView>
    )
};

// const styles = StyleSheet.create({
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // height: '100vh'
//         flex: 1,
//         height: 300,
//     }
// })