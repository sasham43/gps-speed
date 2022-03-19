import { useState, useEffect } from 'react'
import {useTailwind} from 'tailwind-rn';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Speed(props){
    const { location } = props
    const tailwind = useTailwind();

    const [speed, setSpeed] = useState(0)

    useEffect(() => {
        if(location?.coords && location.coords.speed){
            setSpeed(Math.round(location.coords.speed))
        }
    }, [location])

    return (
        <SafeAreaView style={tailwind('bg-teal-400 h-full flex items-center justify-center')}>
        {/* <SafeAreaView style={styles.container}> */}
            <Text style={tailwind('text-xl text-neutral-100')}>Speed {speed}</Text>
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