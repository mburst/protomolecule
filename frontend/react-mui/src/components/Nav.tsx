import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MUILink from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch, RootState } from '../store';

export default function Nav() {
  const dispatch = useDispatch<Dispatch>();

  const { loading } = useSelector((state: RootState) => state.loading.effects.user.loadUser);
  const email = useSelector((state: RootState) => state.user.email);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <MUILink underline="none" variant="button" color="inherit" component={Link} to="/">
              React MUI
            </MUILink>
          </Box>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : email ? (
            <>
              <Box mr={2}>
                <Typography variant="button" component="p">
                  Welcome {email}
                </Typography>
              </Box>
              <Box>
                <Button onClick={dispatch.user.logout} variant="contained" color="secondary" size="small">
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
