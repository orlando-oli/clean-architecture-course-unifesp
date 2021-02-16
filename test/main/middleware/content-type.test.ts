import { app } from '@/main/config';
import request from 'supertest';

describe('Content type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('');
    });

    await request(app).get('/test_content_type').expect('content-type', /json/);
  });

  test('should return xml content type if requested', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml');
      res.send('');
    });

    await request(app).get('/test_content_type_xml').expect('content-type', /xml/);
  });
});
