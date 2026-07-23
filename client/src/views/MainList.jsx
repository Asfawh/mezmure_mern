/* React */
import { useContext, useEffect, useMemo, useState } from 'react';

/* react-router */
import { useSearchParams } from 'react-router-dom';

/* local */
import { AuthContext } from '../context/AuthContext';
import EachSong from '../components/EachSong';
import styles from '../css/song-list.module.css';
import SONG_SERVICE from '../services/song.service';
import { getDisplayedMezmureSource } from '../config/mezmure';

function MainList() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    SONG_SERVICE.getAllSong()
      .then((res) => {
        setSongs(res);
        setIsLoaded(true);
        setLoadError('');
      })
      .catch(() => {
        setLoadError('The Mezmure library could not be loaded. Please try again.');
        setIsLoaded(true);
      });
  }, []);

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const visibleSongs = useMemo(() => songs.filter((song) => {
    if (!query) return true;
    return [
      song.songName,
      song.artistName,
      song.genre,
      getDisplayedMezmureSource(song),
      song.verses,
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  }), [songs, query]);

  useEffect(() => {
    setSearchValue(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchValue.trim();
    setSearchParams(value ? { query: value } : {});
  };

  const clearSearch = () => {
    setSearchValue('');
    setSearchParams({});
  };

  let subtitle = 'Login or register for more.';

  if (user) {
    subtitle = 'Explore the library, open a Mezmure for its verses, or add a new one.';
  }

  return (
    <>
      <section
        className="hero-section"
        aria-label="Ethiopian Orthodox Mezmure singers outside a traditional stone church"
      >
        <span className="eyebrow">Ethiopian Orthodox Tewahedo Church</span>
        <h1 className="hero-title">
          <span className="hero-amharic-title">ያሬዳዊ መዝሙር</span>
          <span className="hero-phonetic">
            <span aria-hidden="true"></span>
            Yaredawi Mezmure
            <span aria-hidden="true"></span>
          </span>
        </h1>
        <p className="hero-description">
          Sacred prayer and praise rooted in the ancient chant tradition of Saint Yared.
          <span className="hero-amharic">
            የቅዱስ ያሬድን ጥንታዊ የዜማ ትውፊት የሚያስቀጥል የጸሎትና የምስጋና መዝሙር።
          </span>
          <span className="hero-phonetic-description">
            Ye-Qidus Yaredin tintawi ye-zema tiwfit yemiyasqetil ye-tselot-na
            ye-misgana mezmur.
          </span>
        </p>
        <p className="hero-account-note">{subtitle}</p>
        <div className="hero-stats" aria-label="Library summary">
          <span><strong>{songs.length}</strong> Mezmure in the library</span>
          <span><strong>3</strong> traditional categories</span>
        </div>
      </section>

      <section className="library-section" aria-labelledby="library-heading">
        <div className="section-heading">
          <div className="section-heading-copy">
            <img
              className="section-heading-cross"
              src="/assets/ethiopian-processional-cross.webp"
              alt=""
              aria-hidden="true"
            />
            <div>
              <span className="eyebrow">Browse the collection</span>
              <h2 id="library-heading">Mezmure library</h2>
            </div>
          </div>
          <span className="results-label">
            {visibleSongs.length} Mezmure
          </span>
        </div>

        <form className="library-search" role="search" onSubmit={handleSearch}>
          <span className="library-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search title, artist, genre, source, or verses…"
            aria-label="Search the Mezmure library"
          />
          {query && (
            <button type="button" className="library-search-clear" onClick={clearSearch}>
              Clear
            </button>
          )}
          <button type="submit" className="library-search-submit">Search</button>
        </form>
        {query && (
          <p className="search-summary">
            Showing results for <strong>“{searchParams.get('query')}”</strong>
          </p>
        )}

        {!isLoaded && <div className="empty-state">Loading the Mezmure library…</div>}
        {loadError && <div className="alert alert-danger">{loadError}</div>}
        {isLoaded && !loadError && visibleSongs.length === 0 && (
          <div className="empty-state">
            <strong>No Mezmure found.</strong>
            <span>Try another title, artist, or genre.</span>
          </div>
        )}
        <div className={styles.grid}>
          {visibleSongs.map((song) => (
            <EachSong key={song._id} song={song} />
          ))}
        </div>
      </section>
    </>
  );
}

export default MainList;
