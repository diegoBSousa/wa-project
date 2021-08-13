import { Sequelize, Model } from 'sequelize';

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
  }
}

export default User;
