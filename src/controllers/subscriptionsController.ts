import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { TMovie } from '../types';
import Subscription from '../models/subscriptionModel';

export const getAllSubscriptions = async (_req: Request, res: Response) => {
  try {
    const allSubscriptions = await Subscription.find({});

    return res.status(200).json(allSubscriptions);
  } catch (error) {
    throw error;
  }
};

export const addSubscription = async (req: Request, res: Response) => {
  try {
    const { show, date, member } = req.body;
    const memberId = mongoose.Types.ObjectId(member._id);

    const currentSubscriber = await Subscription.findOne({
      memberId,
    });

    if (currentSubscriber) {
      const moviesWatched = currentSubscriber.movies;
      const movieData: TMovie = {
        movieId: mongoose.Types.ObjectId(show._id),
        date,
      };

      moviesWatched.unshift(movieData);

      await currentSubscriber.save();
      return res.status(200).json({ message: 'found subscription and saved!' });
    }

    const subscription = new Subscription({
      memberId,
      movies: [{ movieId: mongoose.Types.ObjectId(show._id), date }],
    });
    await subscription.save();

    return res.status(200).json({ message: 'new subscription saved!' });
  } catch (error) {
    return res.status(403).json({ message: error });
  }
};
