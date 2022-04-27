import { SNACKBAR_CODE } from '../middleware/errorMiddleware';

export class HttpException extends Error {
  status: number;

  code: number;

  constructor(status: number, message: string, code?: number) {
    super(message);
    this.status = status;
    this.code = code || SNACKBAR_CODE;
  }
}
