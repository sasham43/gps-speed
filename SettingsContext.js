import { createContext } from 'react'
const SettingsContext = createContext({
    bg_color: 'pantone-344',
    setBgColor: () => {}
})
export default SettingsContext