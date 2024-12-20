import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bem-vindo ao Escritor
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Crie ebooks incríveis com a ajuda da Inteligência Artificial
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            sx={{ mr: 2 }}
          >
            Criar Novo Ebook
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/ebooks')}
          >
            Ver Meus Ebooks
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
