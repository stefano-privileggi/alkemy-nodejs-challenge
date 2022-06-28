import { validateMovie } from '../lib/validations.js';

import MovieServices from "../services/movie.services.js";
const movieServices = new MovieServices()

export async function getAllMovies(request, response) {
  return response.status(200).json(await movieServices.getAllMovies(request.query));
}

export const createMovie = async (request, response) => {
  //Valida los datos del request.body
  const { error } = validateMovie(request.body);
  if (error)
    return response.status(400).json(error.details[0].message);

  try {
    const newMovie = await movieServices.createMovie(request.body);
    response.status(201).json({ message: 'Movie created', data: newMovie });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }

}

export const updateMovie = async (request, response) => {
  const { error } = validateMovie(request.body);
  if (error)
    return response.status(400).json(error.details[0].message);

  try {
    const movieId = request.params.id;
    const movieUpdated = await movieServices.updateMovieById(movieId, request.body);
    return response.status(200).json({ message: 'Movie updated', data: movieUpdated });
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }

}

export const deleteMovie = async (request, response) => {
  try {
    const movieId = request.params.id;
    await movieServices.deleteMovieById(movieId);
    return response.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}