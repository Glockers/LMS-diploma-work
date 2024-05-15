import axios from 'axios';

export type ServerError = {
  status: number;
  message: string;
  timestamp: Date;
};

export const Server = axios.create({
  baseURL: `http://localhost:5000/api`
});
