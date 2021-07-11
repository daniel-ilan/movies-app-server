import { IUser } from '../types';
import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IUser>('User', userSchema, 'usersData');
