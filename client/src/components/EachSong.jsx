/* react */
/* react bootstrap */
import Card from 'react-bootstrap/Card';

/* react router */
import { Link } from 'react-router-dom';
import { getDisplayedMezmureSource } from '../config/mezmure';

function EachSong({ song }) {
  const displayedSource = getDisplayedMezmureSource(song);
  const verseLines = song.verses
    ?.replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const previewLines = verseLines?.slice(0, 4) || [];
  const hasMoreLyrics = (verseLines?.length || 0) > previewLines.length;

  return (
    <Card className="song-card">
      <div className="song-card-accent" aria-hidden="true"></div>
      <Card.Body>
        <div className="song-card-topline">
          <span className="genre-pill">{song.genre || 'Mezmure'}</span>
          {song.pageNumber && <span className="page-number">Page {song.pageNumber}</span>}
        </div>
        <Card.Title>{song.songName}</Card.Title>
        <Card.Text className="song-artist">
          {song.artistName || 'Traditional'}
        </Card.Text>
        {displayedSource && (
          <Card.Text className="song-file">Source: {displayedSource}</Card.Text>
        )}
        {previewLines.length > 0 && (
          <div className="song-preview" aria-label="Lyrics preview">
            {previewLines.map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
            {hasMoreLyrics && <span className="song-preview-more" aria-hidden="true">…</span>}
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        <Link to={`/songs/${song._id}`} className="song-link">
          Read Mezmure <span aria-hidden="true">→</span>
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default EachSong;
