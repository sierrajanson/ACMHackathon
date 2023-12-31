import * as React from 'react';
import { BrowserRouter as Route, Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import LogoCalCraft from './LogoCalCraft.png';
import { useState, useEffect } from 'react';
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';

const pages = ['home','camera', 'menu',];
const settings = ['Account'];


function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Use user instead of isLoggedIn
    const auth = getAuth(); // Get the auth instance

    useEffect(() => {
        // Set up the Firebase auth state listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // This will be null if the user is not logged in
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, [auth]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = async () => {
        try {
          localStorage.removeItem('redirected');
          await signOut(auth);
          console.log("User signed out");
        } catch (error) {
          console.error("Error signing out:", error);
        }
    };
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <img src={LogoCalCraft} style={{ maxWidth: '70px', maxHeight: '70px' }}sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    {/*}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            padding: '8px 16px 8px 36px',
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: '.15rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        
                    </Typography>
                    */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        <Box>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                component={Link}
                                to={`/${page}`}
                                color="inherit"
                                sx={{ my: 2, color: 'black', display: 'block', letterSpacing: '.3rem'}}
                            >
                                {page}
                            </Button>
                        ))}
                        </Box>
                        </Menu>
                    </Box>
                    
                   
                    
                    <img src={LogoCalCraft} style={{ maxWidth: '0px', maxHeight: '0px' }}sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    {/*}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/home"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        
                    </Typography>
                    */}
                    

                    {/* space in the middle of the page*/}

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                component={Link}
                                to={`/${page}`}
                                color="inherit"
                                sx={{ my: 2, color: 'white', display: 'block',fontFamily:'monospace',marginLeft:'15px',fontSize:"20px"}}
                                
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    
                                
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >   
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                        <Typography fontFamily={"monospace"} textAlign="center" color={"black"}>{setting}</Typography>
                                    </Link>
                                </MenuItem>))}
                            {user ? (
                                <MenuItem key="logout" onClick={() => { handleSignOut() }}>
                                    <Typography fontFamily={"monospace"} textAlign="center" color={"black"}>Logout</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem key="login" onClick={() => { navigate("/signIn") }}>
                                    <Typography fontFamily={"monospace"} textAlign="center" color={"black"}>Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                    
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
