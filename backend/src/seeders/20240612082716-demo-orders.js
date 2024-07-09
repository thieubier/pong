// backend/src/seeders/[timestamp]-demo-orders.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {}); // Supprimer toutes les anciennes entrées

    return queryInterface.bulkInsert('Orders', [
      {
        order_date: new Date(),
        total_price: 2000.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        order_date: new Date(),
        total_price: 2500.0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};
