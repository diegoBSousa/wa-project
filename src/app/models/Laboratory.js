import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Laboratory_Exam from './Laboratory_Exam';

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
          type: Sequelize.ENUM('ativo', 'inativo'),
          allowNull: false,
          defaultValue: 'ativo',
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

  static associate(models) {
    this.belongsToMany(models.Exam, {
      foreignKey: 'laboratory_uuid',
      through: Laboratory_Exam,
      as: 'Exams',
    });
  }
}

export default Laboratory;
