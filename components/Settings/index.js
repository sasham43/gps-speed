import React, { useState, useEffect, useRef, useContext } from 'react'

import { StyleSheet, Text, View, Animated, TouchableOpacity, FlatList } from 'react-native';
import { useTailwind } from 'tailwind-rn'
// import SettingsButton from '../SettingsButton'
// import SettingsScreen from '../SettingsScreen'
import SettingsContext from '../../SettingsContext'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

import { Octicons } from '@expo/vector-icons'

export default function Settings(props){
    const { location } = props
    const tw = useTailwind()

    const [showSettings, setShowSettings] = useState()
    const settings = useContext(SettingsContext)
    const slideAnim = useRef(new Animated.Value(-1000)).current


    // const showSettings = useRef()
    function openSettingsScreen(){
        // console.log('open')
        setShowSettings(true)
        // showSettings.current = true
    }
    function closeSettingsScreen(){
        // console.log('close')
        setShowSettings(false)
        // showSettings.current = false
    }
    function toggleSettingsScreen(){
        // console.log('toggle', showSettings)
        if(showSettings) {
            closeSettingsScreen()
        } else {
            openSettingsScreen()
        }
    }

    function selectColor(color){
        console.log('color', color)
        settings.setBgColor(color)
    }
    
    useEffect(() => {
        const slideIn = () => {
            // Will change slideAnim value to 1 in 5 seconds
            Animated.timing(slideAnim, {
                toValue: 25,
                duration: 800,
                useNativeDriver: true,
            }).start();

        };
    
        const slideOut = () => {
            // Will change slideAnim value to 0 in 3 seconds
            Animated.timing(slideAnim, {
                toValue: -1000,
                duration: 500,
                useNativeDriver: true,
            }).start();

        };

        if(showSettings === true){
            slideIn()
        } else {
            slideOut()
        }

    }, [showSettings])

    function renderItem({item}){
        // console.log('render', item.color)
        return (
            <View style={tw(`flex flex-row`)}>
                {
                    item.color.map((color, color_index)=>{
                        let blockStyle = {backgroundColor: item.css[color_index]}
                        return (
                            <TouchableOpacity onPress={() => selectColor(item.css[color_index])} style={[tw(`h-8 w-8`), blockStyle]} key={`${color}-${color_index}`}>
                                
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    // console.log('type',  fullConfig.theme.colors.pink['100'])

    const [colorData, setColorData] = useState([])

    useEffect(() => {
        setColorData(generateData())
    }, [])

    // let colorArray = new Array(fullConfig?.theme?.colors)

    // let fullConfig = {
    //     theme: {
    //         colors: {
    //             pink: {
    //                 '100': 'value',
    //                 '200': 'value',
    //                 '300': 'value',
    //                 '400': 'value',
    //                 '500': 'value',
    //                 '600': 'value',
    //                 '700': 'value',
    //                 '800': 'value',
    //                 '900': 'value',
    //             }
    //         }
    //     }
    // }
    function generateData(){
        const data = []

        let counter = 0
        for (let color in fullConfig?.theme?.colors){
            let forbidden = [
                'inherit',
                'current',
                'transparent'
            ]
            if(!forbidden.includes(color) ){

                let colorArray = []
                let cssArray = []
                for(let num in fullConfig?.theme.colors[color]){
                    // console.log('num', num)
                    colorArray.push(num)
                    cssArray.push(fullConfig?.theme.colors[color][num])
                }



                data.push({
                    id: counter,
                    color: colorArray,
                    css: cssArray,
                    name: color
                })
                counter++

            }
        }

        return data
    }

    // console.log('data', data)

    // const data = fullConfig?.theme?.colors?.filter(color=>{
    // const data = colorArray.filter(color=>{
    //     return color != 'transparent' && color != 'inherit' && color != 'current'
    // }).map((color, index) => {
    //     console.log('a color', (color))
    //     return {
    //         id: index,
    //         color: color
    //     }
    // })

    // console.log('location', location)
    // console.log('defaultTheme', Object.keys(defaultTheme.colors), defaultTheme.colors('neutral'))
    // console.log('defaultTheme', JSON.stringify(defaultTheme.colors))
    // console.log('defaultTheme', Object.keys(fullConfig.theme.colors))

    return (
        <>
            <View style={tw('border border-neutral-100 absolute top-0 left-0 z-50')}>
                <TouchableOpacity style={tw('border-neutral-100 absolute top-14 left-8')} onPress={() => toggleSettingsScreen()}>
                    <Octicons name={'gear'} size={40} color={'white'} />
                </TouchableOpacity>
            {/* <SettingsButton 
                showSettings={showSettings} 
                // setShowSettings={setShowSettings} 
            /> */}



            {/* <SettingsScreen 
                showSettings={showSettings} 
                // setShowSettings={setShowSettings} 
            /> */}
                <Animated.View style={[
                    tw('border border-neutral-100 top-32 p-4 absolute bg-neutral-100 w-80 rounded-md z-50 overflow-hidden'),
                    // style
                    {
                        transform: [{
                            translateX: slideAnim
                        }],
                        height: 650
                    }
                ]}>
                    <Text style={tw('text-neutral-900 text-center font-bold text-lg')}>Settings</Text>
                    <View style={tw('pt-4')}>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Background Color: {settings.bg_color}
                            </Text>
                        </View>

                        <View>
                            <FlatList
                                data={colorData}
                                // data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            ></FlatList>
                        </View>

                        {/* <View style={tw('pt-4 pb-2')}>
                            <Text style={tw('text-neutral-900 font-semibold text-center')}>
                                Full Location Data
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Accuracy: {location?.coords?.accuracy}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Altitude: {location?.coords?.altitude}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Altitude Accuracy: {location?.coords?.altitudeAccuracy}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Heading: {location?.coords?.heading}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Latitude: {location?.coords?.lat}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Longitude: {location?.coords?.lon}
                            </Text>
                        </View>
                        <View>
                            <Text style={tw('text-neutral-900')}>
                                Speed (meters / second): {location?.coords?.speed}
                            </Text>
                        </View> */}
                    </View>
                </Animated.View>
            </View>
        </>
    )
}