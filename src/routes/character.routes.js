import { Router } from "express";
import { createCharacter, deleteCharacter, getCharacters, updateCharacter } from "../controllers/character.controller.js";

const router = Router();

router.get('/characters', getCharacters);
router.post('/characters', createCharacter);
router.put('/characters/:id', updateCharacter);
router.delete('/characters/:id', deleteCharacter);

export default router;
