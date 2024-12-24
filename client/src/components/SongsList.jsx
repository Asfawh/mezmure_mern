import SongRow from './SongRow';

function SongsList({ songs, setIsLoaded }) {
  return (
    <div className="card shadow ">
      <h3 className="card-header text-center">All Songs</h3>
      <p className="text-center mt-3">Songs added by Users</p>
      <div className="card-body">
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>Song Name:</th>
              <th>Artist Name:</th>
              <th>Genre:</th>
              <th>File Name:</th>
              <th> Action:</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <SongRow key={song._id} song={song} setIsLoaded={setIsLoaded} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default SongsList;
