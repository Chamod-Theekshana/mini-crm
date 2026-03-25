import client from '../../shared/api/client';

export const registerUser = async (payload) => {
  const { data } = await client.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await client.post('/auth/login', payload);
  return data;
};

export const fetchProfile = async () => {
  const { data } = await client.get('/auth/profile');
  return data;
};
