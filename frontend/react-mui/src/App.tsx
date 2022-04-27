import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import useNotifier from './hooks/useNotifier';
import { Paths } from './Routes';
import { Dispatch } from './store';

function App() {
  useNotifier();
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch.user.loadUser();
  }, [dispatch.user]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Nav />
        <Paths />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
