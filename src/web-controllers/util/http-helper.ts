/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpResponse } from '@/web-controllers/ports/http-response';

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
