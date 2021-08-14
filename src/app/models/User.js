import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (user) => {
      user.uuid = uuidv4();
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.email + user.password, 8);
      }
    });

    return this;
  }

  verifyPassword(email, password) {
    return bcrypt.compare(email + password, this.password_hash);
  }
}

export default User;
