import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SONG_SERVICE from '../services/song.service';
import { getDisplayedMezmureSource } from '../config/mezmure';
import {
  buildLyricsSlides,
  isLyricsHeading,
} from '../utils/lyricsPresentation';

function Details() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef(null);

  const lyricsSlides = buildLyricsSlides(song?.verses, song?.songName);
  const slideCount = lyricsSlides.length;

  useEffect(() => {
    SONG_SERVICE.getSongById(id)
      .then((res) => {
        setSong(res);
        setLoadError('');
      })
      .catch(() => setLoadError('This Mezmur could not be loaded. Please try again.'));
  }, [id]);

  useEffect(() => {
    setActiveSlide(0);
  }, [id, song?.verses]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === stageRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyboardNavigation = (event) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        setActiveSlide((current) => Math.max(0, current - 1));
      }

      if (event.key === 'ArrowRight') {
        setActiveSlide((current) => Math.min(Math.max(0, slideCount - 1), current + 1));
      }
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [slideCount]);

  const toggleFullscreen = async () => {
    if (!stageRef.current || !document.fullscreenEnabled) return;

    if (document.fullscreenElement === stageRef.current) {
      await document.exitFullscreen();
    } else {
      await stageRef.current.requestFullscreen();
    }
  };

  if (loadError) {
    return (
      <div className="lyrics-status">
        <strong>{loadError}</strong>
        <Link to="/songs">Return to the Mezmur library</Link>
      </div>
    );
  }

  if (!song) {
    return <div className="lyrics-status">Loading lyrics…</div>;
  }

  const displayedSource = getDisplayedMezmureSource(song);
  const currentLyrics = lyricsSlides[activeSlide] || [];
  const progress = slideCount > 0 ? ((activeSlide + 1) / slideCount) * 100 : 0;

  return (
    <article className="lyrics-page">
      <Link to="/songs" className="lyrics-back">
        <span aria-hidden="true">←</span> Back to Mezmur library
      </Link>

      <header className="lyrics-header">
        <span className="eyebrow">Mezmur lyrics</span>
        <h1>{song.songName}</h1>
        <div className="lyrics-meta">
          <span>{song.artistName || 'Traditional'}</span>
          {song.genre && <span>{song.genre}</span>}
          {song.pageNumber && (
            <span aria-label={`Mezmur number ${song.pageNumber}`}>
              M#{song.pageNumber}
            </span>
          )}
        </div>
      </header>

      <section
        className="lyrics-stage"
        aria-labelledby="lyrics-heading"
        ref={stageRef}
      >
        <div className="lyrics-stage-toolbar">
          <div>
            <span className="lyrics-stage-kicker">Sing-along view</span>
            <h2 id="lyrics-heading">{song.songName}</h2>
          </div>
          {document.fullscreenEnabled && (
            <button
              type="button"
              className="lyrics-fullscreen"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit full screen' : 'Open full screen'}
            >
              <span aria-hidden="true">{isFullscreen ? '✕' : '⛶'}</span>
              {isFullscreen ? 'Exit full screen' : 'Full-screen lyrics'}
            </button>
          )}
        </div>

        <div
          className="lyrics-slide"
          aria-live="polite"
          key={activeSlide}
          onCopy={(event) => event.preventDefault()}
        >
          <span className="lyrics-slide-ornament" aria-hidden="true">✥</span>
          {currentLyrics.length > 0 ? (
            <div className="lyrics-slide-lines">
              {currentLyrics.map((line, index) => (
                <div
                  className={isLyricsHeading(line) ? 'lyrics-line lyrics-label' : 'lyrics-line'}
                  key={`${line}-${index}`}
                >
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <p className="lyrics-empty">Lyrics have not been added yet.</p>
          )}
          <span className="lyrics-slide-ornament lyrics-slide-ornament-bottom" aria-hidden="true">✥</span>
        </div>

        {slideCount > 0 && (
          <div className="lyrics-navigation">
            <button
              type="button"
              className="lyrics-nav-button"
              onClick={() => setActiveSlide((current) => Math.max(0, current - 1))}
              disabled={activeSlide === 0}
            >
              <span aria-hidden="true">←</span>
              Previous
            </button>

            <div className="lyrics-progress" aria-label={`Part ${activeSlide + 1} of ${slideCount}`}>
              <div className="lyrics-progress-label">
                <span>Part {activeSlide + 1}</span>
                <span>{slideCount}</span>
              </div>
              <div className="lyrics-progress-track" aria-hidden="true">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <button
              type="button"
              className="lyrics-nav-button lyrics-nav-button-next"
              onClick={() => setActiveSlide((current) => Math.min(slideCount - 1, current + 1))}
              disabled={activeSlide === slideCount - 1}
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

        <div className="lyrics-stage-footer">
          <span>Use the ← and → arrow keys to move between parts</span>
          <Link to="/songs">Explore more Mezmur</Link>
        </div>
      </section>

      {displayedSource && (
        <p className="lyrics-attribution">Source: {displayedSource}</p>
      )}
    </article>
  );
}

export default Details;
