import express from 'express';
import passport from 'passport';
import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { validate } from 'express-validation';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middleware/errorMiddleware';
import { meController } from './controller/me';
import { localStrategy } from './auth/localStrategy';
import { authenticate, cookieStrategy } from './auth/cookieStrategy';
import { loginValidation, passwordLoginController } from './controller/login/passwordLoginController';
import { passwordRegisterController } from './controller/register/passwordRegisterController';
import { logoutController } from './controller/logout';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const allowlist = ['http://localhost:3000', 'http://localhost:8000'];
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowlist.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

passport.use(localStrategy);
passport.use(cookieStrategy);
app.use(passport.initialize());

app.post('/login/password', validate(loginValidation), passwordLoginController);

app.post('/register/password', validate(loginValidation), passwordRegisterController);

app.get('/me', authenticate, meController);

app.post('/logout', authenticate, logoutController);

app.use(errorMiddleware);
AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT || 8000);
  })
  .catch((error) => console.log(error));
