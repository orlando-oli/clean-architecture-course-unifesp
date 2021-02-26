import { MongoHelper } from '@/external/repositories/mongodb/helper';
import { app } from '@/main/config';
import request from 'supertest';

describe('signup route', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    await MongoHelper.clearCollection('users');
  });

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
