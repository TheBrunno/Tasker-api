import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validade: {
          len: {
            args: [3, 255],
            msg: 'Campo NOME deve ter entre 3 e 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe.',
        },
        validade: {
          isEmail: {
            msg: 'Email inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validade: {
          len: {
            args: [6, 50],
            msg: 'Campo SENHA deve ter entre 6 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) user.password_hash = await bcryptjs.hash(user.password, 8);
    });

    return this;
  }
}
