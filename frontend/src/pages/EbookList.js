import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EbookList() {
  const navigate = useNavigate();
  const [ebooks, setEbooks] = useState([]);

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ebooks/');
      setEbooks(response.data);
    } catch (error) {
      console.error('Error fetching ebooks:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meus Ebooks
        </Typography>
        <Grid container spacing={3}>
          {ebooks.map((ebook) => (
            <Grid item xs={12} sm={6} md={4} key={ebook.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {ebook.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ebook.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/ebooks/${ebook.id}`)}
                  >
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        {ebooks.length === 0 && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body1" gutterBottom>
              Você ainda não tem nenhum ebook.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/create')}
              sx={{ mt: 2 }}
            >
              Criar Primeiro Ebook
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default EbookList;
