import { Fragment } from 'react';
import { useEffect, useState } from 'react';

import axios from 'axios';

import CreateForm from '../components/CreateForm';
import SongsList from '../components/SongsList';
import SONG_SERVICE from '../services/song.service';

function Main() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    SONG_SERVICE.getAllSong()
      .then((res) => {
        setSongs(res);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [isLoaded]);
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <CreateForm setIsLoaded={setIsLoaded} />
        </div>
        <div className="col">
          {isLoaded && <SongsList songs={songs} setIsLoaded={setIsLoaded} />}
        </div>
      </div>
    </Fragment>
  );
}
export default Main;
