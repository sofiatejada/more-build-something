import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

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
});
