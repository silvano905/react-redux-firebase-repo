
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectUser} from "../redux/user/userSlice";
import {auth} from "../config-firebase/firebase";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import PublicIcon from '@mui/icons-material/Public';

const Navbar = () => {
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const logoutOfApp = () => {
        dispatch(logout())
        auth.signOut().then()
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            {user?
                <>
                    <MenuItem onClick={handleMenuClose}>
                        <Typography variant="h6" gutterBottom>
                            <Link to='/account' style={{color: 'blue', textDecoration: 'none'}}>
                                Account
                            </Link>
                        </Typography>
                    </MenuItem>
                </>
                :
                <>
                    <MenuItem onClick={handleMenuClose}>
                        <Typography variant="h6" gutterBottom>
                            <Link to='/login' style={{color: 'blue', textDecoration: 'none'}}>
                                Login
                            </Link>
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <Typography variant="h6" gutterBottom>
                            <Link to='/register' style={{color: 'blue', textDecoration: 'none'}}>
                                Register
                            </Link>
                        </Typography>
                    </MenuItem>
                </>

            }


            {user?
                <MenuItem onClick={handleMenuClose}>
                    <Button type="submit" variant="contained" color="primary" onClick={logoutOfApp}>logout</Button>
                </MenuItem>
                :
                null
            }



        </Menu>
    );

    const registered = (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar style={{background: '#EEEEEE'}}>
                    <Link to="/" style={{color: 'black', textDecoration: 'none'}}>
                        <PublicIcon/>
                    </Link>
                    <Link to="/" style={{color: 'black', textDecoration: 'none', marginLeft: 10}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            style={{fontFamily: 'Cinzel, serif'}}
                        >
                            Blog
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />

                    {user?
                        <>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Typography variant="h6" gutterBottom>
                                <Link to='/account' style={{color: 'blue', textDecoration: 'none'}}>
                                    Account
                                </Link>
                            </Typography>
                        </Box>
                        </>
                        :
                        <>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Typography variant="h6" gutterBottom>
                                <Link to='/login' style={{color: 'blue', textDecoration: 'none', marginRight: 5}}>
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Typography variant="h6" gutterBottom>
                                <Link to='/register' style={{color: 'blue', textDecoration: 'none', marginRight: 5}}>
                                    Register
                                </Link>
                            </Typography>
                        </Box>
                        </>

                    }


                    {user?
                        <Button type="submit" variant="contained" color="primary" onClick={logoutOfApp}>logout</Button>
                        :
                        null
                    }

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                            style={{color: 'blue'}}

                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    )
    return (
        <Fragment>{registered}</Fragment>
    );
}


export default Navbar;