import { createTheme } from '@mui/material'

const mainColor = '#6eb5aa'
export const bgColor = '#f1f2f4'
export const fontColor = '#525f7f'

export const theme = createTheme({
    palette: {
        secondary: {
            // This is green.A700 as hex.
            main: mainColor,
            contrastText: '#fff',
        },
    },
})
