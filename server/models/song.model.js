import { model, Schema } from 'mongoose';
const SongSchema = new Schema(
  {
    songName: {
      type: String,
      required: [true, 'Mezmure/Song name is required.'],
      minLength: [2, 'Mezmure/Song name must be at least 2 characters long.'],
      maxLength: [
        50,
        'Mezmure/Song name must be less than 50 characters long.',
      ],
    },
    artistName: String,
    fileName: String,
    pageNumber: Number,

    genre: {
      type: String,
      required: [true, 'Genre is required.'],
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
