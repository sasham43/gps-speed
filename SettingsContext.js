import { createContext } from 'react'
const SettingsContext = createContext({
    bgColor: 'rgb(153,229,178)',
    textColor: '#F5F5F5',
    setBgColor: () => {}
})
export default SettingsContext