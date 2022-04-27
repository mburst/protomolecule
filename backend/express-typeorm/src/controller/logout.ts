import { Request, Response } from 'express';
import { AccessToken } from '../entity/AccessToken';

export const logoutController = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  await AccessToken.delete({
    id: token,
  });
  res.clearCookie('token', { httpOnly: true, secure: true });
  res.json();
};
