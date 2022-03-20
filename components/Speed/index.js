import { useState, useEffect, useContext } from 'react'
import {useTailwind} from 'tailwind-rn';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Compass from '../Compass'
// import SettingsButton from '../SettingsButton'
// import SettingsScreen from '../SettingsScreen'
import Settings from '../Settings'
import SettingsContext from '../../SettingsContext'

export default function Speed(props){
    const { location } = props
    const tailwind = useTailwind();
    const settings = useContext(SettingsContext)

    
    function calculateMilesPerHour(meters_per_second){
        return parseInt(meters_per_second * 2.237)
    }
    function calculateKilometersPerHour(meters_per_second){
        return parseInt(meters_per_second * 3.6)
    }
    
    const [speed, setSpeed] = useState(0)
    const [mph, setMph] = useState(0)
    const [kph, setKph] = useState(0)
    // const [showSettings, setShowSettings] = useState()

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

    // useEffect(() => {
    //     console.log('showSettings', showSettings)
    // }, [showSettings])

    return (
        <SafeAreaView style={[tailwind('h-full flex items-center justify-center'), { backgroundColor: settings.bgColor, color: settings.textColor}]}>
            <Settings location={location} />
            {/* <SettingsButton showSettings={showSettings} setShowSettings={setShowSettings} /> */}
            {/* <SettingsScreen location={location} showSettings={showSettings} setShowSettings={setShowSettings} /> */}
            <Compass location={location} />
            <View style={tailwind('z-20')}>
                <View style={tailwind('flex flex-col justify-center items-center')}>
                    <Text style={[tailwind('text-8xl font-bold'), {color: settings.textColor}]}>
                        {mph} 
                    </Text>
                {/* </View>
                <View style={tailwind('flex')}> */}
                    <Text style={[tailwind('text-4xl font-semibold'), {color: settings.textColor}]}>
                        MPH
                    </Text>
                </View>
                
            </View>
            <View style={tailwind('z-20')}>
                <View style={tailwind('flex flex-col justify-center items-center pt-4')}>
                    <Text style={[tailwind('text-5xl font-bold'), {color: settings.textColor}]}>
                        {kph} 
                    </Text>
                {/* </View>
                <View style={tailwind('flex')}> */}
                    <Text style={[tailwind('text-2xl font-semibold'), {color: settings.textColor}]}>
                        KM/H
                    </Text>
                </View>
                
            </View>
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