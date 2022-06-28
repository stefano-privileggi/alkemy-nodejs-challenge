import { Router } from "express";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "../controllers/movie.controller.js";

const router = Router();

router.get('/movies', getAllMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

export default router ;