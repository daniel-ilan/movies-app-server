import axios from 'axios';

export const membersDAL = async () => {
  const data = await axios.get('https://jsonplaceholder.typicode.com/users');
  return data;
};

export const moviesDAL = async () => {
  const data = await axios.get('https://api.tvmaze.com/shows');
  return data;
};
