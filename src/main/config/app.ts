import express from 'express';
import createMiddleware from './middleware';
import createRoutes from './routes';

const app = express();
createMiddleware(app);
createRoutes(app);

export { app };
