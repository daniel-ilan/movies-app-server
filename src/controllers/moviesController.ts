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

    return res.status(200).json({ movies, next });
  } catch (error) {
    throw new Error(error);
  }
};

export const countMovies = async () => {
  const count = await Movie.countDocuments();
  return count;
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const movieForm = req.body;
    console.log(movieForm);

    const { name, genres, image, premiered, rating, summary } = movieForm;
    const movieExists = await Movie.find({ name });
    if (movieExists.length > 0) {
      return res.status(500).json({
        message: 'A movie with that name already exists',
      });
    }

    const movie = new Movie({
      name,
      genres,
      image,
      premiered,
      rating,
      summary,
    });

    await movie.save();

    return res.status(200).json({
      message: `${name} saved successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Something went wrong`,
    });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const movieForm = req.body;

    const { name, genres, image, premiered, rating, summary, _id } = movieForm;
    const moviesFound = await Movie.find({ name: name });
    if (moviesFound.length > 0) {
      for (const movie of moviesFound) {
        if (movie.id !== _id) {
          return res.status(500).json({
            message: 'A movie with that name already exists',
          });
        }
      }
    }

    const movie = moviesFound[0];
    movie.name = name;
    movie.image = image;
    movie.rating = rating;
    movie.genres = genres;
    movie.summary = summary;
    movie.premiered = premiered;

    await movie.save();

    return res.status(200).json({
      message: `${name} saved successfully`,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Movie.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Show deleted successfully',
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
