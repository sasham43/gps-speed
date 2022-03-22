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
    
    let xValue = -350
    const slideAnim = useRef(new Animated.Value(xValue)).current

    function openSettingsScreen(){
        setShowSettings(true)
    }
    function closeSettingsScreen(){
        setShowSettings(false)
    }
    function toggleSettingsScreen(){
        if(showSettings) {
            closeSettingsScreen()
        } else {
            openSettingsScreen()
        }
    }
    
    useEffect(() => {
        const slideIn = () => {
            Animated.timing(slideAnim, {
                toValue: 25,
                duration: 800,
                useNativeDriver: true,
            }).start();

        };
    
        const slideOut = () => {
            Animated.timing(slideAnim, {
                toValue: xValue,
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

    function renderItem({item, index}){
        return (
            <View style={tw(`flex flex-row relative p-1 pl-0 rounded`)}>
                <View style={tw('absolute top-3 z-40')}>
                    <Text>{item.name}</Text>
                </View>
                {
                    item.color.map((color, color_index)=>{
                        let bgColor = item.name.includes('pantone') ? item.css.join('') : item.css[color_index]
                        let blockStyle = {backgroundColor: bgColor}
                        return (
                            <TouchableOpacity onPress={() => selectColor(bgColor)} style={[tw(`h-8 w-8`), blockStyle]} key={`${color}-${color_index}`}>
                                
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    const [colorData, setColorData] = useState([])
    const [showColorPicker, setShowColorPicker] = useState(false)

    function toggleColorPicker(){
        setShowColorPicker(!showColorPicker)
    }
    function selectColor(color){
        settings.setBgColor(color)
        let text_color = pickTextColor(color, '#F5F5F5', '#171717')
        settings.setTextColor(text_color)
    }

    useEffect(() => {
        setColorData(generateData())
    }, [])

    function generateData(){
        const data = []

        let counter = 0
        for (let color in fullConfig?.theme?.colors){
            let forbidden = [
                'inherit',
                'current',
                'transparent',
                'black',
                'white',
            ]
            if(!forbidden.includes(color) ){
                let colorArray = []
                let cssArray = []
                for(let num in fullConfig?.theme.colors[color]){
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
    let iconStyle = {color: settings.textColor}

    return (
        <>
            <View style={tw('border border-neutral-100 absolute top-0 left-0 z-50')}>
                <TouchableOpacity style={tw('border-neutral-100 absolute top-14 left-8')} onPress={() => toggleSettingsScreen()}>
                    <CompassIcon iconStyle={iconStyle} />
                </TouchableOpacity>
                
                <Animated.View style={[
                    tw('border border-neutral-100 top-32 p-4 absolute bg-neutral-100 w-80 rounded-md z-50 overflow-hidden'),
                    {
                        transform: [{
                            translateX: slideAnim
                        }],
                        height: 650
                    }
                ]}>
                    <Text style={tw('text-neutral-900 text-center font-bold text-lg')}>Settings</Text>
                    <View style={tw('mt-4 border border-neutral-900 rounded h-12')}>
                        <TouchableOpacity style={[tw('flex flex-row items-center justify-between pl-1 font-bold')]} onPress={() => toggleColorPicker()}>
                                <Text style={tw('text-neutral-900')}>
                                    Background Color
                                </Text>
                                <View style={[tw('rounded flex items-center justify-center'), {backgroundColor: settings.bgColor, height: 46, width: 46}]}>
                                    <PencilIcon iconStyle={iconStyle} />
                                </View>
                        </TouchableOpacity>

                        {showColorPicker && 
                            <Animated.View style={[tw('flex h-96 z-50')]}>
                                <FlatList
                                    data={colorData}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                ></FlatList>
                            </Animated.View>
                        }

                        <LocationValues location={location} />
                    </View>
                </Animated.View>
            </View>
        </>
    )
}

function CompassIcon({ iconStyle }){
    return (
        <Octicons name={'gear'} size={40} color={iconStyle.color} />
    )
}
function PencilIcon({ iconStyle }){
    return (
        <Octicons name={'pencil'} size={30} color={iconStyle.color} />
    )
}

function LocationValues({location}){
    return (
        <>
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
        </>
    )
}


function pickTextColor(bgColor, lightColor, darkColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}