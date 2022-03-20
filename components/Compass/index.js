import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {useTailwind} from 'tailwind-rn';
import SettingsContext from '../../SettingsContext'

export default function Compass(props){
    const { location } = props
    const tw = useTailwind()

    const settings = useContext(SettingsContext)

    const [heading, setHeading] = useState(-45)
    const [headingText, setHeadingText] = useState('N')

    useEffect(() => {
        if(location?.coords?.heading){
            let heading = parseInt(location.coords.heading)
            if(heading > 0){
                heading = heading - 45 // account for div being sideways
                setHeading(heading)
            }
        }
    }, [location])

    useEffect(() => {
        let txt = ''
        let fullHeading = heading > 0 ? heading : heading * -1
        fullHeading += 45 // account for div being sideways

        // console.log('n', fullHeading >= 0 && fullHeading <= 45)
        // console.log('ne', fullHeading >= 46 && fullHeading <= 89)

        if(fullHeading >= 0 && fullHeading <= 45){
            txt = 'N'
        } else if (fullHeading >= 46 && fullHeading <= 89){
            txt = 'NE'
        } else if (fullHeading >= 90 && fullHeading <= 124){
            txt = 'E'
        } else if (fullHeading >= 125 && fullHeading <= 179){
            txt = 'SE'
        } else if (fullHeading >= 180 && fullHeading <= 224){
            txt = 'S'
        } else if (fullHeading >= 225 && fullHeading <= 269){
            txt = 'SW'
        } else if (fullHeading >= 270 && fullHeading <= 314){
            txt = 'W'
        } else if (fullHeading >= 315 && fullHeading <= 360){
            txt = 'NW'
        }

        setHeadingText(txt)
    }, [heading])

    return (
        <>
            <View style={tw('absolute top-14 right-8')}>
                <View style={[styles.compass, {borderColor: settings.textColor}]}>
                    <View 
                        style={[
                        styles.indicator, 
                        { 
                            transform: [{
                                    rotate: `${heading}deg`
                            }],
                            borderColor: settings.textColor
                        }]}
                    ></View>
                </View>
                <View style={tw('flex justify-center w-full pt-2')}>
                    <Text style={[tw('text-neutral-100 text-xl font-bold text-center'), {color: settings.textColor}]}>{headingText}</Text>
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