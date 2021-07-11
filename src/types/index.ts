import { Document, ObjectId, Date } from 'mongoose';

export interface IUser extends Document {
  _id?: ObjectId;
  username: string;
  password: string;
}

export interface IMember extends Document {
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
