import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function EditEbook() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEbook();
  }, [id]);

  const fetchEbook = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/ebooks/${id}`);
      setEbook(response.data);
      if (response.data.chapters) {
        setChapters(response.data.chapters);
      }
    } catch (error) {
      console.error('Error fetching ebook:', error);
    }
  };

  const generateChapters = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/generate-chapters/${id}`);
      setChapters(response.data.chapters);
    } catch (error) {
      console.error('Error generating chapters:', error);
    }
    setLoading(false);
  };

  const generateTopics = async (chapterId) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:8000/generate-topics/${chapterId}`);
      setTopics({
        ...topics,
        [chapterId]: response.data.topics,
      });
    } catch (error) {
      console.error('Error generating topics:', error);
    }
    setLoading(false);
  };

  const handleAcceptChapter = async (chapterId, accept) => {
    try {
      await axios.put(`http://localhost:8000/chapters/${chapterId}/accept`, { accept });
      fetchEbook();
    } catch (error) {
      console.error('Error accepting/rejecting chapter:', error);
    }
  };

  const handleAcceptTopic = async (topicId, accept) => {
    try {
      await axios.put(`http://localhost:8000/topics/${topicId}/accept`, { accept });
      fetchEbook();
    } catch (error) {
      console.error('Error accepting/rejecting topic:', error);
    }
  };

  if (!ebook) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {ebook.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {ebook.description}
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Capítulos
          </Typography>
          {chapters.length === 0 && (
            <Button
              variant="contained"
              onClick={generateChapters}
              disabled={loading}
            >
              Gerar Capítulos
            </Button>
          )}
          <List>
            {chapters.map((chapter) => (
              <Paper key={chapter.id} sx={{ mb: 2, p: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={chapter.title}
                    secondary={
                      <>
                        <IconButton
                          color="success"
                          onClick={() => handleAcceptChapter(chapter.id, true)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleAcceptChapter(chapter.id, false)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </>
                    }
                  />
                </ListItem>
                {chapter.is_accepted && (
                  <Box sx={{ ml: 4 }}>
                    {!topics[chapter.id] && (
                      <Button
                        variant="outlined"
                        onClick={() => generateTopics(chapter.id)}
                        disabled={loading}
                        size="small"
                      >
                        Gerar Tópicos
                      </Button>
                    )}
                    {topics[chapter.id] && (
                      <List>
                        {topics[chapter.id].map((topic) => (
                          <ListItem key={topic.id}>
                            <ListItemText primary={topic.title} />
                            <IconButton
                              color="success"
                              onClick={() => handleAcceptTopic(topic.id, true)}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleAcceptTopic(topic.id, false)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                )}
              </Paper>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default EditEbook;
