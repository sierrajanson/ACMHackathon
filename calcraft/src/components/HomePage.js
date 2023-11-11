import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
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
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import LogoCalCraft from './LogoCalCraft.png';
// import logo from '/.logo.png';

const HomePage = () => {
  return (
    <div>
      <Typography
        variant="h4"
        noWrap
        component="a"
        href="/home"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          fontSize: '50px',
        }}
      >
        WHAT IS CAL CRAFT?</Typography>
      {
        <div>
          <h3> Insulin Injestion Quantity Calculator. </h3>
          <p>
            Opt to either take a photo of the food you'll consume,<br></br>
            or select through our friendly menu, and we'll output the <br></br>
            number of insulin units you need <br></br>to return to a health blood glucose range!
          </p>
        </div>

      }
    </div>
  );
};

export default HomePage;