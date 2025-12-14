/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { register } from '../api/auth';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error en registro');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          Crear cuenta
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          fullWidth
          label="Confirmar Password"
          type="password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Registrarse
        </Button>

        <Typography mt={2} textAlign="center">
          ¿Ya tenés cuenta?{' '}
          <Link component="button" onClick={() => navigate('/login')}>
            Iniciá sesión
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
