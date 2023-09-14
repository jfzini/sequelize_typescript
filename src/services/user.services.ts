import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import auth from '../auth/token.jwt';
import { UserToken } from '../types/User';
import { Service } from '../types/Service';

const userLogin = async (username: string, password: string): Promise<Service<UserToken>> => {
  const userPassword = await UserModel.findOne({ where: { username }, attributes: ['password'] });
  const stringifiedUserPassword = userPassword?.toJSON().password;
  if (stringifiedUserPassword) {
    const isLoginValid = bcrypt.compareSync(password, stringifiedUserPassword);
    if (isLoginValid) {
      const token = auth.generateToken({ username, password });
      return { status: 'SUCCESSFUL', data: { token } };
    }
  }
  return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
};

export default { userLogin };
