const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const email = 'admin@wa-project';
    const password = '123456';
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'WA Admin',
          email,
          password_hash: bcrypt.hashSync(email + password, 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', [{ name: 'WA Admin' }]);
  },
};
