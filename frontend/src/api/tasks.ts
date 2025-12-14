import { api } from './api';

export interface Task {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
}

export const getTasks = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

export const createTask = async (data: { title: string; description?: string }) => {
  const res = await api.post('/tasks', data);
  return res.data as Task;
};

export const updateTask = async (id: string, data: Partial<Task>) => {
  const res = await api.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
