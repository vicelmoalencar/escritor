import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function AppBar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Escritor
        </Typography>

        <Button 
          color="inherit" 
          onClick={() => navigate('/create')}
        >
          Novo E-book
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
