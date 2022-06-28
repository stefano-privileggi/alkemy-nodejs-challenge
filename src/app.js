import express from "express";
import dotenv from 'dotenv'

import authenticationRoute from "./routes/authentication.routes.js";
import charactersRoute from "./routes/character.routes.js";
import moviesRoute from "./routes/movie.routes.js";

import database from './database/connection.js';
import databaseConfiguration from './database/configuration.js';

const app = express();

dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//endpoints
app.use(authenticationRoute);
app.use(charactersRoute);
app.use(moviesRoute);

// listener
const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

databaseConfiguration(database);

export default app;