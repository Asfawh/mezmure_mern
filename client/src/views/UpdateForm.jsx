import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import SONG_SERVICE from '../services/song.service';
import { AuthContext } from '../context/AuthContext';

const songGenre = ['Yensiha', 'Woreb', 'Chebchebo'];
const UpdateForm = () => {
  const { state } = useContext(AuthContext);
  const initialSong = {
    songName: '',
    artistName: '',
    fileName: '',
    verses: '',
    genre: '',
    createdBy: state.user?.id,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(initialSong);
  const [errors, setErrors] = useState({});
  const baseUrl = 'http://localhost:8004/api/songs';

  useEffect(() => {
    if (!state.user) {
      navigate('/songs');
    }
    SONG_SERVICE.getSongById(id)
      .then((res) => setSong(res))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SONG_SERVICE.updateSongById(id, song)
      .then((res) => {
        console.log(res.data);
        navigate('/songs');
      })
      .catch((err) => setErrors(err.response.data.errors));
  };

  return (
    <div className="card shadow">
      <h3 className="card-header text-center">Edit</h3>
      <p className="text-center mt-3">Edit Song</p>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            {errors.songName && (
              <p className="error">{errors.songName.message}</p>
            )}
            <label htmlFor="songName" className="form-label">
              Song Name:
            </label>
            <input
              type="text"
              name="songName"
              id="songName"
              value={song.songName}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            {errors.artistName && (
              <p className="error">{errors.artistName.message}</p>
            )}
            <label htmlFor="artistName" className="form-label">
              ArtistName:
            </label>
            <input
              type="text"
              name="artistName"
              id="artistName"
              value={song.artistName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            {errors.genre && <p className="error">{errors.genre.message}</p>}
            <label htmlFor="genre" className="form-label">
              Genre :
            </label>
            <select
              name="genre"
              id="genre"
              className="form-select"
              value={song.genre}
              onChange={handleChange}
            >
              {songGenre.map((genreType) => (
                <option key={genreType} value={genreType}>
                  {genreType}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {errors.artistName && (
              <p className="error">{errors.artistName.message}</p>
            )}
            <label htmlFor="artistName" className="form-label">
              ArtistName:
            </label>
            <input
              type="text"
              name="artistName"
              id="artistName"
              className="form-control"
              value={song.artistName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            {errors.verses && <p className="error">{errors.verses.message}</p>}

            <label htmlFor="verses" className="form-label">
              Verses:
            </label>
            <textarea
              type="text"
              name="verses"
              id="verses"
              value={song.verses}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pageNumber" className="form-label">
              PageNumber (Optional):
            </label>
            <input
              type="number"
              name="pageNumber"
              id="pageNumber"
              value={song.pageNumber}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileName" className="form-label">
              File Name (Optional):
            </label>
            <input
              type="text"
              name="fileName"
              id="fileName"
              value={song.fileName}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
