// backend/src/seeders/[timestamp]-demo-purchases.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Purchases', [
      {
        price: 500.0,
        supplier_id: 1, // Assurez-vous que l'ID correspond à un fournisseur existant
        order_date: new Date(),
        quantity: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_date : new Date()
      },
      {
        price: 750.0,
        supplier_id: 2, // Assurez-vous que l'ID correspond à un fournisseur existant
        order_date: new Date(),
        quantity: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
        delivery_date : new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Purchases', null, {});
  }
};
