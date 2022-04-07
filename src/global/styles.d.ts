// this file overwrites types
// in this case it will overwrite a type of styled-components

import 'styled-component'
import theme from './theme'

declare module 'styled-components' {
    //access the styled-components module
    type ThemeType = typeof theme

    export interface DefaultTheme extends ThemeType {} // add the ThemeType on DefaultTheme
}