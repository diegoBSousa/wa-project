import { Sequelize, Model } from 'sequelize';
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
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
          validate: {
            isDate: true,
          },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          validate: {
            isDate: true,
          },
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
      }
    );

    this.addHook('beforeCreate', async (user) => {
      user.uuid = uuidv4();
      const now = new Date();
      user.updated_at = now;
      user.created_at = now;
    });

    this.addHook('beforeSave', async (user) => {
      const now = new Date();
      user.updated_at = now;
    });

    return this;
  }
}

export default User;
