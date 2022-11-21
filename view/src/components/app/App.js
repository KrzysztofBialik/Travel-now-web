import './App.css';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar, Container } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobilePage, URL as MobileURL } from '../../pages/mobile-page/MobilePage';
import { StyledEngineProvider } from '@mui/material/styles';
import { isMobile } from 'react-device-detect';
import { StarterNavbar } from '../navbars/StarterNavbar';
import MyTheme from './AppTheme';
import { PublicContentRouting } from '../router/PublicContentRouting';

const MobileContent = isMobile;
const theme = MyTheme;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        {/* <div> */}
        <CssBaseline />
        {/* <Topbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} color='theme.palette.primary.light' />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} /> */}
        {/* <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      > */}
        {/* <Toolbar /> */}
        {/* <Container maxWidth={"xlx"} sx={{ mt: 4, mb: 4 }}> */}
        {MobileContent ? <MobilePage /> :
          <PublicContentRouting />}
        {/* </Container> */}
        {/* </Box> */}
        {/* </div> */}
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
