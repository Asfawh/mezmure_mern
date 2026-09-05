import SongRow from './SongRow';

function SongsList({ songs, setIsLoaded }) {
  return (
    <div className="manager-card">
      <div className="manager-card-header">
        <span className="editor-step">02</span>
        <div>
          <h2>All Mezmure</h2>
          <p>{songs.length} Mezmure in the collection</p>
        </div>
      </div>
      <div className="manager-table-wrap">
        <table className="table manager-table" aria-label="All Mezmure">
          <colgroup>
            <col className="manager-col-title" />
            <col className="manager-col-zemari" />
            <col className="manager-col-genre" />
            <col className="manager-col-source" />
            <col className="manager-col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">Mezmure</th>
              <th scope="col">Zemari</th>
              <th scope="col">Genre</th>
              <th scope="col">Source</th>
              <th scope="col" className="manager-actions-heading">Actions</th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song) => (
                <SongRow key={song._id} song={song} setIsLoaded={setIsLoaded} />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="manager-table-empty">
                  No Mezmure have been added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SongsList;
