import { Router } from 'express';
import Song from '../models/Song';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const song = await Song.insert(req.body);
      res.send(song);
    } catch (err) {
      next(err);
    }
  });
