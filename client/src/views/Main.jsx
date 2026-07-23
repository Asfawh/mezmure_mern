import { useEffect, useState } from 'react';

import CreateForm from '../components/CreateForm';
import SongsList from '../components/SongsList';
import SONG_SERVICE from '../services/song.service';

function Main() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    SONG_SERVICE.getAllSong()
      .then((res) => {
        setSongs(res);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [isLoaded]);
  return (
    <>
      <section className="workspace-hero">
        <span className="eyebrow">Community collection</span>
        <h1>Add and manage Mezmure</h1>
        <p>Preserve a Mezmure by adding its title, tradition, source, and complete verses.</p>
      </section>
      <section className="song-workspace">
        <div className="song-workspace-form">
          <CreateForm setIsLoaded={setIsLoaded} />
        </div>
        <div className="song-workspace-list">
          {isLoaded && <SongsList songs={songs} setIsLoaded={setIsLoaded} />}
        </div>
      </section>
    </>
  );
}
export default Main;
