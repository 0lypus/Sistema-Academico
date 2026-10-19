import { request } from './httpClient';

export const usersApi = {
  listar: () => request('/api/users'),
  roles: () => request('/api/roles'),
  crear: (usuario) => request('/api/users', { method: 'POST', body: JSON.stringify(usuario) }),
  actualizar: (id, usuario) => request(`/api/users/${id}`, { method: 'PUT', body: JSON.stringify(usuario) }),
  darDeBaja: (id) => request(`/api/users/${id}`, { method: 'DELETE' }),
};