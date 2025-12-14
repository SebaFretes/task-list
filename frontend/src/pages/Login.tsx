/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { login } from '../api/auth';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error en login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#7CC0F2',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: 400,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center' }}>
          Iniciar sesión
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Iniciar sesión
        </Button>

        {error && (
          <Typography color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          ¿No tenés cuenta?{' '}
          <Link component={RouterLink} to="/register">
            Registráte aquí
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
