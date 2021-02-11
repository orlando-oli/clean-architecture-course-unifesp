import { AddUserController } from '@/web-controllers/add-user-controller';
import { HttpRequest } from '@/web-controllers/ports/http-request';
import { Request, Response } from 'express';

export const adaptRoute = (controller: AddUserController) => {
  return async (req: Request, res: Response): Promise<void> => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
