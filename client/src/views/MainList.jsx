/* React */
import { useContext, useEffect, useMemo, useState } from 'react';

/* react-router */
import { Link, useSearchParams } from 'react-router-dom';

/* local */
import { AuthContext } from '../context/AuthContext';
import EachSong from '../components/EachSong';
import styles from '../css/song-list.module.css';
import SONG_SERVICE from '../services/song.service';
import REACTION_SERVICE from '../services/reaction.service';
import { getDisplayedMezmureSource } from '../config/mezmure';

function MainList() {
  const [songs, setSongs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [reactionError, setReactionError] = useState('');
  const [busySongId, setBusySongId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sharedIds = useMemo(() => [...new Set((searchParams.get('study') || '').split(',').filter(id => /^[a-f0-9]{24}$/i.test(id)))].slice(0, 30), [searchParams]);
  const [selectedIds, setSelectedIds] = useState(sharedIds);
  const [shareStatus, setShareStatus] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [searchValue, setSearchValue] = useState(searchParams.get('query') || '');
  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    let active = true;
    setIsLoaded(false);

    SONG_SERVICE.getAllSong(user?.token)
      .then((res) => {
        if (!active) return;
        setSongs(res);
        setIsLoaded(true);
        setLoadError('');
      })
      .catch(() => {
        if (!active) return;
        setLoadError('The Mezmur library could not be loaded. Please try again.');
        setIsLoaded(true);
      });

    return () => {
      active = false;
    };
  }, [user?.token]);

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const visibleSongs = useMemo(() => songs.filter((song) => {
    if (searchParams.has('study') && !sharedIds.includes(song._id)) return false;
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
  }), [songs, query, sharedIds, searchParams]);

  useEffect(() => {
    setSearchValue(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();
    const value = searchValue.trim();
    const next = new URLSearchParams(searchParams);
    if (value) next.set('query', value); else next.delete('query');
    setSearchParams(next);
  };

  const clearSearch = () => {
    setSearchValue('');
    const next = new URLSearchParams(searchParams);
    next.delete('query');
    setSearchParams(next);
  };

  const toggleSelection = (id) => {
    setShareUrl('');
    setShareStatus('');
    setSelectedIds(current => current.includes(id) ? current.filter(item => item !== id) : current.length < 30 ? [...current, id] : current);
  };

  const studyUrl = new URL('/songs', window.location.origin);
  studyUrl.searchParams.set('study', selectedIds.join(','));
  const studyMessage = `${selectedIds.length} Mezmur for this week’s study: ${studyUrl.href}`;

  const shareSelection = async () => {
    const url = new URL('/songs', window.location.origin);
    url.searchParams.set('study', selectedIds.join(','));
    setShareUrl(url.href);
    setShareStatus('');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Weekly Mezmur study', text: `${selectedIds.length} Mezmur for this week’s study`, url: url.href });
        setShareStatus('Study list shared.');
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url.href);
      setShareStatus('Study link copied. Send it to your students.');
    } catch {
      setShareStatus('Select and copy the study link below.');
    }
  };

  const handleReaction = async (song, kind) => {
    if (!user?.token || busySongId) return;

    const nextKind = song.userReaction === kind ? null : kind;
    setBusySongId(song._id);
    setReactionError('');

    try {
      const updatedSong = await REACTION_SERVICE.setReaction(
        song._id,
        nextKind,
        user.token
      );

      setSongs((current) => current.map((item) => (
        item._id === song._id ? updatedSong : item
      )));
    } catch {
      setReactionError('Your reaction could not be saved. Please try again.');
    } finally {
      setBusySongId(null);
    }
  };

  let subtitle = 'Login or register for more.';

  if (user) {
    subtitle = 'Explore the library, open a Mezmur for its verses, or add a new one.';
  }

  return (
    <>
      <section
        className="hero-section"
        aria-label="Ethiopian Orthodox Mezmur singers outside a traditional stone church"
      >
        <span className="eyebrow">Ethiopian Orthodox Tewahedo Church</span>
        <h1 className="hero-title">
          <span className="hero-amharic-title">ያሬዳዊ መዝሙር</span>
          <span className="hero-phonetic">
            <span aria-hidden="true"></span>
            Yaredawi Mezmur
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
          <span><strong>{songs.length}</strong> Mezmur in the library</span>
          <span><strong>5</strong> traditional categories</span>
        </div>
      </section>

      <aside className="sacred-art-invitation" aria-label="Explore sacred art">
        <img src="/assets/sacred-art/17.webp" alt="" width="96" height="72" />
        <div>
          <span lang="am">የቅዱሳነ ምሥዕሎች</span>
          <p>Discover the sacred art of our tradition, with Amharic and English names.</p>
        </div>
        <Link to="/sacred-art">Explore the collection <span aria-hidden="true">→</span></Link>
      </aside>

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
              <h2 id="library-heading">Mezmur library</h2>
            </div>
          </div>
          <span className="results-label">
            {visibleSongs.length} Mezmur
          </span>
        </div>

        <form className="library-search" role="search" onSubmit={handleSearch}>
          <span className="library-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search title, Zemari, genre, source, or verses…"
            aria-label="Search Mezmur titles and catalog details"
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

        <div className={styles.studyPanel}>
          <div><strong>{searchParams.has('study') ? 'Shared weekly study' : 'Weekly Mezmur study'}</strong><p>Select up to 30 Mezmur, then share one link with your class. No sign-in needed.</p></div>
          {searchParams.has('study') && <Link to="/songs">Browse all Mezmur</Link>}
          {isLoaded && sharedIds.some(id => !songs.some(song => song._id === id)) && <p role="status">Some Mezmur in this shared list are no longer available.</p>}
          <div className={styles.studyActions}>
            <span>{selectedIds.length} selected</span>
            <button type="button" disabled={!selectedIds.length} onClick={shareSelection}>Share study link</button>
            {selectedIds.length > 0 && <>
              <a href={`sms:?body=${encodeURIComponent(studyMessage)}`}>Text message</a>
              <a href={`mailto:?subject=${encodeURIComponent('Weekly Mezmur study')}&body=${encodeURIComponent(studyMessage)}`}>Email</a>
            </>}
            <button type="button" disabled={!selectedIds.length} onClick={() => { setSelectedIds([]); setShareUrl(''); setShareStatus(''); }}>Clear selection</button>
          </div>
          {shareUrl && <label>Study link<input aria-label="Study link" readOnly value={shareUrl} onFocus={event => event.target.select()} /></label>}
          <span role="status">{shareStatus}</span>
        </div>
        {reactionError && <div className="alert alert-danger">{reactionError}</div>}
        {!isLoaded && <div className="empty-state">Loading the Mezmur library…</div>}
        {loadError && <div className="alert alert-danger">{loadError}</div>}
        {isLoaded && !loadError && visibleSongs.length === 0 && (
          <div className="empty-state">
            <strong>No Mezmur found.</strong>
            <span>Try another title, Zemari, or genre.</span>
          </div>
        )}
        <div className={styles.grid}>
          {visibleSongs.map((song) => (
            <div key={song._id} className={styles.selectableSong}>
            <label className={styles.songSelect}><input type="checkbox" checked={selectedIds.includes(song._id)} disabled={selectedIds.length >= 30 && !selectedIds.includes(song._id)} onChange={() => toggleSelection(song._id)} /> Select {song.songName}</label>
            <EachSong
              song={song}
              user={user}
              onReaction={handleReaction}
              reactionBusy={Boolean(busySongId)}
            />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default MainList;
