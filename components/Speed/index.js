import { useState, useEffect } from 'react'
import {useTailwind} from 'tailwind-rn';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Compass from '../Compass'
import SettingsButton from '../SettingsButton'
import SettingsScreen from '../SettingsScreen'

export default function Speed(props){
    const { location } = props
    const tailwind = useTailwind();

    function calculateMilesPerHour(meters_per_second){
        return meters_per_second * 2.237
    }
    function calculateKilometersPerHour(meters_per_second){
        return meters_per_second * 3.6
    }

    const [speed, setSpeed] = useState(0)
    const [mph, setMph] = useState(0)
    const [kph, setKph] = useState(0)

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

    useEffect(() => {
        setMph(calculateMilesPerHour(speed))
        setKph(calculateKilometersPerHour(speed))
    }, [speed])

    return (
        <SafeAreaView style={tailwind('bg-pantone-352 h-full flex items-center justify-center')}>
            <SettingsButton location={location} />
            <Compass location={location} />
            <Text style={tailwind('text-4xl text-neutral-100')}>
                <View style={tailwind('flex flex-col justify-center items-center')}>
                    <Text style={tailwind('text-8xl font-bold text-neutral-100')}>
                        {speed} 
                    </Text>
                {/* </View>
                <View style={tailwind('flex')}> */}
                    <Text style={tailwind('text-4xl font-semibold text-neutral-100')}>
                        MPH
                    </Text>
                </View>
                
            </Text>
            <Text style={tailwind('text-2xl text-neutral-100')}>
                <View style={tailwind('flex flex-col justify-center items-center pt-4')}>
                    <Text style={tailwind('text-5xl font-bold text-neutral-100')}>
                        {speed} 
                    </Text>
                {/* </View>
                <View style={tailwind('flex')}> */}
                    <Text style={tailwind('text-2xl font-semibold text-neutral-100')}>
                        KM/H
                    </Text>
                </View>
                
            </Text>
            {/* <Text style={tailwind('text-xl text-neutral-100')}>{speed} m/s</Text> */}
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