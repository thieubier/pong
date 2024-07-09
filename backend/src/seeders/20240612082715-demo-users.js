// backend/src/seeders/[timestamp]-demo-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {}); // Supprimer toutes les anciennes entrées

    return queryInterface.bulkInsert('Users', [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password', // Assurez-vous d'utiliser des mots de passe hachés
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'hashed_password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
