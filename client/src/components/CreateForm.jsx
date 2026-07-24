import { useContext, useEffect, useState } from 'react';
import SONG_SERVICE from '../services/song.service';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MEZMURE_GENRES } from '../config/genres';

const CreateForm = ({ setIsLoaded }) => {
  const { state } = useContext(AuthContext);
  const initialSong = {
    songName: '',
    artistName: '',
    source: '',
    verses: '',
    genre: MEZMURE_GENRES[0],
    createdBy: state.user?.id,
  };

  const navigate = useNavigate();
  const [song, setSong] = useState(initialSong);
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!state.user) {
      navigate('/songs');
    }
  }, [state.user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSong((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      await SONG_SERVICE.createSong(song);
      setSong(initialSong);
      setValidated(false);
      setSuccessMessage('Mezmure added to the library.');
      setIsLoaded(false);
    } catch (err) {
      setErrors(err.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editor-card">
      <div className="editor-card-header">
        <span className="editor-step">01</span>
        <div>
          <h2>Create Mezmure</h2>
          <p>Fields marked required help visitors find and read the Mezmure.</p>
        </div>
      </div>
      <div className="editor-card-body">
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form noValidate className={validated ? 'was-validated' : ''} onSubmit={handleSubmit}>
          <div className="mb-3">
            {errors.songName && (
              <p className="error">{errors.songName.message}</p>
            )}
            <label htmlFor="songName" className="form-label">
              Mezmure name *
            </label>
            <input
              type="text"
              name="songName"
              id="songName"
              value={song.songName}
              className="form-control"
              onChange={handleChange}
              required
              minLength={2}
            />
            <div className="invalid-feedback">Enter a Mezmure name of at least two characters.</div>
          </div>

          <div className="mb-3">
            {errors.artistName && (
              <p className="error">{errors.artistName.message}</p>
            )}
            <label htmlFor="artistName" className="form-label">
              Zemari name
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
              Genre *
            </label>
            <select
              name="genre"
              id="genre"
              className="form-select"
              value={song.genre}
              onChange={handleChange}
              required
            >
              {MEZMURE_GENRES.map((genreType) => (
                <option key={genreType} value={genreType}>
                  {genreType}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            {errors.source && (
              <p className="error">{errors.source.message}</p>
            )}
            <label htmlFor="source" className="form-label">
              Source attribution
            </label>
            <input
              type="text"
              name="source"
              id="source"
              className="form-control"
              value={song.source}
              onChange={handleChange}
              placeholder="Church, choir, book, website, or other source"
            />
          </div>

          <div className="mb-3">
            {errors.verses && <p className="error">{errors.verses.message}</p>}

            <label htmlFor="verses" className="form-label">
              Verses *
            </label>
            <textarea
              type="text"
              name="verses"
              id="verses"
              value={song.verses}
              className="form-control"
              onChange={handleChange}
              required
              rows={9}
            />
            <div className="invalid-feedback">Enter the Mezmure verses.</div>
          </div>
          <div className="editor-actions">
            <span>Your Mezmure will receive the next page number automatically.</span>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Adding Mezmure…' : 'Add to library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
