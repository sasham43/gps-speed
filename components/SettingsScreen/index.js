import React, { useState, useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTailwind } from 'tailwind-rn'
// import Animated, {  useSharedValue,  useAnimatedStyle,  withTiming,    runOnJS,  useDerivedValue,} from 'react-native-reanimated';

export default function SettingsScreen(props){
    const { showSettings } = props
    const tw = useTailwind()

    const slideAnim = useRef(new Animated.Value(-2000)).current

    
    useEffect(() => {
        const slideIn = () => {
            // Will change slideAnim value to 1 in 5 seconds
            Animated.timing(slideAnim, {
            toValue: 10,
            duration: 5000,
            useNativeDriver: true,
            }).start();
        };
    
        const slideOut = () => {
            // Will change slideAnim value to 0 in 3 seconds
            Animated.timing(slideAnim, {
            toValue: -2000,
            duration: 3000,
            useNativeDriver: true,
            }).start();
        };
        // if(showSettings === true){
        //     tx.value = 10
        // }
        if(showSettings.current === true){
            slideIn()
        } else {
            slideOut()
        }

    }, [showSettings])

    // const tx = useSharedValue(10)
    // // const tx = useSharedValue(-2000)

    

    // const style = useAnimatedStyle(() => {    
    //     return {      
    //         // width: withTiming(width.value, {        
    //         //     duration: 500,        
    //         //     easing: Easing.bezier(0.25, 0.1, 0.25, 1),      
    //         // }), 
    //         transform: [{
    //             translateX: withTiming(tx.value, {
    //                 duration: 500,
    //                 // easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    //             })
    //         }]   
    //     };  
    // });

    // useDerivedValue(() => {    runOnJS(style)(tx.value);  });
    

    return (
        <>
            <Animated.View style={[
                tw('border border-neutral-100 p-40 absolute'),
                // style
                {
                    transform: [{
                        translateX: slideAnim
                    }]
                }
            ]}>
                <Text>Settings Screen</Text>
            </Animated.View>
        </>
    )
}