import { Router } from 'express';
import {
  createSong,
  getOneSong,
  getAllSong,
  updateOneSong,
  deleteOneSong,
  searchSong,
  checkSongNameAvailability,
} from '../controllers/song.controller.js';
import { optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/name-availability', checkSongNameAvailability);
router.route('/').get(optionalAuth, getAllSong).post(createSong);

// router.route('/search').get(searchSong);
router
  .route('/:id')
  .get(optionalAuth, getOneSong)
  .put(updateOneSong)
  .delete(deleteOneSong);

export default router;
