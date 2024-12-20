import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import CreateEbook from './pages/CreateEbook';
import EbookList from './pages/EbookList';
import EditEbook from './pages/EditEbook';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEbook />} />
          <Route path="/ebooks" element={<EbookList />} />
          <Route path="/ebooks/:id" element={<EditEbook />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
