import mongoose from 'mongoose';
import dotenv from 'dotenv';

import dbConnect from '../config/mongoose.config.js';
import { GENRE_BY_SONG_NAME } from '../config/genres.js';
import Song from '../models/song.model.js';

dotenv.config();

async function migrateGenres() {
  await dbConnect();

  const dryRun = process.argv.includes('--dry-run');
  const songs = await Song.find({}, { songName: 1, genre: 1 }).lean();
  const targets = songs.filter((song) => (
    GENRE_BY_SONG_NAME.has(song.songName?.trim())
  ));
  const matchedNames = new Set(targets.map((song) => song.songName.trim()));
  const missingNames = [...GENRE_BY_SONG_NAME.keys()].filter((name) => (
    !matchedNames.has(name)
  ));

  if (targets.length !== GENRE_BY_SONG_NAME.size || missingNames.length > 0) {
    throw new Error(
      `Expected ${GENRE_BY_SONG_NAME.size} unique Mezmure; found ${targets.length}. `
      + `Missing: ${missingNames.join(', ') || 'none'}.`
    );
  }

  let matched = targets.length;
  let modified = 0;

  if (!dryRun) {
    const result = await Song.bulkWrite(
      targets.map((song) => ({
        updateOne: {
          filter: { _id: song._id },
          update: {
            $set: {
              genre: GENRE_BY_SONG_NAME.get(song.songName.trim()),
            },
          },
        },
      }))
    );

    matched = result.matchedCount;
    modified = result.modifiedCount;
  }

  const counts = targets.reduce((summary, song) => {
    const genre = GENRE_BY_SONG_NAME.get(song.songName.trim());
    summary[genre] = (summary[genre] || 0) + 1;
    return summary;
  }, {});

  console.log(JSON.stringify({
    mode: dryRun ? 'dry-run' : 'write',
    matched,
    modified,
    categories: counts,
  }, null, 2));
}

try {
  await migrateGenres();
} finally {
  await mongoose.disconnect();
}
