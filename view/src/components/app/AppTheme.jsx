import { createTheme } from "@mui/material";


const MyTheme = createTheme({
    // components: {
    //     MuiIcon: {
    //         defaultProps: {
    //             // Replace the `material-icons` default value.
    //             baseClassName: 'material-icons-round',
    //         },
    //     },
    // },
    palette: {
        background: {
            default: "#F0F2F5"
        },
        primary: {
            main: '#2ab7ca',
            light: '#55ccd9',
            dark: '#24939e',
        },
        primaryTransparent: {
            main: '#6655CCD9',
        },
        secondary: {
            main: '#ffc928',
            light: '#ffe082',
            dark: '#ffb201',
        },
        secondaryTransparent: {
            main: '#66FFE082',
        },
        grey100: {
            main: '#f8f9fa'
        },
        grey200: {
            main: '#868e96'
        },
        grey300: {
            main: '#e9ecef'
        },
        grey400: {
            main: '#dee2e6'
        },
        grey700: {
            main: '#868e96'
        },
        grey900: {
            main: '#343a40'
        },
        black: {
            main: '#FF000000'
        },
        blackSemiTransparent: {
            main: '#80000000'
        },
        blackTransparent: {
            main: '#1A000000'
        },
        white: {
            main: '#FFFFFFFF'
        },
        whiteRipple: {
            main: '#FFFFFFFF'
        },
        transparent: {
            main: '#00FFFFFF'
        },
        redRipple: {
            main: '#33DD2C00'
        },
        red: {
            main: '#FFDD2C00'
        },
        green: {
            main: '#00DA14'
        },
        yellow: {
            main: '#FFF200'
        }
    }
})

export default MyTheme;