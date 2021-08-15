module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('exams', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
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
