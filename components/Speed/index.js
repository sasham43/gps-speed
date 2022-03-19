import {useTailwind} from 'tailwind-rn';
import { StyleSheet, Text, View } from 'react-native';

export default function Speed(){
    const tailwind = useTailwind();

    return <Text style={tailwind('text-teal-400')}>Hello world</Text>;
};