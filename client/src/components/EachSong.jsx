/* react */
/* react bootstrap */
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

/* react router */
import { Link, useNavigate } from 'react-router-dom';
import { getDisplayedMezmureSource } from '../config/mezmure';

function EachSong({
  song,
  user = null,
  onReaction = null,
  reactionBusy = false,
}) {
  const navigate = useNavigate();
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

  const openLyrics = () => navigate(`/songs/${song._id}`);
  const handleCardClick = (event) => {
    if (event.target.closest('button, a, input, textarea, select')) return;
    openLyrics();
  };
  const handleCardKeyDown = (event) => {
    if (event.target.closest('button, a, input, textarea, select')) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLyrics();
    }
  };

  return (
    <Card
      className="song-card song-card-clickable"
      role="link"
      tabIndex={0}
      aria-label={`Open lyrics for ${song.songName}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
    >
      <div className="song-card-accent" aria-hidden="true"></div>
      <Card.Body>
        <div className="song-card-topline">
          <span className="genre-pill">{song.genre || 'Mezmur'}</span>
          {song.pageNumber && (
            <span
              className="mezmure-number"
              aria-label={`Mezmur number ${song.pageNumber}`}
            >
              M#{song.pageNumber}
            </span>
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
            title={canReact ? 'Like this Mezmur' : 'Log in to Like this Mezmur'}
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
            title={canReact ? 'Love this Mezmur' : 'Log in to Love this Mezmur'}
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
          Read Mezmur <span aria-hidden="true">→</span>
        </Link>
      </Card.Footer>
    </Card>
  );
}

EachSong.propTypes = {
  song: PropTypes.object.isRequired,
  user: PropTypes.object,
  onReaction: PropTypes.func,
  reactionBusy: PropTypes.bool,
};

export default EachSong;
