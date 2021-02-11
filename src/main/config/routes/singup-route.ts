import { Router } from 'express';
import { adaptRoute } from '../adapter/route-adapter';
import { makeAddUserController } from '../factories/signup';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeAddUserController()));
};
