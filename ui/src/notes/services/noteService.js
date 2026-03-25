import client from '../../shared/api/client';

export const getNotes = async () => {
  const { data } = await client.get('/notes');
  return data;
};

export const getNoteById = async (id) => {
  const { data } = await client.get(`/notes/${id}`);
  return data;
};

export const createNote = async (payload) => {
  const { data } = await client.post('/notes', payload);
  return data;
};

export const updateNote = async (id, payload) => {
  const { data } = await client.put(`/notes/${id}`, payload);
  return data;
};

export const deleteNote = async (id) => {
  const { data } = await client.delete(`/notes/${id}`);
  return data;
};
