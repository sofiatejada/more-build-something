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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const song = await Song.getById(id);

      res.send(song);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const allSongs = await Song.getAll();

      res.send(allSongs);
    } catch (error) {
      next(error);
    }
  });
