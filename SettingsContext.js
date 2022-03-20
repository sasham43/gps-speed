import { createContext } from 'react'
const SettingsContext = createContext({
    bg_color: 'rgb(153,229,178)',
    setBgColor: () => {}
})
export default SettingsContext