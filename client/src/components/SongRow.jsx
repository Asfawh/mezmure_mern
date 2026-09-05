import { Link } from 'react-router-dom';
import SONG_SERVICE from '../services/song.service';
/* react */
import { useContext } from 'react';

/* local */
import { AuthContext } from '../context/AuthContext';
import { getDisplayedMezmureSource } from '../config/mezmure';

function SongRow({ song, setIsLoaded }) {
  const {
    state: { user },
  } = useContext(AuthContext);
  const displayedSource = getDisplayedMezmureSource(song);
  const isOwner = user && user.id === song.createdBy;

  const removeSong = async (id) => {
    if (!window.confirm('Remove this Mezmure from the library?')) return;
    await SONG_SERVICE.deleteSongById(id);
    setIsLoaded(false);
  };
  return (
    <tr>
      <td className="align-middle manager-song-title" data-label="Mezmure">
        <Link to={`/songs/${song._id}`}>{song.songName}</Link>
      </td>
      <td className="align-middle" data-label="Zemari">{song.artistName}</td>
      <td className="align-middle" data-label="Genre">
        <span className="table-genre">{song.genre}</span>
      </td>
      <td className="align-middle manager-source" data-label="Source">{displayedSource}</td>
      <td className="align-middle manager-actions-cell" data-label="Actions">
        <div className="manager-actions">
          <Link to={`/songs/${song._id}`} className="btn btn-sm btn-outline-primary">
            View
          </Link>
          {isOwner && (
            <Link to={`/songs/${song._id}/edit`} className="btn btn-sm btn-outline-secondary">
              Update
            </Link>
          )}
          {isOwner && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeSong(song._id)}
            >
              Remove
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
export default SongRow;
