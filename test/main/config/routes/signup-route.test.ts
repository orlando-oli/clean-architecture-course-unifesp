import { app } from '@/main/config';
import request from 'supertest';

describe('signup route', () => {
  test('should return an user on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send();
    });

    await request(app)
      .post('/api/signup')
      .send({ name: 'Any name', email: 'any@mail.com' })
      .expect(201);
  });
});
