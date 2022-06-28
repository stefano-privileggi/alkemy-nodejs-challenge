import { Router } from "express";
import { login, register } from "../controllers/authentication.controller.js";
import { authorization } from "../middleware/authorisation.js";

const router = Router();

router.post('/auth/login', authorization, login);
router.post('/auth/register', register);

export default router;