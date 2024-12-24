import axios from 'axios';
/* react */
import { useContext } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SONG_SERVICE from '../services/song.service';
import { AuthContext } from '../context/AuthContext';

import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import styles from '../css/song-list.module.css';

function Details() {
  const { id } = useParams();
  const [song, setSong] = useState({});
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    SONG_SERVICE.getSongById(id)
      .then((res) => setSong(res))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <Fragment>
      <div className="text-end">
        <Link to={`/songs/`} className="btn btn-primary">
          Home
        </Link>
      </div>
      <p className="mb-3">
                  <strong>ArtistName:</strong> {song.artistName}
                </p>

      {song && (
        <div className="row">
          <Card bg="light" text="dark" className="shadow col">
            <Card.Body>
              <img
                // className={styles.img}
                src={song.image}
                alt={song.songName}
                // className="img-fluid mb-3"
              />
              <Figure className="ms-5">
                
                <p className="text-center mt-3">
        <strong>{song.songName}</strong>
      </p>
                <div style={{ whiteSpace: 'pre-wrap' }}>
                   {song.verses}
                </div>
              </Figure>
            </Card.Body>
          </Card>
        </div>
      )}
    </Fragment>
  );
}
export default Details;
