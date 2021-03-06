import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Song from '../lib/models/Song.js';

const vista = {
  title: 'Vista',
  artist: 'iamamiwhoami',
  album: 'BLUE'
};
const never = {
  title: 'Never Let You Go',
  artist: 'Georgia',
  album: 'Seeking Thrills'
};
const reckoner = {
  title: 'Reckoner',
  artist: 'Radiohead',
  album: 'In Rainbows'
};


describe('song routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a song', async () => {
    const res = await request(app)
      .post('/api/v1/songs')
      .send(vista);

    expect(res.body).toEqual({
      id: '1',
      ...vista
    });
  });
  it('gets a song by id', async () => {
    const currentSong = await Song.insert(never);

    const res = await request(app).get(`/api/v1/songs/${currentSong.id}`);

    expect(res.body).toEqual(currentSong);
  });
  it('gets all songs', async () => {
    const song1 = await Song.insert(vista);
    const song2 = await Song.insert(never);
    const song3 = await Song.insert(reckoner);

    const res = await request(app).get('/api/v1/songs');

    expect(res.body).toEqual([song1, song2, song3]);
  });
  it('updates a song by id', async () => {
    const currentSong = await Song.insert(reckoner);

    const res = await request(app)
      .put(`/api/v1/songs/${currentSong.id}`)
      .send({ title: 'Paranoid Android' });

    expect(res.body).toEqual({ ...currentSong, title: 'Paranoid Android' });
  });
  it('deletes a song by id', async () => {
    const currentSong = await Song.insert(vista);

    const res = await request(app)
      .delete(`/api/v1/songs/${currentSong.id}`);

    expect(res.body).toEqual({
      message: `Song ${currentSong.title} has been deleted.`
    });
  });
});
