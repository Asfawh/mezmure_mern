import axios from 'axios';
import { withMezmureGenre, withMezmureGenres } from '../config/genres';

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api/songs`,
});

function authConfig(token) {
  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const SONG_SERVICE = {
  createSong: async (songData) => {
    try {
      const res = await http.post('/', songData);
      return withMezmureGenre(res.data);
    } catch (err) {
      throw err;
    }
  },

  checkSongNameAvailability: async (songName, excludeId) => {
    const res = await http.get('/name-availability', {
      params: {
        name: songName,
        ...(excludeId ? { excludeId } : {}),
      },
    });
    return res.data;
  },

  getSongById: async (id) => {
    try {
      const res = await http.get(`/${id}`);
      return withMezmureGenre(res.data);
    } catch (err) {
      throw err;
    }
  },

  getAllSong: async (token) => {
    try {
      const res = await http.get('/', authConfig(token));
      return withMezmureGenres(res.data);
    } catch (err) {
      throw err;
    }
  },

  searchSong: async (searchQuery) => {
    try {
      const res = await http.get(`/search?query=${searchQuery}`);
      console.log('Search Results:', res.data); // Log the entire response array
      if (res.data.length === 0) {
        throw new Error('No Mezmure found');
      }
      return withMezmureGenre(res.data[0]);
    } catch (err) {
      console.error('Error fetching Mezmure:', err);
      throw err;
    }
  },

  updateSongById: async (id, songData) => {
    try {
      const res = await http.put(`/${songData._id}`, songData);
      return withMezmureGenre(res.data);
    } catch (err) {
      throw err;
    }
  },

  deleteSongById: async (id) => {
    try {
      const res = await http.delete(`/${id}`);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};

export default SONG_SERVICE;
