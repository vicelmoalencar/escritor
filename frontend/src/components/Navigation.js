import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
          Escritor
        </Typography>
        <Button color="inherit" component={Link} to="/create">
          Criar Ebook
        </Button>
        <Button color="inherit" component={Link} to="/ebooks">
          Meus Ebooks
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
