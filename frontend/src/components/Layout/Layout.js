import React, { useState } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import AppBar from './AppBar';
import Drawer from './Drawer';

function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar onMenuClick={handleDrawerToggle} />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          width: '100%'
        }}
      >
        <Toolbar /> {/* Espaçamento para o AppBar fixo */}
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
