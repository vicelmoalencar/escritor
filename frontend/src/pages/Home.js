import React from 'react';
import { Typography, Button, Box, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Book as BookIcon, Add as AddIcon } from '@mui/icons-material';

function Home() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo ao Escritor
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          Crie e gerencie seus e-books de forma simples e intuitiva
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={() => navigate('/create')}
          sx={{ mt: 2 }}
        >
          Criar Novo E-book
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BookIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Meus E-books</Typography>
            </Box>
            <Typography paragraph>
              Acesse e gerencie todos os seus e-books em um só lugar.
              Organize capítulos, faça edições e acompanhe o progresso.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/ebooks')}
            >
              Ver E-books
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AddIcon sx={{ mr: 1 }} color="primary" />
              <Typography variant="h6">Novo Projeto</Typography>
            </Box>
            <Typography paragraph>
              Comece um novo projeto agora mesmo. Nossa IA ajuda você
              a criar conteúdo de qualidade rapidamente.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => navigate('/create')}
            >
              Criar Novo
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
