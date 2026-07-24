import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SONG_SERVICE from '../services/song.service';
import { getDisplayedMezmureSource } from '../config/mezmure';

const isLyricsHeading = (line) => (
  /^(chorus|refrain|verse|meaning|translation)\b[\s.:…-]*/i.test(line.trim())
);

function Details() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    SONG_SERVICE.getSongById(id)
      .then((res) => {
        setSong(res);
        setLoadError('');
      })
      .catch(() => setLoadError('This Mezmure could not be loaded. Please try again.'));
  }, [id]);

  if (loadError) {
    return (
      <div className="lyrics-status">
        <strong>{loadError}</strong>
        <Link to="/songs">Return to the Mezmure library</Link>
      </div>
    );
  }

  if (!song) {
    return <div className="lyrics-status">Loading lyrics…</div>;
  }

  const lyrics = song.verses
    ?.replace(/\r\n?/g, '\n')
    .trim()
    .split('\n') || [];
  const displayedSource = getDisplayedMezmureSource(song);

  return (
    <article className="lyrics-page">
      <Link to="/songs" className="lyrics-back">
        <span aria-hidden="true">←</span> Back to Mezmure library
      </Link>

      <header className="lyrics-header">
        <span className="eyebrow">Mezmure lyrics</span>
        <h1>{song.songName}</h1>
        <div className="lyrics-meta">
          <span>{song.artistName || 'Traditional'}</span>
          {song.genre && <span>{song.genre}</span>}
          {song.pageNumber && <span>Mezmure No. {song.pageNumber}</span>}
          {displayedSource && <span>Source: {displayedSource}</span>}
        </div>
      </header>

      <section className="lyrics-sheet" aria-labelledby="lyrics-heading">
        <div className="lyrics-sheet-heading">
          <span className="lyrics-ornament" aria-hidden="true">✥</span>
          <h2 id="lyrics-heading">Lyrics</h2>
          <span className="lyrics-ornament" aria-hidden="true">✥</span>
        </div>

        <div className="lyrics-body">
          {lyrics.length > 0 ? lyrics.map((line, index) => {
            if (!line.trim()) {
              return <div className="lyrics-stanza-break" aria-hidden="true" key={`break-${index}`} />;
            }

            return (
              <div
                className={isLyricsHeading(line) ? 'lyrics-line lyrics-label' : 'lyrics-line'}
                key={`${line}-${index}`}
              >
                {line.trim()}
              </div>
            );
          }) : (
            <p className="lyrics-empty">Lyrics have not been added yet.</p>
          )}
        </div>

        <footer className="lyrics-sheet-footer">
          <span>{song.songName}</span>
          <Link to="/songs">Explore more Mezmure</Link>
        </footer>
      </section>
    </article>
  );
}

export default Details;
