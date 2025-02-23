/* react */
import { useContext } from 'react';

/* react bootstrap */
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import styles from '../css/song-list.module.css';

/* react router */
import { Link } from 'react-router-dom';

/* local */
import { AuthContext } from '../context/AuthContext';

function EachSong({ song, setIsLoaded }) {
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <Card bg="light" text="dark" className="shadow">
      {/* <img
        // className={styles.img}
        src={song.image}
        alt={song.songName}
        className="img-fluid mb-3"
      /> */}
      <Card.Body>
        <Figure>
          <blockquote>
            <Card.Text className="mb-4 mt-3 text-center">
              <strong>{song.songName}</strong>
            </Card.Text>
            <Card.Text className="mb-0">
              <strong>Artist Name:</strong> {song.artistName}
            </Card.Text>
            <Card.Text className="mb-0">
              <strong>Genre:</strong> {song.genre}
            </Card.Text>
            <Card.Text className="mb-0">
              <strong>File Name:</strong> {song.fileName}
            </Card.Text>
          </blockquote>
          <Figure.Caption className="blockquote-footer"></Figure.Caption>
        </Figure>
      </Card.Body>
      <Card.Footer className="mb-4 mt-3 text-center">
        <small>
          <Link to={`/songs/${song._id}`} className="link-primary">
            View
          </Link>
        </small>
      </Card.Footer>
    </Card>
  );
}

export default EachSong;
