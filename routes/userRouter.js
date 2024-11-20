import express from 'express';
import {
  currentUser,
  loginUser,
  registerUser,
} from '../conrollers/userController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.post('/login', loginUser);
router.get('/current', validateToken, currentUser);

export default router;
