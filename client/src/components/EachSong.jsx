/* react */
/* react bootstrap */
import Card from 'react-bootstrap/Card';

/* react router */
import { Link } from 'react-router-dom';
import { getDisplayedMezmureSource } from '../config/mezmure';

function EachSong({
  song,
  user = null,
  onReaction = null,
  reactionBusy = false,
}) {
  const displayedSource = getDisplayedMezmureSource(song);
  const counts = song.reactionCounts || { like: 0, love: 0 };
  const canReact = Boolean(user && onReaction);
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
          {song.pageNumber && (
            <span className="mezmure-number">Mezmure No. {song.pageNumber}</span>
          )}
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
        <div className="reaction-row" aria-label={`Reactions for ${song.songName}`}>
          <button
            type="button"
            className={`reaction-button ${song.userReaction === 'like' ? 'is-active is-like' : ''}`}
            aria-pressed={song.userReaction === 'like'}
            disabled={!canReact || reactionBusy}
            title={canReact ? 'Like this Mezmure' : 'Log in to Like this Mezmure'}
            onClick={() => onReaction?.(song, 'like')}
          >
            <span aria-hidden="true">👍</span>
            <span>Like</span>
            <strong>{counts.like || 0}</strong>
          </button>
          <button
            type="button"
            className={`reaction-button ${song.userReaction === 'love' ? 'is-active is-love' : ''}`}
            aria-pressed={song.userReaction === 'love'}
            disabled={!canReact || reactionBusy}
            title={canReact ? 'Love this Mezmure' : 'Log in to Love this Mezmure'}
            onClick={() => onReaction?.(song, 'love')}
          >
            <span aria-hidden="true">♥</span>
            <span>Love</span>
            <strong>{counts.love || 0}</strong>
          </button>
        </div>
        {!user && <span className="reaction-signin-note">Log in to react and save favorites</span>}
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
