import { Response, Request } from 'express';
import Movie from '../models/movies';

export const getAllMovies = async (_req: Request, res: Response) => {
  try {
    const allMovies = await Movie.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    throw error;
  }
};

export const getPaginationMovies = async (req: Request, res: Response) => {
  try {
    let nextPage = req.body.nextPage;
    if (nextPage) {
      const movies = await Movie.find({ _id: { $lt: nextPage } })
        .sort({
          _id: -1,
        })
        .limit(20);
      const next = movies[movies.length - 1]._id;
      return res.status(200).json({ movies: movies, next });
    }
    const movies = await Movie.find({})
      .sort({
        _id: -1,
      })
      .limit(20);
    const next = movies[movies.length - 1]._id;

    console.log(movies);

    return res.status(200).json({ movies, next });
  } catch (error) {
    throw new Error(error);
  }
};

export const countMovies = async () => {
  const count = await Movie.countDocuments();
  return count;
};
