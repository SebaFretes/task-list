import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Checkbox,
  IconButton,
  CircularProgress,
  Stack,
  TextField,
  Button,
  Modal,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import { getTasks, updateTask, deleteTask, createTask } from '../api/tasks';
import type { Task } from '../api/tasks';

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleDone = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, { done: !task.done });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSave = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, {
        title: editTitle,
        description: editDescription,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async () => {
    if (!newTitle.trim()) return; // evitar crear task vacía
    try {
      const data = await createTask({
        title: newTitle,
        description: newDescription,
      });
      setTasks((prev) => [data, ...prev]);
      setNewTitle('');
      setNewDescription('');
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      p={2}
      maxWidth="800px"
      mx="auto"
      mt={4}
      sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', borderRadius: 2 }}
    >
      <Typography variant="h4" mb={3} textAlign="center" fontWeight={600}>
        My Tasks
      </Typography>

      <Stack spacing={2}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: task.done ? '#e0f7fa' : '#ffffff',
              transition: '0.3s all',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <Box display="flex" flexDirection="column" flex="1">
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={task.done}
                  onChange={() => handleToggleDone(task)}
                  sx={{ color: '#1976d2' }}
                />
                {editingId === task.id ? (
                  <Box flex="1" display="flex" flexDirection="column" ml={1}>
                    <TextField
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      size="small"
                      fullWidth
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: task.done ? 'line-through' : 'none',
                      fontWeight: 500,
                      ml: 1,
                    }}
                  >
                    {task.title}
                  </Typography>
                )}
              </Box>

              {!editingId && task.description && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
                  {task.description}
                </Typography>
              )}
              {!editingId && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4 }}>
                  Created at: {new Date(task.createdAt).toLocaleString()}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center">
              {editingId === task.id ? (
                <IconButton onClick={() => handleSave(task)} color="primary">
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEdit(task)} color="secondary">
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                onClick={() => handleDelete(task.id)}
                sx={{ color: 'rgba(0,0,0,0.6)', '&:hover': { color: '#d32f2f' } }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Card>
        ))}
      </Stack>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
          Add New Task
        </Button>
      </Box>

      {/* Modal para crear task */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" textAlign="center">
            Nueva Task
          </Typography>
          <TextField
            label="Título"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddTask}>
            Crear
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
