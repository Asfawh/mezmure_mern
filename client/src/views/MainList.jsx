/* React */
import { Fragment, useContext, useEffect, useState } from 'react';

/* react-router */
import { useOutletContext } from 'react-router-dom';

/* local */
import { AuthContext } from '../context/AuthContext';
import EachSong from '../components/EachSong';
import Details from './Details';
import styles from '../css/song-list.module.css';
import SONG_SERVICE from '../services/song.service';
import Search from '../components/Search';

function MainList() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    SONG_SERVICE.getAllSong()
      .then((res) => {
        setSongs(res);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [isLoaded]);

  let subtitle = 'Login or register for more.';

  if (user) {
    subtitle =
      'For each details click View below and search song by name.';
  }

  return (
    <Fragment>
      <h1 className="mb-4 mt-3 text-center">All Songs </h1>
      {/* <Search /> */}
      <h5 className="mb-4 mt-3 text-center">{subtitle}</h5>
      <div className={styles.grid}>
        {songs.map((song, i) => (
          <EachSong key={i} song={song} setIsLoaded={setIsLoaded} />
        ))}
      </div>
    </Fragment>
  );
}

export default MainList;
