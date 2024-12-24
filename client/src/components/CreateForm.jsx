import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import SONG_SERVICE from '../services/song.service';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const songGenre = ['Yensiha', 'Woreb', 'Chebchebo'];

const CreateForm = ({ setIsLoaded }) => {
  const { state } = useContext(AuthContext);
  const initialSong = {
    songName: '',
    artistName: '',
    fileName: '',
    verses: '',
    genre: '',
    pageNumber: '',
    createdBy: state.user?.id,
  };

  const navigate = useNavigate();
  const [song, setSong] = useState(initialSong);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!state.user) {
    navigate('/songs');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const readyToSubmit = () => {
    for (let key in errors) {
      if (errors[key] !== true) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readyToSubmit()) {
      alert('Please make a correction to the form.');
      window.location.reload();

      return;
    }

    SONG_SERVICE.createSong(song)
      .then(() => setSong(initialSong))
      .catch((err) => setErrors(err.response.data.errors));
    setIsLoaded(false);
  };

  return (
    <div className="card shadow">
      <h3 className="card-header text-center">Create</h3>
      <p className="text-center mt-3">Add a new Song</p>
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
            {errors.fileName && (
              <p className="error">{errors.fileName.message}</p>
            )}
            <label htmlFor="fileName" className="form-label">
              FileName: (Optional):
            </label>
            <input
              type="text"
              name="fileName"
              id="fileName"
              className="form-control"
              value={song.fileName}
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
          {/* <div className="mb-3">
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
          </div> */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
