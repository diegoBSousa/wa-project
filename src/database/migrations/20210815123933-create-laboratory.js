module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('laboratories', {
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      endereco_linha_1: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('laboratories');
  },
};
