import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Exam extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        file_uuid: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'files',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        laboratory_uuid: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'laboratories',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
        tipo: {
          type: Sequelize.ENUM('Análise Clínica', 'Imagem'),
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM('Ativo', 'Inativo'),
          allowNull: false,
          defaultValue: 'Ativo',
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeCreate', async (exam) => {
      exam.uuid = uuidv4();
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.File, { foreignKey: 'file_uuid', as: 'arquivo' });

    this.belongsTo(models.Laboratory, {
      foreignKey: 'laboratory_uuid',
      as: 'laboratorio',
    });
  }
}

export default Exam;
