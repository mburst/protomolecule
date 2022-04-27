import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../entity/User';

export const localStrategy = new Strategy({ usernameField: 'email', session: false }, async (email, password, cb) => {
  const user = await User.findOneBy({
    email,
  });

  if (!user) {
    return cb(null, false, { message: 'No user by that email' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  if (await bcrypt.compare(hashedPassword, user.password)) {
    return cb(null, false, { message: 'Not a matching password' });
  }

  return cb(null, user);
});
