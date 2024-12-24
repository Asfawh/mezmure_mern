import { Link } from 'react-router-dom';
import SONG_SERVICE from '../services/song.service';


import axios from 'axios';
/* react */
import { useContext } from 'react';

/* local */
import { AuthContext } from '../context/AuthContext';

function SongRow({ song, setIsLoaded }) {
  const baseUrl = 'http://localhost:8004/api/songs';
  const {
    state: { user },
  } = useContext(AuthContext);
  const removeSong = (id) => {
    SONG_SERVICE.deleteSongById(id);
    setSong((prev) => prev.filter((song) => id != song._id));
  };
  return (
    
    <tr>
      <td className="align-middle">
        <Link to={`/songs/${song._id}`}>{song.songName} </Link>
      </td>
      <td className="align-middle">{song.artistName}</td>
      <td className="align-middle">{song.genre}</td>
      <td className="align-middle">{song.fileName}</td>
      {/* <td className="align-middle">{song.pageNumber}</td> */}

      <td className="align-middle d-flex gap-2">
        {user && user.id === song.createdBy ?
        (
          <Link to={`/songs/${song._id}/edit`} className="btn btn-warning  ">
            Update
          </Link>
        ) 
        : (
          ''
        )}
        {user && user.id === song.createdBy ? (
          <Link
            to={`/songs`}
            className="btn btn-danger"
            onClick={() => removeSong(song._id)}
          >
            Remove
          </Link>
        ) : (
          ''
        )}
        
      </td>
    </tr>
  );
}
export default SongRow;
