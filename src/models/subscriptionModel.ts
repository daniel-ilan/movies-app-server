import { model, Schema } from 'mongoose';
import { ISubscription } from '../types';
const subscriptionSchema: Schema = new Schema(
  {
    memberId: {
      type: String,
      required: true,
    },

    movies: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<ISubscription>(
  'Subscription',
  subscriptionSchema,
  'Subscriptions',
);
