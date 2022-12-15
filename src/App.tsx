import React, {useEffect, useState} from 'react';
import { ThemeProvider, createTheme} from "@mui/material";
import {darkMode, lightMode} from "./app.constants";
import HomePage from "./pages/homePage";


const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: lightMode.PRIMARY
        },
        secondary: {
            main: lightMode.SECONDARY
        }
    },
    typography: {
        fontFamily: "'Roboto Mono', monospace",
        allVariants: {
            color: lightMode.TEXT_PRIMARY
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: darkMode.PRIMARY
        },
        secondary: {
            main: darkMode.SECONDARY
        }
    },
    typography: {
        fontFamily: "'Roboto Mono', monospace",
        allVariants: {
            color: darkMode.TEXT_PRIMARY
        }
    }
});

function App(props: any) {
    const [darkMode, setDarkMode] = useState(false);
    const [theme, setTheme] = useState(lightTheme);

    useEffect(()=>{
        setTheme(darkMode ? darkTheme : lightTheme)
    }, [darkMode])

    const toggleDarkMode = () =>{
        setDarkMode(!darkMode);
    }

  return (
        <ThemeProvider theme={theme}>
            <HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        </ThemeProvider>
  );
}

export default App;
