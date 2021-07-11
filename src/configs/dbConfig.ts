import mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect('mongodb://localhost:27017/usersDb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}
