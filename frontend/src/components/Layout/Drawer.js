import React from 'react';
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  Book as BookIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Meus E-books', icon: <BookIcon />, path: '/ebooks' },
  { text: 'Criar Novo', icon: <AddIcon />, path: '/create' },
];

function Drawer({ open, onClose }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <MuiDrawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List sx={{ width: 250 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
