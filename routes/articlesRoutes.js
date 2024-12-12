import express from 'express';
import {
  getCurrentUsersArticle,
  createArticle,
  getSingleArticle,
  updateSingleArticle,
  deleteSingleArticle,
  getAllArticles,
} from '../conrollers/articleController.js';

import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.use(validateToken);
router.route('/').get(getAllArticles);
router.route('/user').get(getCurrentUsersArticle);
router.route('/').post(createArticle);
router.route('/:id').get(getSingleArticle);
router.route('/:id').put(updateSingleArticle);
router.route('/:id').delete(deleteSingleArticle);

export default router;
