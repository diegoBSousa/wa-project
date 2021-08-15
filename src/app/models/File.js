import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (user) => {
      user.uuid = uuidv4();
    });

    return this;
  }
}

export default File;
