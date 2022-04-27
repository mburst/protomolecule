import { Request, Response } from 'express';
import { AccessToken } from '../entity/AccessToken';

export const meController = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.cookies;
  const accessToken = await AccessToken.findOneByOrFail({
    id: token,
  });
  accessToken.expiresAt = new Date(Date.now() + 90 * 24 * 3600000);
  accessToken.save();
  res.json(req.user);
};
