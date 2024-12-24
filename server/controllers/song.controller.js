import Song from '../models/song.model.js';

//Add a song to the collection in our Mongo database using a POST HTTP Verb.
async function createSong(req, res) {
  try {
    const newSong = await Song.create(req.body);
    res.status(201).json(newSong);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Retrieve all song from the collection.
async function getAllSong(req, res) {
  try {
    const allSong = await Song.find();
    res.status(200).json(allSong);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Retrieve a single song from the collection.
async function getOneSong(req, res) {
  try {
    const { id } = req.params;
    const foundSong = await Song.findById(id);
    res.status(200).json(foundSong);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

// Search a song from the collection with substring search or wildcard matching.
async function searchSong(req, res) {
  const { query } = req.query;
  try {
    // Create a case-insensitive regular expression based on the query parameter
    const query = new RegExp(req.query.query, 'i'); // 'i' makes it case-insensitive
    // Find songs where songName matches the query as a substring
    const foundSong = await Song.find({ songName: query });

    if (foundSong.length > 0) {
      res.status(200).json(foundSong);
    } else {
      res.status(404).send({ error: 'No Song was found!' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error: 'Error occurred while searching for songs!' });
  }
}

//Edit a song from the collection.
async function updateOneSong(req, res) {
  const options = {
    new: true,
    runValidators: true,
  };
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    res.status(200).json(updatedSong);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

//Delete a song from the collection.
async function deleteOneSong(req, res) {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedSong);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

// async function searchSong(req, res) {
//   const { query } = req.query.query;
//   try {
//     const foundSongs = await Song.find({ songName: new RegExp(query, 'i') });
//     if (foundSongs.length > 0) {
//       res.status(200).json(foundSongs);
//     } else {
//       res.status(404).send({ error: 'No Song found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Server error' });
//   }
// }
// // Search a song from the collection.
// async function searchSong(req, res) {
//   try {
//     const foundSong = await Song.find({ songName: req.params.query });
//     res.status(200).json(foundSong);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: 'No Song was found!' });
//   }
// }
// async function searchSong(req, res) {
//   const foundSong = await Song.find(
//     (song) => song.songName === req.params.songName
//   );
//   if (foundSong || foundSong.length !== 0) {
//     res.status(200).send(foundSong);
//   }
//   // console.log(error);
//   res.status(400).send({ error: 'No Song was found!' });
// }

export {
  createSong,
  getOneSong,
  getAllSong,
  updateOneSong,
  deleteOneSong,
  searchSong,
};
