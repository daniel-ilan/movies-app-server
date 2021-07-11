import { model, Schema } from 'mongoose';
import { IMovie } from '../types';

const movieSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    genres: {
      type: Array,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    permited: {
      type: Date,
      required: true,
    },
    premiered: {
      type: String,
    },
    rating: {
      type: Number,
    },
    summary: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model<IMovie>('Movie', movieSchema, 'Shows');
