import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../../entity/User';

export const passwordRegisterController = async (req: Request, res: Response) => {
  const user = new User();
  user.email = req.body.email;
  user.password = await bcrypt.hash(req.body.password, 10);
  user.save();

  const accessToken = await user.generateAccessToken();
  res.cookie('token', accessToken.id, {
    httpOnly: true,
    secure: true,
    expires: accessToken.expiresAt,
  });
  res.json();
};
