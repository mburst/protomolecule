import { NextFunction, Request, Response } from 'express';
import { Joi } from 'express-validation';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { localStrategy } from '../../auth/localStrategy';
import { User } from '../../entity/User';
import { HttpException } from '../../errors/httpException';

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }),
};

export const passwordLoginController = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(localStrategy.name, async (err, user: User, info: IVerifyOptions) => {
    if (err || !user) {
      const error = new HttpException(400, info.message);
      return next(error);
    }

    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);
      const accessToken = await user.generateAccessToken();
      res.cookie('token', accessToken.id, {
        httpOnly: true,
        secure: true,
        expires: accessToken.expiresAt,
      });
      return res.json({ accessToken });
    });
  })(req, res, next);
};
