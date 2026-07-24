import axios from 'axios';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api/reactions`,
});

function authConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const REACTION_SERVICE = {
  getFavorites: async (token) => {
    const response = await http.get('/favorites', authConfig(token));
    return response.data;
  },

  setReaction: async (songId, kind, token) => {
    const response = await http.put(`/${songId}`, { kind }, authConfig(token));
    return response.data;
  },
};

export default REACTION_SERVICE;
