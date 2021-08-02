import { Document, ObjectId, Date, Types } from 'mongoose';

export interface IUser extends Document {
  _id?: ObjectId;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMember extends Document {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  city: string;
}

export interface IMovie extends Document {
  name: string;
  genres: string[];
  image: string;
  permited: Date;
  premiered: string;
  rating: any;
  summary: string;
}

export interface IUserJson extends IUser {
  _id?: ObjectId;
  username: string;
  password: string;
}

export type TMovie = {
  movieId: Types.ObjectId;
  date: Date;
};

export interface ISubscription {
  memberId: Types.ObjectId;
  movies: TMovie[];
}
