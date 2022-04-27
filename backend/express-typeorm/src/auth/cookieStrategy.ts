import { MoreThan } from 'typeorm';
import { Strategy } from 'passport-cookie';
import passport from 'passport';
import { NextFunction, Response, Request } from 'express';
import { AccessToken } from '../entity/AccessToken';
import { User } from '../entity/User';

export const cookieStrategy = new Strategy(async (token: string, cb: (token: null, verified: User | boolean) => void) => {
  const accessToken = await AccessToken.findOne({
    where: {
      id: token,
      expiresAt: MoreThan(new Date()),
    },
    relations: {
      user: true,
    },
  });

  if (!accessToken) {
    return cb(null, false);
  }

  return cb(null, accessToken.user);
});

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(cookieStrategy.name, { session: false })(req, res, next);
};
