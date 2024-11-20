import express from 'express';
import {
  getArticle,
  createArticle,
  getSingleArticle,
  updateSingleArticle,
  deleteSingleArticle,
} from '../conrollers/articleController.js';
import validateToken from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.use(validateToken);
router.route('/').get(getArticle);
router.route('/').post(createArticle);
router.route('/:id').get(getSingleArticle);
router.route('/:id').put(updateSingleArticle);
router.route('/:id').delete(deleteSingleArticle);

export default router;
