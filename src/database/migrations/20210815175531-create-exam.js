module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('exams', {
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exams');
  },
};
