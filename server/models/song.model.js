import { model, Schema } from 'mongoose';
import { MEZMURE_GENRES } from '../config/genres.js';
const SongSchema = new Schema(
  {
    songName: {
      type: String,
      required: [true, 'Mezmure/Song name is required.'],
      trim: true,
      minLength: [2, 'Mezmure/Song name must be at least 2 characters long.'],
      maxLength: [
        50,
        'Mezmure/Song name must be less than 50 characters long.',
      ],
    },
    artistName: String,
    fileName: String,
    source: {
      type: String,
      maxLength: [200, 'Source attribution must be less than 200 characters long.'],
    },
    pageNumber: {
      type: Number,
      min: [1, 'Mezmure number must be at least 1.'],
      validate: {
        validator: Number.isInteger,
        message: 'Mezmure number must be a whole number.',
      },
    },

    genre: {
      type: String,
      required: [true, 'Genre is required.'],
      enum: {
        values: MEZMURE_GENRES,
        message: 'Choose a valid Mezmure genre.',
      },
    },
    verses: {
      type: String,
      required: [true, 'Verses is required.'],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  { timestamps: true }
);
const Song = model('Song', SongSchema);
export default Song;
