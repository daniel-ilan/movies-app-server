import cors from 'cors';
import express from 'express';
import { connect } from './configs/dbConfig';
import authRoutes from './routes/authRoutes';
import validateRoute from './routes/validateRoutes';
import moviesRoutes from './routes/moviesRoutes';
import userRoutes from './routes/usersRoutes';

import { populateMembers, populateMovies } from './utils/populateDB';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(validateRoute);
app.use(moviesRoutes);
app.use(userRoutes);

const port = process.env.PORT || 8082;
connect()
  .then(() => {
    populateMembers();
    populateMovies();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
