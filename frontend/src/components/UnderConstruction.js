import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderConstruction = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <ConstructionIcon sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Página em Desenvolvimento
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 2 }}>
          Estamos trabalhando duro para trazer novas funcionalidades incríveis para você!
        </Typography>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Em breve você poderá:
          </Typography>
          <Typography component="ul" sx={{ mt: 1, textAlign: 'left' }}>
            <li>Criar e-books profissionais</li>
            <li>Gerenciar seus projetos</li>
            <li>Exportar em diferentes formatos</li>
            <li>Colaborar com outros autores</li>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default UnderConstruction;
