import { Router } from 'express';
import {
  createSong,
  getOneSong,
  getAllSong,
  updateOneSong,
  deleteOneSong,
  searchSong,
} from '../controllers/song.controller.js';

const router = Router();

router.route('/').get(getAllSong).post(createSong);

// router.route('/search').get(searchSong);
router
  .route('/:id')
  .get(getOneSong)
  .put(updateOneSong)
  .delete(deleteOneSong);

export default router;
