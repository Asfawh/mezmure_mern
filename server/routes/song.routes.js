import { Router } from 'express';
import {
  createSong,
  getOneSong,
  getAllSong,
  updateOneSong,
  deleteOneSong,
  searchSong,
} from '../controllers/song.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/').get(optionalAuth, getAllSong).post(createSong);

// router.route('/search').get(searchSong);
router
  .route('/:id')
  .get(optionalAuth, getOneSong)
  .put(updateOneSong)
  .delete(deleteOneSong);

export default router;
