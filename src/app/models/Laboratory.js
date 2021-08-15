import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Laboratory extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        endereco_linha_1: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        endereco_linha_2: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        endereco_linha_3: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (laboratory) => {
      laboratory.uuid = uuidv4();
    });

    return this;
  }
}

export default Laboratory;
